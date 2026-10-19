"""Genera los íconos del sitio (pestaña del navegador y acceso directo en celular)
a partir del logo: solo los tres círculos, sin el texto, que a ese tamaño no se lee.

Uso: python3 scripts/favicon.py
"""
import os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from png_simple import leer_png, escribir_png

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO = os.path.join(RAIZ, "assets", "img", "logo-sinapsis.png")
DESTINO = os.path.join(RAIZ, "assets", "img", "iconos")
os.makedirs(DESTINO, exist_ok=True)

ancho, alto, filas = leer_png(LOGO)
visible = [any(f[x * 4 + 3] > 30 for f in filas) for x in range(ancho)]
x0 = visible.index(True)
x1 = x0
while x1 < ancho and visible[x1]:   # el ícono termina en la primera columna vacía
    x1 += 1
ys = [y for y, f in enumerate(filas) if any(f[x * 4 + 3] > 30 for x in range(x0, x1))]
y0, y1 = min(ys), max(ys) + 1

# Cuadrado con un pequeño margen, centrado
lado = max(x1 - x0, y1 - y0) + 4
cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
cuadro = []
for y in range(cy - lado // 2, cy - lado // 2 + lado):
    fila = bytearray()
    for x in range(cx - lado // 2, cx - lado // 2 + lado):
        fila += filas[y][x * 4:x * 4 + 4] if 0 <= y < alto and 0 <= x < ancho else b"\x00\x00\x00\x00"
    cuadro.append(fila)
base = os.path.join(DESTINO, "icono-base.png")
escribir_png(base, lado, lado, cuadro)
print("ícono recortado:", lado, "×", lado)

# Pestaña del navegador: 32 y 16 px (el original mide ~94 px, se achica sin perder nitidez)
for tam, nombre in [(32, "favicon-32.png"), (16, "favicon-16.png")]:
    subprocess.run(["sips", "-z", str(tam), str(tam), base, "--out", os.path.join(DESTINO, nombre)], check=True, capture_output=True)
    print("→", nombre)

# Acceso directo en iPhone/Android: 180 px con el fondo azul del sitio y el ícono al centro
FONDO = (0x06, 0x1F, 0x3F)
lado_final = 136  # el ícono ocupa ~75% del cuadro
chico = os.path.join(DESTINO, "_tmp.png")
subprocess.run(["sips", "-z", str(lado_final), str(lado_final), base, "--out", chico], check=True, capture_output=True)
w, h, ic = leer_png(chico)
os.remove(chico)
T = 180
off = (T - lado_final) // 2
lienzo = [bytearray(bytes(FONDO) + b"\xff") * T for _ in range(T)]
for y in range(h):
    for x in range(w):
        r, g, b, a = ic[y][x * 4:x * 4 + 4]
        px = lienzo[y + off]
        i = (x + off) * 4
        for c, v in enumerate((r, g, b)):
            px[i + c] = (v * a + px[i + c] * (255 - a)) // 255
escribir_png(os.path.join(DESTINO, "apple-touch-icon.png"), T, T, lienzo)
print("→ apple-touch-icon.png")
