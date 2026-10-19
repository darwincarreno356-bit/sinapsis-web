"""Lectura y escritura de PNG RGBA de 8 bits sin librerías externas."""
import struct, zlib


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
