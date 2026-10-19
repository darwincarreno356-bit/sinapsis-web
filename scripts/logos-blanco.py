"""Prepara versiones de los logos de clientes para mostrarlos en blanco sobre el
fondo azul, sin placa.

- La mayoría se pasan a blanco directamente con CSS (filtro), no necesitan archivo.
- Paka Paka tiene detalles internos blancos (la cara) que con el filtro
  desaparecen: acá se pintan sus colores de blanco y sus blancos del azul de
  fondo, para que el dibujo se siga leyendo.
- Canal 7 y América TV ya tienen versiones en blanco y oscuro hechas a mano
  (canal-7-blanco.svg es la oficial; america-tv-blanco.svg lleva una cruz para
  separar los cuatro cuadros). Las funciones para PNG quedan para logos futuros.
- El Nueve (logo actual) trae el texto en blanco: para las placas blancas de la
  versión A se hace una copia con el texto oscuro.

Uso: python3 scripts/logos-blanco.py
"""
import os, re, struct, zlib

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR = os.path.join(RAIZ, "assets", "img", "clientes")
FONDO = "#061f3f"  # mismo azul profundo que --fondo en css/estilos.css


def svg_en_blanco(origen, destino):
    s = open(os.path.join(DIR, origen), encoding="utf-8").read()
    def cambiar(m):
        color = m.group(2).lower()
        nuevo = FONDO if color in ("#ffffff", "#fff") else "#ffffff"
        return m.group(1) + nuevo
    s = re.sub(r'((?:fill|stroke)\s*[:=]\s*"?)(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})\b', cambiar, s)
    open(os.path.join(DIR, destino), "w", encoding="utf-8").write(s)
    print("→", destino)


def leer_png(ruta):
    datos = open(ruta, "rb").read()
    pos, idat, ihdr = 8, b"", None
    while pos < len(datos):
        largo = struct.unpack(">I", datos[pos:pos + 4])[0]
        tipo, cuerpo = datos[pos + 4:pos + 8], datos[pos + 8:pos + 8 + largo]
        if tipo == b"IHDR": ihdr = cuerpo
        elif tipo == b"IDAT": idat += cuerpo
        pos += 12 + largo
    ancho, alto, prof, color, _, _, entrelazado = struct.unpack(">IIBBBBB", ihdr)
    assert prof == 8 and color == 6 and entrelazado == 0, "se espera PNG RGBA 8 bits sin entrelazar"
    crudo, paso, bpp = zlib.decompress(idat), ancho * 4, 4
    filas, prev = [], bytearray(paso)
    for y in range(alto):
        f = crudo[y * (paso + 1)]
        linea = bytearray(crudo[y * (paso + 1) + 1:(y + 1) * (paso + 1)])
        for i in range(paso):
            a = linea[i - bpp] if i >= bpp else 0
            b, c = prev[i], (prev[i - bpp] if i >= bpp else 0)
            if f == 1: linea[i] = (linea[i] + a) & 255
            elif f == 2: linea[i] = (linea[i] + b) & 255
            elif f == 3: linea[i] = (linea[i] + (a + b) // 2) & 255
            elif f == 4:
                p = a + b - c; pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                linea[i] = (linea[i] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
        filas.append(linea); prev = linea
    return ancho, alto, filas


def escribir_png(ruta, ancho, alto, filas):
    def bloque(tipo, cuerpo):
        return struct.pack(">I", len(cuerpo)) + tipo + cuerpo + struct.pack(">I", zlib.crc32(tipo + cuerpo) & 0xFFFFFFFF)
    with open(ruta, "wb") as s:
        s.write(b"\x89PNG\r\n\x1a\n")
        s.write(bloque(b"IHDR", struct.pack(">IIBBBBB", ancho, alto, 8, 6, 0, 0, 0)))
        s.write(bloque(b"IDAT", zlib.compress(b"".join(b"\x00" + bytes(f) for f in filas), 9)))
        s.write(bloque(b"IEND", b""))


def fondo_blanco_a_transparente(origen, destino, cortar_en_cuatro=False):
    ancho, alto, filas = leer_png(os.path.join(DIR, origen))
    for f in filas:
        for x in range(ancho):
            r, g, b, a = f[x * 4:x * 4 + 4]
            claridad = min(r, g, b)
            if claridad > 200:  # blanco y casi blanco: transparente, con borde suave
                f[x * 4 + 3] = min(a, max(0, (255 - claridad) * 255 // 55))
    if cortar_en_cuatro:
        # El ícono de América son 4 cuadros de colores pegados: en blanco se verían
        # como uno solo. Se abre una cruz transparente en el medio del ícono.
        xs, ys = [], []
        for y, f in enumerate(filas):
            for x in range(ancho):
                r, g, b, a = f[x * 4:x * 4 + 4]
                if a > 200 and max(r, g, b) - min(r, g, b) > 60:  # píxeles de color
                    xs.append(x); ys.append(y)
        x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
        cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
        medio = max(3, (x1 - x0) // 40)
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                if abs(x - cx) <= medio or abs(y - cy) <= medio:
                    filas[y][x * 4 + 3] = 0
    escribir_png(os.path.join(DIR, destino), ancho, alto, filas)
    print("→", destino)


def texto_blanco_a_oscuro(origen, destino):
    """Para placas blancas (versión A): el texto blanco del logo pasa a azul oscuro."""
    ancho, alto, filas = leer_png(os.path.join(DIR, origen))
    oscuro = bytes(int(FONDO[i:i + 2], 16) for i in (1, 3, 5))
    for f in filas:
        for x in range(ancho):
            r, g, b, a = f[x * 4:x * 4 + 4]
            if a > 0 and min(r, g, b) > 200:
                f[x * 4:x * 4 + 3] = oscuro
    escribir_png(os.path.join(DIR, destino), ancho, alto, filas)
    print("→", destino)


svg_en_blanco("pakapaka.svg", "pakapaka-blanco.svg")
texto_blanco_a_oscuro("el-nueve-2026.png", "el-nueve-2026-oscuro.png")
