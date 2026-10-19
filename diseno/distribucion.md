# Distribución del contenido — versión B

18/10/2026 · Propuesta de cómo ubicar textos y elementos en cada página. Los textos pueden cambiar después: esto define **dónde va cada cosa**.

## Cómo está hoy

| Página | Largo (computadora) | Observación |
|---|---|---|
| Inicio | 2,7 pantallas | Buena base. Los 6 proyectos pesan todos igual: ninguno se destaca. |
| Proyectos | 4,1 pantallas | Los filtros quedan a la derecha, lejos de la vista. No hay página propia por proyecto: todo se abre en una ventana. |
| Nosotros | 3,0 pantallas | El equipo ocupa casi la mitad de la página (415 de 533 palabras). Las biografías tapan todo lo demás. |
| Prensa | 1,6 pantallas | Funciona. Falta ordenar por año. |
| Contacto | — | No existe como página: el menú lleva al pie. |

**Problema de fondo:** cada sección se alinea distinto. "¿Quiénes somos?" tiene la etiqueta a la izquierda y el texto a la derecha; otras secciones ponen el título arriba; los créditos de los proyectos están centrados. No hay una regla común.

## Qué hacen las referencias en sus páginas internas

| Sitio | Nosotros | Proyecto | Contacto |
|---|---|---|---|
| [Canada](https://www.canadacanada.com/about) | 4 párrafos cortos en una columna angosta y, abajo, el equipo como **directorio** (cargo — nombre), sin fotos ni biografías | [Video a pantalla completa](https://www.canadacanada.com/project/airbnb), título debajo y créditos desplegables | [Bloques por oficina](https://www.canadacanada.com/contact) que se abren y cierran |
| [Kenya Films](https://kenyafilms.com/nosotros/) | Texto sobre una foto grande; abajo, una fila con los 3 nombres del equipo y sus redes | — | Formulario + mapa + dirección |
| [Banijay](https://www.banijay.com/our-story/) | Frase grande, cifras, valores y link al catálogo (3,7 pantallas) | — | — |

**Lo que se repite:** el texto institucional es corto y va arriba; el equipo se muestra **compacto** (nombre y cargo, sin biografías largas); cada proyecto tiene **su propia página** con el video primero y la ficha después.

---

## 1. Regla general: una grilla de 12 columnas con "columna de etiqueta"

Todas las secciones usan el mismo esquema: **etiqueta a la izquierda (3 columnas), contenido a la derecha (9 columnas)**. Es lo que hoy tiene solo "¿Quiénes somos?", llevado a todo el sitio.

```
| 1  2  3 | 4  5  6  7  8  9  10  11  12 |
| ETIQUETA| Contenido                     |
| ETIQUETA| Contenido                     |
```

- Los títulos y créditos van **alineados a la izquierda** en todo el sitio (hoy los créditos de proyectos están centrados).
- Solo **3 espacios** entre bloques: chico (24 px), medio (64 px) y grande (120 px).
- **En celular**, la etiqueta pasa arriba del contenido y todo queda en una sola columna.

---

## 2. Inicio

```
┌──────────────────────────────────────────────────────────────┐
│ [logo]                       PROYECTOS NOSOTROS PRENSA CONTACTO│
│                                                              │
│            REEL (se reproduce solo) — 80% de la pantalla     │
│                                                              │
│ Desarrollo y dirección de                    [▶ Ver reel]    │
│ formatos y contenidos.                                       │
│ CREACIÓN / PRODUCCIÓN / SHOWRUNNING / CONSULTORÍA            │
├─────────┬────────────────────────────────────────────────────┤
│ SINAPSIS│ Productora audiovisual especializada en crear,     │  ← frase grande
│         │ desarrollar, formatear y producir contenidos.      │
│         │ +30 años · 11 países · Buenos Aires y Miami        │  ← una línea chica
│         │ Conocé al equipo →                                 │
├─────────┼────────────────────────────────────────────────────┤
│ PROYEC- │ ┌──────────────────────┐ ┌──────────┐              │
│ TOS     │ │   DESTACADO GRANDE   │ │ chico 1  │              │  ← 1 grande + 2 chicos
│         │ │      (8 col.)        │ ├──────────┤              │
│         │ │                      │ │ chico 2  │              │
│         │ └──────────────────────┘ └──────────┘              │
│ Ver     │ ┌────────┐ ┌────────┐ ┌────────┐                   │  ← 3 iguales
│ todos → │ │        │ │        │ │        │                   │
├─────────┼────────────────────────────────────────────────────┤
│ QUÉ     │ Formatos     Producciones  Showrunning  Consultoría│  ← 4 links de texto
│ HACEMOS │ originales                                         │     (sin imágenes)
├─────────┼────────────────────────────────────────────────────┤
│ CLIENTES│ NETFLIX  T  elnueve  PAKA  encuentro  canal7  amér.│
├─────────┴────────────────────────────────────────────────────┤
│ pie                                                          │
└──────────────────────────────────────────────────────────────┘
```

**Cambios respecto de hoy:**
1. **El reel ocupa el 80% de la pantalla**, no el 88%: así asoma la frase de abajo e invita a bajar.
2. **La frase de presentación usa la columna de etiqueta**, y los datos (+30 años, 11 países, 2 oficinas) se resumen en una sola línea.
3. **Proyectos con jerarquía:** 1 grande + 2 chicos + 3 iguales, en lugar de 6 iguales. El grande es el proyecto más importante del momento (se elige en la planilla).
4. **Vuelve "Qué hacemos" como una franja fina de 4 links de texto**, sin imágenes. Explica qué hace la productora sin agregar peso, y cada link abre Proyectos ya filtrado.

---

## 3. Proyectos (el archivo)

```
┌─────────┬────────────────────────────────────────────────────┐
│         │ Proyectos.                                         │
│         │ [TODOS]  FORMATOS  PRODUCCIONES  SHOWRUNNING       │  ← filtros debajo del título
│         │ 21 proyectos                  Ver: ▦ Grilla ☰ Lista│  ← cantidad + cambio de vista
├─────────┴────────────────────────────────────────────────────┤
│ ┌────────┐ ┌────────┐ ┌────────┐                             │
│ │        │ │        │ │        │   TÍTULO                    │
│ └────────┘ └────────┘ └────────┘   Canal · Año                │  ← crédito a la izquierda
│ ...                                                          │
├─────────┬────────────────────────────────────────────────────┤
│ CONSUL- │ Cliente           Qué se hizo                 Año │  ← lista, como hoy
│ TORÍA   │ ─────────────────────────────────────────────────  │
└─────────┴────────────────────────────────────────────────────┘
```

- **Los filtros pasan debajo del título**, a la vista, con la cantidad de proyectos.
- **Vista de lista opcional** (año · título · canal · tipo), al estilo del archivo de Somesuch. Sirve para los proyectos sin buena imagen y para recorrer rápido.

### Página de cada proyecto (nueva, reemplaza la ventana emergente)

```
┌──────────────────────────────────────────────────────────────┐
│                  VIDEO (ancho completo)                      │
├─────────┬────────────────────────────────────────────────────┤
│ #MARCHA │ Proyecto transmedia documental: el genocidio nazi  │  ← título + descripción
│         │ desde la mirada adolescente.                       │
├─────────┼──────────────────────────┬─────────────────────────┤
│ FICHA   │ Año        2019          │ Canal   TVP / Encuentro │  ← ficha en 2 columnas
│         │ Formato    Serie + film  │ Países  AR · PL · IL    │
│         │ Trabajo    Formato orig. │                         │
├─────────┼──────────────────────────┴─────────────────────────┤
│ PREMIOS │ Argentores 2019 · Jewish Film Festival 2019        │
├─────────┼────────────────────────────────────────────────────┤
│ FOTOS   │ ▢ ▢ ▢                                              │  ← opcional
├─────────┴────────────────────────────────────────────────────┤
│ ← Anterior                                     Siguiente →   │
└──────────────────────────────────────────────────────────────┘
```

Es la estructura de Canada (video primero, créditos después), con la ficha ordenada. Cada proyecto tiene así **su propio link para compartir**, por ejemplo con un canal.

---

## 4. Nosotros

```
┌─────────┬────────────────────────────────────────────────────┐
│         │ Nosotros.                                          │
├─────────┼────────────────────────────────────────────────────┤
│         │ Sinapsis Producción es una productora              │  ← 2–3 frases, letra grande
│         │ audiovisual especializada en crear...              │
├─────────┼────────────────────────────────────────────────────┤
│ QUÉ     │ Formatos originales     │ Producciones             │  ← 2 × 2
│ HACEMOS │ 1 línea + link          │ 1 línea + link           │
│         │ Showrunning             │ Consultoría              │
├─────────┼────────────────────────────────────────────────────┤
│ EQUIPO  │ ┌──────┐   ┌──────┐   ┌──────┐                     │  ← 3 en fila
│         │ │ foto │   │ foto │   │ foto │                     │
│         │ └──────┘   └──────┘   └──────┘                     │
│         │ Marcos     Silvina    Mario                        │
│         │ Gorban     Acosta     Borovich                     │
│         │ Dirección  Socia      Director de                  │
│         │ General    Gerente    contenidos                   │
│         │ 2 líneas   2 líneas   2 líneas                     │  ← resumen corto
│         │ Ver bio +  Ver bio +  Ver bio +                    │  ← se despliega la completa
├─────────┼────────────────────────────────────────────────────┤
│ OFICINAS│ Buenos Aires            │ Miami                    │
└─────────┴────────────────────────────────────────────────────┘
```

- **El equipo pasa a una fila de 3**, con foto, nombre, cargo y un resumen de 2 líneas. La biografía completa se despliega con "Ver bio +".
- Con eso Nosotros pasa de 3 pantallas a unas 2, y el equipo deja de tapar el resto.

---

## 5. Prensa

```
┌─────────┬────────────────────────────────────────────────────┐
│         │ Prensa.                                            │
├─────────┼────────────────────────────────────────────────────┤
│ 2021    │ TÉLAM       Experimentores: ciencia para...      ↗ │  ← agrupado por año
│         │ TIEMPO AR.  Entrevista a Tomás Fonzi...          ↗ │
├─────────┼────────────────────────────────────────────────────┤
│ 2019    │ INFOBAE     #Marcha, nominado a los Martín...    ↗ │
└─────────┴────────────────────────────────────────────────────┘
```

- **Agrupar por año** usando la columna de etiqueta (hoy algunas notas no tienen fecha: hay que completarlas).
- Más adelante se puede sumar arriba una nota destacada con foto.

---

## 6. Contacto (página nueva)

```
┌─────────┬────────────────────────────────────────────────────┐
│         │ Contacto.                                          │
├─────────┼──────────────────────────┬─────────────────────────┤
│ OFICINAS│ BUENOS AIRES             │ MIAMI                   │
│         │ Av. Corrientes 4035      │ (dirección)             │
│         │ +54 ...                  │ +1 ...                  │
│         │ info@...                 │ ...@...                 │
├─────────┼──────────────────────────┴─────────────────────────┤
│ ESCRI-  │ Proyectos y formatos     formatos@...              │  ← un email por tema
│ BINOS   │ Prensa                   prensa@...                │     (si existen)
├─────────┼────────────────────────────────────────────────────┤
│ REDES   │ ◯ ◯                                                │
└─────────┴────────────────────────────────────────────────────┘
```

- Sigue el modelo de Canada: **cada oficina en su bloque**, con todo a la vista.
- **El pie se achica** a una sola línea (ciudades · email · redes), porque los datos completos pasan a esta página.

---

## Prioridad sugerida

1. **Grilla de etiqueta + contenido en todas las páginas** y créditos a la izquierda. Es lo que más ordena.
2. **Nosotros con el equipo compacto.**
3. **Inicio:** proyectos con jerarquía y franja "Qué hacemos".
4. **Página de cada proyecto.**
5. **Contacto** como página propia y pie de una línea.
6. **Prensa** agrupada por año y vista de lista en Proyectos.

**Datos que hacen falta de tu parte:** teléfonos y dirección de Miami, emails por tema (si existen) y fechas de las notas de prensa.
