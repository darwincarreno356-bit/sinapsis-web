# Análisis de navegación — home actual

18/10/2026 · Versión analizada: fondo azul profundo, commit `de56107`.

## Diagnóstico

| Medida | Hoy |
|---|---|
| Largo de la home | **5 pantallas** en computadora, **~8** en celular |
| Secciones apiladas | **7** (portada + carrusel, clientes, quiénes somos, qué hacemos, proyectos, reel, contacto) |
| Elementos clicables | **64** |
| Formas distintas de mostrar contenido | **7** (carrusel, placas de logos, texto en dos columnas, 4 tarjetas, grilla con filtros, video ancho, pie en columnas) |
| Ítems en el menú | 6 + desplegable de 4 + idioma |
| Palabras | ~250 |

**El problema no es la cantidad de texto, que es poca. Es la cantidad de bloques y que se repiten.**

1. **"Qué hacemos" aparece 3 veces:** en el desplegable del menú, en las 4 tarjetas y en los 5 filtros de Proyectos. Las tres llevan al mismo lugar.
2. **Los proyectos destacados aparecen 2 veces:** en el carrusel de arriba y de nuevo en la grilla.
3. **El reel tiene sección propia al final**, cuando es lo más fuerte que tiene la productora.
4. **Cada sección tiene un diseño distinto.** El ojo tiene que reaprender la página siete veces.
5. **El menú mezcla secciones de la home** (Proyectos, Reel, Contacto) **con páginas aparte** (Equipo, Prensa). No queda claro qué va a pasar al hacer clic.

## Qué hacen las referencias

| Sitio | Home | Menú | Qué tomar |
|---|---|---|---|
| [Canada](https://www.canadacanada.com/) | Una sola fila de trabajos con video. Nada más. | 6 ítems chicos, sin desplegables | La home es el trabajo; todo lo demás está en otras páginas |
| [Kenya Films](https://kenyafilms.com/) | Un slider de proyectos, en **1 pantalla** | 4 ítems: Home, Proyectos, Nosotros, Contacto | Menú de 4 ítems; "Nosotros" junta empresa y equipo |
| [Iconoclast](https://iconoclast.tv/) | Un solo video a pantalla completa, en **1 pantalla** | 4 ítems + contacto | Portada con un video que se reproduce solo |
| [Somesuch](https://somesuch.co/) | Lista de trabajos recientes con título grande | Latest, Directors, Archive, About, Contact | Títulos grandes y una sola forma de mostrar trabajos |
| [Keshet International](https://www.keshetinternational.com/) | **Contraejemplo:** 5+ pantallas, 12 secciones y menú de 10 ítems | — | Lo que hay que evitar: una home corporativa que lo cuenta todo |

Las productoras con sitios más limpios coinciden en tres cosas: **la home muestra trabajo, no explica**; **el menú tiene 4 o 5 ítems sin desplegables**; y **cada tema vive en su propia página**.

## Recomendaciones

### 1. Menú de 4 ítems, sin desplegable

```
[logo]                         PROYECTOS   NOSOTROS   PRENSA   CONTACTO   ES / EN
```

- **Proyectos:** reemplaza a "Qué hacemos" y a sus 4 subpáginas. Las categorías pasan a ser filtros dentro de la página.
- **Nosotros:** junta "Quiénes somos", "Qué hacemos" (en 4 líneas) y el equipo.
- **Prensa** y **Contacto**, como hoy.
- **Reel** sale del menú, porque pasa a estar en la portada.

### 2. Una home de 3 bloques (de 5 pantallas a ~2)

```
┌─────────────────────────────────────────────┐
│  REEL a pantalla casi completa,             │  ← se reproduce solo, sin sonido
│  una frase: "Desarrollo y dirección de      │     botón: "Ver reel completo"
│  formatos y contenidos."                    │
├─────────────────────────────────────────────┤
│  ▢ ▢ ▢                                      │  ← 6 proyectos destacados
│  ▢ ▢ ▢          Ver todos los proyectos →   │     sin filtros ni flechas
├─────────────────────────────────────────────┤
│  logos de clientes (una fila)               │
│  Buenos Aires · Miami · email · redes       │  ← pie
└─────────────────────────────────────────────┘
```

**Sale de la home:**
- "¿Quiénes somos?" y "¿Qué hacemos?" → pasan a **Nosotros**.
- Los filtros y el "Ver más" → pasan a **Proyectos**.
- El carrusel → lo reemplaza la grilla de 6 (se elige uno solo).
- La sección Reel del final → pasa a ser la portada.

### 3. Una sola forma de mostrar proyectos

En todo el sitio, la misma tarjeta 16:9 con el título abajo. Sin carrusel en un lado y grilla en el otro. Así se aprende una vez.

### 4. Página de Proyectos = el archivo

- Grilla completa con los filtros: Todos · Formatos · Producciones · Showrunning · Consultoría.
- Las consultorías pueden ir en una lista de texto aparte, debajo de la grilla, en vez de placas con logos que compiten con las imágenes.
- Más adelante, cada proyecto puede tener su propia página (video, ficha y fotos) en lugar de la ventana emergente.

### 5. Detalles que alivianan

- **El encabezado se esconde al bajar y aparece al subir.** Deja más lugar a las imágenes.
- **Marcar dónde estás:** el ítem del menú de la página actual queda entre [corchetes].
- **Logo una sola vez:** sacarlo del pie, porque ya está arriba.
- **Celular:** apuntar a una home de 3–4 pantallas, como mucho.

## Próximo paso sugerido

Armar la home de 3 bloques y el menú de 4 ítems como **variante**, sin borrar la actual, para comparar las dos lado a lado.
