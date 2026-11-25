# Galería de templates

Panel para organizar prompts y páginas HTML de landings, heros, secciones y dashboards.

## Agregar un template

**Lo más fácil:** en el panel, botón **+ Agregar** → pega el prompt → **Abrir en GitHub** → **Commit changes**. Nada más.

El panel detecta solo el nombre, el tipo (Landings, Heros, Secciones o Apps y dashboards), la categoría, las tecnologías y los colores, leyendo el texto del prompt (`clasificar.mjs`).

También puedes subir los archivos directamente:

1. Sube el archivo desde GitHub ("Add file → Upload files"):
   - prompts → carpeta `prompts/`, como `.md` o `.txt`
   - páginas HTML → carpeta `templates/`, como `.html`
2. El nombre del archivo es su identificador, por ejemplo `velora.md`. Usa minúsculas y guiones.
3. Listo. GitHub regenera el panel solo en uno o dos minutos.

## Cabecera (opcional: solo para corregir lo detectado)

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

Sin cabecera, todo se detecta solo. Lo que escribas en la cabecera tiene prioridad.

Tipos que se usan hoy: `Landings`, `Heros`, `Secciones`, `Apps y dashboards`.

Campos opcionales: `tags`, `colores` (tres colores hex separados por coma, para la miniatura), `nota` (descripción corta) y `destacado`.

## Prompt construido

Si un prompt se construye, guarda el HTML resultante en `templates/` con **el mismo nombre** (`prompts/velora.md` → `templates/velora.html`). La tarjeta pasa a mostrar la preview en vivo.

## Otros archivos

- `fichas.json` — fichas escritas a mano para templates cuyo archivo todavía no se subió. Cuando subes el archivo, se combinan solas.
- `datos.js` — generado por `build.mjs`. No se edita a mano.
- Para verlo en tu compu sin internet: `node build.mjs` y abre `index.html`.
