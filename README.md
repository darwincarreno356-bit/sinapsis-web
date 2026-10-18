# Sitio web de Sinapsis Producción

Nuevo sitio de [sinapsisproduccion.com](https://sinapsisproduccion.com), hecho desde cero como página estática y publicado con GitHub Pages.

## Carpetas

- `index.html` — la home.
- `css/estilos.css` — el diseño (colores, tipografía, tamaños).
- `js/main.js` — menú, filtros, miniaturas en movimiento y reproductor de video.
- `js/proyectos.js` — los proyectos. **No se edita a mano**: se genera desde la planilla.
- `assets/` — logo, fotos, miniaturas (`assets/img`) y clips de video (`assets/video`).
- `diseno/` — brief de diseño y planilla de proyectos (`proyectos.csv`).
- `scripts/` — herramientas para actualizar el sitio.
- `contenido/` — todo el contenido del sitio actual (textos en español e inglés, imágenes y videos). Empezá por [contenido/LEEME.md](contenido/LEEME.md).
- `prototipo/` — primera propuesta de home, solo como referencia.

## Identidad

Logo original · tipografía Heebo · celeste `#03A9F4` sobre negro.

## Cómo sumar o cambiar un proyecto

1. Editar `diseno/proyectos.csv` (Excel, Numbers o Google Sheets; guardar como CSV UTF-8).
2. Si tiene clip de miniatura, guardarlo en `assets/video/` y poner el nombre del archivo en la columna `clip_miniatura`.
3. Correr `python3 scripts/generar-proyectos.py`.
4. Subir los cambios con GitHub Desktop (Commit + Push).
