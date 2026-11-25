// Genera datos.js leyendo prompts/*.md y templates/*.html.
// Cada archivo puede llevar una cabecera con su ficha; fichas.json es opcional
// y sirve para completar datos o registrar entradas cuyo archivo aún no se subió.
// Uso: node build.mjs
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const listas = new Set(['tags', 'colores']);

// Lee "clave: valor" (una por línea, o separadas por "|") y devuelve un objeto.
function parsearCampos(texto) {
  const out = {};
  for (const linea of texto.split(/\n|\|/)) {
    const m = linea.match(/^\s*([a-zA-Záéíóú]+)\s*:\s*(.+?)\s*$/);
    if (!m) continue;
    const clave = m[1].toLowerCase().replace('categoría', 'categoria');
    let valor = m[2];
    if (listas.has(clave)) valor = valor.split(',').map((s) => s.trim()).filter(Boolean);
    else if (clave === 'destacado') valor = /^(s[ií]|true|yes)$/i.test(valor);
    out[clave] = valor;
  }
  return out;
}

// Markdown: bloque --- ... --- al inicio. HTML: primer comentario <!-- ... -->.
function leerCabecera(contenido, ext) {
  if (ext === '.md') {
    const m = contenido.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    return m ? { campos: parsearCampos(m[1]), cuerpo: contenido.slice(m[0].length) } : { campos: {}, cuerpo: contenido };
  }
  const m = contenido.match(/<!--([\s\S]*?)-->/);
  return { campos: m && /nombre\s*:/i.test(m[1]) ? parsearCampos(m[1]) : {}, cuerpo: contenido };
}

const fichas = existsSync(join(dir, 'fichas.json')) ? JSON.parse(readFileSync(join(dir, 'fichas.json'), 'utf8')) : [];
const porId = new Map(fichas.map((f) => [f.id, { ...f }]));

for (const [carpeta, formato, ext] of [['prompts', 'prompt', '.md'], ['templates', 'codigo', '.html']]) {
  const ruta = join(dir, carpeta);
  if (!existsSync(ruta)) continue;
  for (const archivo of readdirSync(ruta).filter((f) => extname(f) === ext).sort()) {
    const id = basename(archivo, ext);
    const contenido = readFileSync(join(ruta, archivo), 'utf8');
    const { campos, cuerpo } = leerCabecera(contenido, ext);
    const previa = porId.get(id);
    // Un HTML con el mismo id que un prompt es la versión construida de ese prompt.
    if (formato === 'codigo' && previa?.formato === 'prompt') {
      previa.construido = `${carpeta}/${archivo}`;
      continue;
    }
    porId.set(id, {
      id,
      nombre: id,
      tipo: 'Sin clasificar',
      categoria: 'Sin categoría',
      ...previa,
      ...campos,
      formato,
      archivo: `${carpeta}/${archivo}`,
      ...(formato === 'prompt' ? { texto: cuerpo.trim() } : {}),
      ...(formato === 'prompt' && !campos.nota && !previa?.nota ? { nota: cuerpo.trim().slice(0, 160) } : {}),
    });
  }
}

const datos = [...porId.values()].map((it) => ({
  ...it,
  existe: existsSync(join(dir, it.archivo)),
  construido: it.construido || (it.formato === 'prompt' ? `templates/${it.id}.html` : undefined),
  construidoExiste: !!it.construido && existsSync(join(dir, it.construido)),
}));

writeFileSync(join(dir, 'datos.js'), `// Generado por build.mjs — no editar a mano.\nwindow.GALERIA = ${JSON.stringify(datos, null, 2)};\n`);
console.log(`datos.js: ${datos.length} entradas (${datos.filter((d) => d.existe).length} con archivo)`);
