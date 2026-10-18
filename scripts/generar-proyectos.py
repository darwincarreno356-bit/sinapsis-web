"""Convierte diseno/proyectos.csv en js/proyectos.js, que es lo que lee la página.

Correr cada vez que se cambie la planilla:
    python3 scripts/generar-proyectos.py
"""
import csv, json, os, re, shutil, unicodedata

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV = os.path.join(RAIZ, "diseno", "proyectos.csv")
SALIDA = os.path.join(RAIZ, "js", "proyectos.js")
IMG_ORIGEN = os.path.join(RAIZ, "contenido", "imagenes")
IMG_DESTINO = os.path.join(RAIZ, "assets", "img", "proyectos")


def slug(texto):
    t = unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")


def video_info(url):
    """Devuelve (plataforma, id) de un link de YouTube o Vimeo."""
    m = re.search(r"(?:youtube\.com/watch\?v=|youtu\.be/)([\w-]{11})", url or "")
    if m:
        return "youtube", m.group(1)
    m = re.search(r"vimeo\.com/(\d+)", url or "")
    if m:
        return "vimeo", m.group(1)
    return None, None


def miniatura(fila, plataforma, vid):
    """Prioridad: miniatura del video descargada > imagen de la planilla."""
    if plataforma:
        nombre = f"{'yt' if plataforma == 'youtube' else 'vimeo'}-{vid}.jpg"
        if os.path.exists(os.path.join(IMG_DESTINO, nombre)):
            return f"assets/img/proyectos/{nombre}"
    imagen = fila["imagen"].strip()
    if imagen:
        destino = os.path.join(IMG_DESTINO, imagen)
        if not os.path.exists(destino) and os.path.exists(os.path.join(IMG_ORIGEN, imagen)):
            shutil.copy(os.path.join(IMG_ORIGEN, imagen), destino)
        if os.path.exists(destino):
            return f"assets/img/proyectos/{imagen}"
    return ""


proyectos = []
with open(CSV, encoding="utf-8-sig") as f:
    for fila in csv.DictReader(f):
        if not fila["titulo"].strip():
            continue
        plataforma, vid = video_info(fila["video_completo"])
        clip = fila["clip_miniatura"].strip()
        proyectos.append({
            "slug": slug(fila["titulo"]),
            "titulo": fila["titulo"].strip(),
            "anio": fila["anio"].strip(),
            "tipos": [t.strip() for t in fila["tipo_de_trabajo"].split("+") if t.strip()],
            "genero": fila["genero"].strip(),
            "formato": fila["formato"].strip(),
            "canal": fila["canal_o_cliente"].strip(),
            "paises": fila["paises"].strip(),
            "descripcion": fila["descripcion"].strip(),
            "premios": fila["premios"].strip(),
            "video": {"plataforma": plataforma, "id": vid} if plataforma else None,
            "imagen": miniatura(fila, plataforma, vid),
            "clip": f"assets/video/{clip}" if clip else "",
            "destacado": fila["destacado"].strip().lower() in ("sí", "si", "x", "1"),
        })

os.makedirs(os.path.dirname(SALIDA), exist_ok=True)
with open(SALIDA, "w", encoding="utf-8") as f:
    f.write("// Generado por scripts/generar-proyectos.py desde diseno/proyectos.csv. No editar a mano.\n")
    f.write("window.PROYECTOS = ")
    json.dump(proyectos, f, ensure_ascii=False, indent=2)
    f.write(";\n")

print(f"{len(proyectos)} proyectos → js/proyectos.js")
