# Brief de diseño — nuevo sitio Sinapsis Producción

Versión 2 · 18/10/2026 · Basado en las referencias que eligió Darwin.

## Decisiones vigentes (versión 2)

- **Fondo azul profundo** `#061F3F`, derivado del azul del logo y más oscuro, para que los círculos se distingan. **No se usa negro de fondo.**
- **Texto blanco**; créditos y etiquetas en azul grisáceo `#9FB3CF`.
- **Acento:** azul claro del logo `#30A8E0` (punto final, corchetes del menú, botones de play).
- **Azules del logo:** `#30A8E0` (claro) · `#0868C0` (medio) · `#0048A8` (profundo).
- **Estilo Canada:** plano y minimalista, la imagen manda, menú y créditos en mayúsculas chicas, ítem activo entre [corchetes].
- **De Kenya Films se toma solo el pie fijo mínimo:** ciudad, email y redes siempre visibles abajo. En celular pasa al final de la página.
- Existe también un logo para fondo claro (`assets/img/logo-sinapsis-claro.png`) por si se vuelve a un fondo blanco.

## Lo que se mantiene de Sinapsis

- Logo original (`contenido/imagenes/sinapsisfinallogo.png`)
- Tipografía **Heebo**
- Colores: celeste `#03A9F4`, negro, blanco, gris claro `#E2E2E2`
- Todo el contenido actual, más los proyectos nuevos que se sumen

## Qué tomamos de cada referencia

### Canada — canadacanada.com

**Tomar**
- **Lo limpio.** La imagen manda. Hay muy poco texto alrededor: título del proyecto y una línea de crédito («CLIENTE — TÍTULO / DIRECTOR»).
- **Cómo se presentan y reproducen los videos y las miniaturas.** Las miniaturas son videos cortos, sin sonido, en loop, que se reproducen solos. Al entrar al proyecto se ve el video completo en grande.
- **Material clasificado por tipo.** Canada separa Film & TV, Music Videos, Photo y Press. En Sinapsis esto se traduce en filtrar los proyectos por tipo de trabajo y por género (ver abajo).
- **Navegación intuitiva.** Pocas opciones en el menú, siempre a la vista, y filtros simples arriba de las grillas (ALL / BCN / LDN / LA).
- **Contacto ordenado.** Cada oficina tiene su bloque con dirección, teléfono y email. Se encuentra todo de un vistazo, y lo mismo se repite en el pie de cada página.
- **Tipografía chica, en mayúsculas y con buen espaciado** en menú y créditos. Lo aplicamos con Heebo.

**No tomar**
- El fondo blanco: Sinapsis sigue sobre negro, como Banijay y BBC.
- Su tipografía (GT Zirkon). Es solo una referencia estética.

### Banijay — banijay.com

**Tomar**
- **Negro de fondo con las imágenes de los proyectos como protagonistas.** El color de la marca (el magenta en Banijay, el celeste en Sinapsis) aparece en detalles: un punto, una barra, el ítem activo del menú.
- **Video de portada** con una frase corta encima.
- **Cómo se presentan y reproducen los videos y las miniaturas**, igual que en Canada: en movimiento, limpias y bien organizadas.
- **Menú arriba a la derecha** con pocas secciones claras.

**No tomar (por ahora)**
- La sección de números («Banijay in Numbers»). La evaluamos más adelante.

### Kenya Films — kenyafilms.com

**Tomar**
- El **pie fijo mínimo**: una barra abajo con ciudad, email y redes.

**No tomar**
- El fondo negro (se reemplaza por azul profundo), el slider de portada a pantalla completa, los pósters verticales y el menú reducido a 4 opciones.

### BBC Studios — bbcstudios.com

**Tomar**
- **Organización de la información.** Menú desplegable con subsecciones (por ejemplo «What we do» → Global Content / Channels / Talent).
- **Uso del color.** Negro limpio, texto blanco, imagen grande con epígrafe (qué es, quién lo produjo, para qué canal).
- **Ubicación del menú:** logo a la izquierda, menú a la derecha, barra fija arriba.

**No tomar**
- Las miniaturas quietas: en Sinapsis se mueven, como en Canada y Banijay.
- Todo lo propio del ecosistema BBC (buscador, manual de marca).

## Mapa del sitio propuesto

```
Inicio
Qué hacemos ▾
   Formatos originales
   Producciones
   Showrunning
   Consultoría
Proyectos            ← archivo completo con filtros (nuevo)
Equipo
Prensa
Reel
Contacto
ES / EN
```

Mantiene la misma organización del sitio actual, como hacen las tres referencias. Se suma **Proyectos**: un archivo con todo el material en una sola grilla filtrable.

## Cómo se clasifican los proyectos

Cada proyecto puede tener más de una etiqueta.

| Filtro | Opciones |
|---|---|
| Tipo de trabajo | Formato original · Producción · Showrunning · Consultoría |
| Género | Entretenimiento · Reality / Competencia · Game show · Talent · Documental · Ficción · Infantil · Deportes |

La lista de géneros es una propuesta: se ajusta cuando estén cargados todos los proyectos.

## Ficha de cada proyecto

- Miniatura en movimiento (clip corto) → al hacer clic, abre la página del proyecto
- Título · año · canal o cliente · países
- Descripción corta
- Premios (si tiene)
- Video completo (YouTube o Vimeo)
- Fotos adicionales (opcional)

Todos los proyectos se cargan en una planilla: [proyectos.csv](proyectos.csv). Ya tiene los 29 proyectos del sitio actual. Para sumar uno nuevo, se agrega una fila.

## Miniaturas en movimiento: qué se necesita

Por cada proyecto, un clip:
- **5 a 8 segundos**, sin sonido, que funcione en loop
- Horizontal **16:9**, ancho de 1280 px alcanza
- Formato **MP4**, idealmente **menos de 3 MB**

Si me pasás los videos originales, yo recorto y comprimo los clips. Solo hace falta indicar qué momento usar, o dejarme elegir.

## Contacto (estilo Canada)

Bloques por oficina, en columnas:

| Buenos Aires | Miami |
|---|---|
| Av. Corrientes 4035 (timbre 3) | Dirección (a completar) |
| Teléfono (a completar) | Teléfono (a completar) |
| info@sinapsisproduccion.com | Email (a completar) |

Más el formulario, las redes y el mapa. Lo mismo se resume en el pie de todas las páginas.

## Pendientes de Darwin

1. **Proyectos nuevos:** sumarlos a `proyectos.csv` (se abre con Excel, Numbers o Google Sheets).
2. **Videos o clips** de cada proyecto para las miniaturas.
3. **Datos de contacto** que faltan: teléfonos y dirección/email de Miami.
4. **Redes:** ¿siguen activos Twitter/X e Instagram? ¿Hay LinkedIn, YouTube o Vimeo de la productora?
5. **Equipo:** ¿siguen los mismos tres integrantes? ¿Hay fotos nuevas?
6. **Prensa:** ¿se suman notas más recientes?

## Errores del sitio actual a no repetir

- En Consultoría, los logos de Univision/GV y TV Azteca/Latina tienen textos repetidos o cruzados.
- Hay títulos con formato roto (asteriscos sueltos) y el typo «DESARROLLLOS».
- El copyright está fijo en 2021.
