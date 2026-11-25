// Adivina la ficha de un template leyendo el texto del prompt.
// Se usa en build.mjs para todo archivo que no traiga cabecera (o le falten campos).

// --- Nombre -------------------------------------------------------------
const PATRONES_NOMBRE = [
  /\b(?:called|named|titled|brand(?:ed)?(?: name)?(?: is)?)\s*[:\-]?\s*["“'`*]{1,2}([^"”'`*\n]{2,40})["”'`*]{1,2}/i,
  /\b(?:called|named)\s+([A-Z][A-Za-z0-9_.]{1,30})\b/,
  /\bBuild:?\s*["“]([^"”\n]{2,40})["”]/i,
  /<title>\s*([^<\n]{2,60})<\/title>/i,
  /\btitle\s*:\s*["“`]?([^"”`\n]{2,60})/i,
  /\bBrand(?: name)?:\s*\**\s*([A-Z][^\n(]{1,30})/,
  /\bfor\s+["“]([^"”\n]{2,40})["”]/i,
  /["“]([A-Z][A-Za-z0-9._ ]{1,24})["”]/,
];

// Sin nombre propio: arma uno con lo que describe la primera frase ("Dental clinic hero").
const RELLENO = /^(build|create|recreate|make|design|implement|code|exactly|this|that|one|a|an|the|single|full|screen|full-screen|single-page|standalone|premium|luxury|dark|cinematic|modern|minimal|beautiful|immersive|pixel|faithful|react|vite|typescript|tailwind|html|css|js|\+|-|style|style:)$/i;
function nombreDescriptivo(texto) {
  const frase = texto.replace(/^[\s#*>]*(\*\*)?prompt:?(\*\*)?\s*/i, '').split(/[\n.(]/)[0];
  // La palabra clave tiene que estar suelta (no dentro de "single-page").
  const m = frase.match(/^(.*?)(?<![\w-])(landing|hero|section|dashboard|page|website|site)(?![\w-])/i);
  // "hero", "section" y "dashboard" describen; "landing", "page" y "site" no aportan.
  const sufijo = m && /^(hero|section|dashboard)$/i.test(m[2]) ? ' ' + m[2].toLowerCase() : '';
  const base = m ? m[1] + sufijo : frase;
  const palabras = base.replace(/-style\b/gi, '').split(/[\s,/]+/)
    .filter((w) => w && !RELLENO.test(w) && !/^(page|landing|site|website)$/i.test(w));
  const nombre = palabras.slice(-4).join(' ');
  return nombre ? nombre[0].toUpperCase() + nombre.slice(1) : 'Sin nombre';
}

export function adivinarNombre(texto) {
  for (const re of PATRONES_NOMBRE) {
    const m = texto.match(re);
    if (m) {
      // "Wealth — Dashboard" / "NOVA_AI — Today AI…" → nos quedamos con la primera parte
      const nombre = m[1].split(/\s+[—–|-]\s+/)[0].replace(/[*_`]+$/g, '').trim();
      if (nombre.length >= 2) return nombre;
    }
  }
  return nombreDescriptivo(texto);
}

// --- Tipo ---------------------------------------------------------------
export function adivinarTipo(texto) {
  const t = texto.slice(0, 1500).toLowerCase(); // la intención está al principio
  if (/dashboard|admin panel|\bweb app\b|\bapp ui\b/.test(t)) return 'Apps y dashboards';
  if (/landing|single[- ]page|\bwebsite\b|\bsite\b|\bexperience\b/.test(t)) return 'Landings';
  if (/(pricing|testimonials?|faq|footer|feature|contact|gallery|cta)\s+(page\s+)?section|\bsection\b(?! \d)/.test(t) && !/hero/.test(t)) return 'Secciones';
  if (/\bhero\b/.test(t)) return 'Heros';
  return 'Landings';
}

// --- Categoría ----------------------------------------------------------
const CATEGORIAS = [
  ['Real Estate', /real estate|property|properties|residenc|estate\b|inmobiliari/],
  ['Salud', /dental|dentist|clinic|medical|health|doctor|wellness/],
  ['Finanzas', /financ|wealth|bank|crypto|invest|fintech|payment/],
  ['Food', /bakery|food|restaurant|coffee|cafe|menu|chef|culinar/],
  ['Ecommerce', /jewel|skincare|beauty|cosmetic|fashion|\\bshop\\b|store|ecommerce|e-commerce|product carousel/],
  ['Educación', /learn coding|course|curriculum|school|academy|learning platform/],
  ['Creative', /cyberpunk|futuristic|surreal|reverie|augmented|sci-fi/],
  ['Photography', /photograph|wildlife|camera|archive of photos/],
  ['Agro', /farm|agri|crop|harvest/],
  ['Travel', /travel|journey|voyage|destination|planet|space/],
  ['AI', /\bai\b|artificial intelligence|machine learning|llm|agent/],
  ['SaaS', /saas|email client|software|platform|startup|productivity/],
  ['Portfolio', /portfolio|studio|agency|designer|creative/],
  ['Pricing', /pricing|plans?\b|subscription/],
];

export function adivinarCategoria(texto) {
  const t = texto.slice(0, 2500).toLowerCase();
  // Gana la categoría con más coincidencias (empate: la primera de la lista).
  let mejor = ['Otros', 0];
  for (const [cat, re] of CATEGORIAS) {
    const n = (t.match(new RegExp(re.source, 'g')) || []).length;
    if (n > mejor[1]) mejor = [cat, n];
  }
  return mejor[0];
}

// --- Tags (tecnologías y técnicas) --------------------------------------
const TAGS = [
  ['React', /\breact\b/i], ['Vue', /\bvue\b/i], ['Svelte', /\bsvelte\b/i], ['Next.js', /next\.?js/i],
  ['Tailwind', /tailwind/i], ['GSAP', /\bgsap\b|scrolltrigger/i], ['Three.js', /three\.?js|\bwebgl\b/i],
  ['Framer Motion', /framer|motion\/react/i], ['Lottie', /lottie/i], ['Canvas', /\bcanvas\b/i],
  ['Video', /\.mp4|\bvideo\b/i], ['Scroll', /scroll-?(driven|triggered|scrub)|scrollytelling|on scroll/i],
  ['Parallax', /parallax/i], ['Glassmorphism', /glass|backdrop-filter|backdrop-blur/i],
  ['Carrusel', /carousel|slider|marquee/i], ['Preloader', /preloader|splash|loader/i],
  ['HTML puro', /no frameworks?|pure html|single[- ]file html|self-contained html/i],
];

export function adivinarTags(texto) {
  return TAGS.filter(([, re]) => re.test(texto)).map(([tag]) => tag).slice(0, 6);
}

// --- Colores (para la miniatura) ----------------------------------------
export function adivinarColores(texto) {
  const hex = [...texto.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)].map((m) => {
    const h = m[1].length === 3 ? m[1].replace(/./g, (c) => c + c) : m[1];
    return '#' + h.toLowerCase();
  });
  const unicos = [...new Set(hex)];
  if (!unicos.length) return null;
  const luz = (h) => { const n = parseInt(h.slice(1), 16); return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000; };
  // Miniatura legible: el más oscuro de fondo, un color intermedio y el más claro para el texto.
  const orden = [...unicos].sort((a, b) => luz(a) - luz(b));
  const fondo = orden[0];
  const medio = unicos.find((h) => h !== fondo && luz(h) > 40 && luz(h) < 210) || unicos.find((h) => h !== fondo) || fondo;
  const claro = orden[orden.length - 1];
  // El texto de la miniatura tiene que contrastar con el fondo.
  const texto2 = luz(claro) - luz(fondo) > 110 ? claro : (luz(fondo) < 128 ? '#ffffff' : '#111111');
  return [fondo, medio, texto2];
}

export function clasificar(texto) {
  const ficha = {
    nombre: adivinarNombre(texto),
    tipo: adivinarTipo(texto),
    categoria: adivinarCategoria(texto),
    tags: adivinarTags(texto),
  };
  const colores = adivinarColores(texto);
  if (colores) ficha.colores = colores;
  return ficha;
}
