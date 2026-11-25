# Galería de templates

Panel para organizar prompts y páginas HTML de landings, heros, secciones y dashboards.

## Agregar un template

1. Sube el archivo desde GitHub ("Add file → Upload files"):
   - prompts → carpeta `prompts/`, como `.md`
   - páginas HTML → carpeta `templates/`, como `.html`
2. El nombre del archivo es su identificador, por ejemplo `velora.md`. Usa minúsculas y guiones.
3. Listo. GitHub regenera el panel solo en uno o dos minutos.

## Cabecera (opcional pero recomendada)

Al principio de un prompt `.md`:

```
---
nombre: VELORA
tipo: Landings
categoria: Real Estate
tags: React, Tailwind, video
destacado: sí
---
Create a luxury real estate landing page...
```

Al principio de un `.html`, como comentario:

```html
<!-- nombre: Anchor AI | tipo: Landings | categoria: Portfolio -->
```

Sin cabecera, el template aparece igual: toma el nombre del archivo y queda en "Sin clasificar".

Tipos que se usan hoy: `Landings`, `Heros`, `Secciones`, `Apps y dashboards`.

Campos opcionales: `tags`, `colores` (tres colores hex separados por coma, para la miniatura), `nota` (descripción corta) y `destacado`.

## Prompt construido

Si un prompt se construye, guarda el HTML resultante en `templates/` con **el mismo nombre** (`prompts/velora.md` → `templates/velora.html`). La tarjeta pasa a mostrar la preview en vivo.

## Otros archivos

- `fichas.json` — fichas escritas a mano para templates cuyo archivo todavía no se subió. Cuando subes el archivo, se combinan solas.
- `datos.js` — generado por `build.mjs`. No se edita a mano.
- Para verlo en tu compu sin internet: `node build.mjs` y abre `index.html`.
