"""Crea la versión del logo para fondos claros: el texto blanco
("FORMATOS Y CONTENIDOS") pasa a un color oscuro; los azules no se tocan.
También imprime los azules del logo.

Uso: python3 scripts/logo-fondo-claro.py
"""
import os, struct, zlib
from collections import Counter

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIGEN = os.path.join(RAIZ, "assets", "img", "logo-sinapsis.png")
DESTINO = os.path.join(RAIZ, "assets", "img", "logo-sinapsis-claro.png")
OSCURO = (0x0B, 0x1F, 0x3A)  # azul casi negro para el texto


def leer_png(ruta):
    datos = open(ruta, "rb").read()
    assert datos[:8] == b"\x89PNG\r\n\x1a\n"
    pos, idat, ihdr = 8, b"", None
    while pos < len(datos):
        largo = struct.unpack(">I", datos[pos:pos + 4])[0]
        tipo = datos[pos + 4:pos + 8]
        cuerpo = datos[pos + 8:pos + 8 + largo]
        if tipo == b"IHDR": ihdr = cuerpo
        elif tipo == b"IDAT": idat += cuerpo
        pos += 12 + largo
    ancho, alto, prof, color = struct.unpack(">IIBB", ihdr[:10])
    assert prof == 8 and color == 6, "se espera PNG RGBA de 8 bits"
    crudo = zlib.decompress(idat)
    bpp, paso = 4, ancho * 4
    filas, prev = [], bytearray(paso)
    for y in range(alto):
        f = crudo[y * (paso + 1)]
        linea = bytearray(crudo[y * (paso + 1) + 1:(y + 1) * (paso + 1)])
        for i in range(paso):
            a = linea[i - bpp] if i >= bpp else 0
            b = prev[i]
            c = prev[i - bpp] if i >= bpp else 0
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
    crudo = b"".join(b"\x00" + bytes(f) for f in filas)
    with open(ruta, "wb") as s:
        s.write(b"\x89PNG\r\n\x1a\n")
        s.write(bloque(b"IHDR", struct.pack(">IIBBBBB", ancho, alto, 8, 6, 0, 0, 0)))
        s.write(bloque(b"IDAT", zlib.compress(crudo, 9)))
        s.write(bloque(b"IEND", b""))


ancho, alto, filas = leer_png(ORIGEN)
azules = Counter()
for f in filas:
    for x in range(ancho):
        r, g, b, a = f[x * 4:x * 4 + 4]
        if a < 200:
            continue
        if min(r, g, b) > 150 and max(r, g, b) - min(r, g, b) < 40:
            # Píxel blanco/gris claro (texto): pasar a oscuro manteniendo el antialias
            f[x * 4:x * 4 + 3] = bytes(OSCURO)
        elif b > r + 40:
            azules[(r // 8 * 8, g // 8 * 8, b // 8 * 8)] += 1
escribir_png(DESTINO, ancho, alto, filas)

print("Logo para fondo claro:", os.path.relpath(DESTINO, RAIZ))
print("Azules más usados en el logo:")
for (r, g, b), n in azules.most_common(6):
    print(f"  #{r:02x}{g:02x}{b:02x}  ({n} píxeles)")
