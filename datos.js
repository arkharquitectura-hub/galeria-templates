// Generado por build.mjs — no editar a mano.
window.GALERIA = [
  {
    "id": "anchor-ai",
    "nombre": "Anchor AI",
    "tipo": "Landings",
    "categoria": "Portfolio",
    "formato": "codigo",
    "archivo": "templates/anchor-ai.html",
    "tags": [
      "3D",
      "Three.js",
      "partículas",
      "scroll"
    ],
    "colores": [
      "#01040a",
      "#218eff",
      "#5fd8ff"
    ],
    "destacado": true,
    "nota": "Árbol de partículas que se transforma en cubo al hacer scroll. Preloader y cursor propio.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "planet-jumping",
    "nombre": "Planet Jumping",
    "tipo": "Heros",
    "categoria": "Creative",
    "tags": [
      "video",
      "portal",
      "canvas",
      "espacio"
    ],
    "colores": [
      "#0a0908",
      "#b4532a",
      "#e8a070"
    ],
    "formato": "prompt",
    "archivo": "prompts/planet-jumping.md",
    "construido": "templates/planet-jumping.html",
    "destacado": true,
    "nota": "Portal con inclinación 3D que viaja Marte → Tierra → Venus con videos de transición.",
    "texto": "# Build: \"Planet Jumping\" — single-page immersive space portal experience\n\nCreate a SINGLE self-contained HTML file (inline <style> and <script>, no build step,\nno external JS/CSS libraries). It must render a full-viewport cinematic landing\nexperience with a canvas-driven 3D \"portal\" and a video preloader sequence.\n\n====================================================================\n1. REMOTE ASSETS — use these EXACT URLs (do not substitute)\n====================================================================\nBASE = https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P\n\nMARS_BG   (video) = BASE/3c83091e-4046-4fd6-adbb-2edb728be79a.mp4\nTO_EARTH  (video) = BASE/fc3ded42-e845-41f3-a830-5cab512d79cd.mp4\nTO_VENUS  (video) = BASE/b30f64d9-1637-477a-83df-d0fc6461a422.mp4\nTO_MARS   (video) = BASE/5fc5651c-3b5d-4171-b507-87f7e635d1b4.mp4\nMERCURY   (image) = BASE/d6fb8b6b-c15e-4aaa-9cf7-45bbb5e33372.jpg\nLOGO      (svg)   = BASE/eb7e0f53-50cd-4af5-abc4-8b9a52cdc01b.svg\n\nAll <video> tags: muted, playsinline, preload=\"auto\". No controls, no autoplay\nattribute (playback is driven by JS).\n\n====================================================================\n2. FONTS\n====================================================================\nDeclare four @font-face rules (load from local files if present, otherwise the\nfallback stacks below must still produce the correct layout):\n  - \"SF Pro\"      weight 400  -> fallback: Arial, sans-serif\n  - \"SF Pro\"      weight 700\n  - \"SF Pro Thin\" weight 100  -> fallback: 'SF Pro', Arial, sans-serif\n  - \"Aalto\"       weight 400  -> fallback: 'Arial Narrow', sans-serif\n                                 (a tall condensed display face; used ONLY for the\n                                  giant planet title)\n:root { font-family:'SF Pro',Arial,sans-serif; color:#fff; background:#090807;\n        font-synthesis:none }\n\n====================================================================\n3. DOM STRUCTURE (exact ids/classes — the JS depends on them)\n====================================================================\n<main class=\"experience\" data-planet=\"mars\">\n  <div class=\"backgrounds\" aria-hidden=\"true\">\n    <video id=\"mars-background\"  class=\"background is-visible\" src=MARS_BG>\n    <video id=\"earth-background\" class=\"background\"            src=TO_EARTH>\n    <video id=\"venus-background\" class=\"background\"            src=TO_VENUS>\n  </div>\n  <div class=\"preloader\" id=\"preloader\" aria-label=\"Loading Mars\">\n    <video id=\"preloader-video\" src=TO_MARS>\n    <div class=\"preloader-shade\"></div>\n  </div>\n  <img class=\"floating-logo\" id=\"floating-logo\" src=LOGO alt=\"Ubernatural\">\n  <div class=\"preloader-count\" id=\"preloader-count\" aria-live=\"polite\">\n    <span id=\"preloader-value\">0</span><span class=\"percent\">%</span>\n  </div>\n  <canvas id=\"scene-canvas\" class=\"scene-canvas\" aria-hidden=\"true\"></canvas>\n  <div class=\"shade\" aria-hidden=\"true\"></div>\n\n  <header class=\"header chrome\">\n    <div class=\"header-actions\">\n      <nav class=\"nav\" aria-label=\"Primary navigation\">\n        <a class=\"active\" href=\"#about\">About</a><a href=\"#explore\">Explore</a><a href=\"#planets\">Planets</a>\n      </nav>\n      <button class=\"menu\" type=\"button\">Menu</button>\n    </div>\n  </header>\n\n  <aside class=\"planet-list chrome\" aria-label=\"Planets\"></aside>   <!-- JS-filled -->\n\n  <canvas id=\"portal-canvas\" class=\"portal-canvas\" aria-hidden=\"true\"></canvas>\n  <section class=\"portal-wrap chrome\" aria-label=\"Next destination\">\n    <div class=\"portal-heading\">\n      <span>Next:</span>\n      <span><span id=\"next-number\">[03]</span> <strong id=\"next-name\">Earth</strong></span>\n    </div>\n    <button class=\"portal\" id=\"portal\" type=\"button\" aria-label=\"Travel to Earth\">\n      <video id=\"portal-video\" src=TO_EARTH>\n      <img id=\"portal-image\" src=MERCURY alt=\"Mercury\">\n    </button>\n  </section>\n\n  <section class=\"planet-content chrome\" aria-live=\"polite\">\n    <h1 id=\"planet-title\">MARS</h1>\n    <dl id=\"facts\"></dl>                                           <!-- JS-filled -->\n  </section>\n\n  <div class=\"transition-layer\" aria-hidden=\"true\"><video id=\"transition-video\"></video></div>\n  <div class=\"loading\" aria-hidden=\"true\">Preparing orbit…</div>\n  <div class=\"custom-cursor\" aria-hidden=\"true\">\n    <span class=\"cursor-orbit\"></span><span class=\"cursor-dot\"></span><span class=\"cursor-label\">Enter</span>\n  </div>\n</main>\n\n====================================================================\n4. DATA MODEL\n====================================================================\nplanets = ['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune']\n\nstates = {\n mars:  { name:'Mars',  next:'Earth',   number:'[03]', portal:TO_EARTH,  background:'mars-background',\n   facts:[['Distance:','About 228 million km (1.5 astronomical units).'],\n          ['Year:','One Martian year is equal to 687 Earth days.'],\n          ['Temperature:','Around -60 °C, dropping to -125 °C at the poles in winter.'],\n          ['Atmosphere:','Very thin, consisting of 95% carbon dioxide, with frequent dust storms.']] },\n earth: { name:'Earth', next:'Venus',   number:'[02]', portal:TO_VENUS,  background:'earth-background',\n   facts:[['Distance:','149.6 million km from the Sun.'],\n          ['Year:','365.25 Earth days.'],\n          ['Temperature:','Average surface temperature around 15 °C.'],\n          ['Atmosphere:','Mostly nitrogen and oxygen, supporting life and liquid water.']] },\n venus: { name:'Venus', next:'Mercury', number:'[06]', image:MERCURY,    background:'venus-background',\n   facts:[['Distance:','108.2 million km from the Sun.'],\n          ['Year:','225 Earth days.'],\n          ['Temperature:','Around 465 °C — the hottest planet in the Solar System.'],\n          ['Atmosphere:','Extremely dense, mostly carbon dioxide, with clouds of sulfuric acid.']] }\n}\nStart state: 'mars'. Chain: mars -> earth -> venus (terminal; clicking at venus does nothing).\n\nrender() must: set data-planet; set #planet-title to name.toUpperCase(); set #next-name\nand #next-number; set portal aria-label to `Travel to ${next}`; build #facts as\n<div class=\"fact\"><dt>KEY</dt><dd>VALUE</dd></div>; build .planet-list as\n<span class=\"planet-item [active]\">Name</span> for all 8 planets (active = current);\non every re-render after the first, retrigger .is-switching on .planet-list (remove\nclass, force reflow via offsetWidth, re-add); toggle .is-visible on the matching\n.background video; show #portal-image / hide #portal-video when the state has `image`,\notherwise the inverse, swapping #portal-video.src to state.portal when it differs.\n\n====================================================================\n5. LAYOUT CSS (exact values)\n====================================================================\n*{box-sizing:border-box} html,body{margin:0;width:100%;height:100%;overflow:hidden}\n.experience{position:relative;width:100%;height:100%;min-height:540px;overflow:hidden;background:#0a0908}\n.backgrounds,.background,.shade,.transition-layer,.transition-layer video{position:absolute;inset:0;width:100%;height:100%}\n.background{object-fit:cover;opacity:0;transition:opacity .8s ease} .background.is-visible{opacity:1}\n.shade{z-index:1;background:linear-gradient(to bottom,transparent 52%,rgba(0,0,0,.88) 100%);pointer-events:none}\n.chrome{position:absolute;z-index:4;transition:opacity .45s ease,filter .45s ease}\n.experience.is-transitioning .chrome{opacity:0;filter:blur(8px);pointer-events:none}\n\nHEADER  .header{left/right:clamp(18px,1.95vw,28px);top:clamp(18px,3.1vh,28px);display:flex;justify-content:space-between;align-items:center}\n        .header-actions{margin-left:auto;display:flex;align-items:center}\n        .nav{display:flex;align-items:center;height:42px;padding:4px 5px;border:1px solid rgba(255,255,255,.45);\n             background:rgba(255,255,255,.1);backdrop-filter:blur(12px);border-radius:999px}\n        .nav a{color:#fff;text-decoration:none;padding:8px 19px;border-radius:999px;line-height:1}\n        .nav a.active{background:#fff;color:#000}\n        .menu{height:42px;padding:0 20px;border:0;border-radius:999px;background:#fff;color:#000;cursor:pointer}\n\nSIDEBAR .planet-list{left:clamp(18px,1.95vw,28px);top:50%;transform:translateY(-43%);display:flex;flex-direction:column;gap:6px;font-size:16px}\n        .planet-item{display:flex;align-items:center;min-height:20px}\n        .planet-item.active{font-size:18px;font-weight:700;gap:8px}\n        .planet-item.active:before{content:'';width:16px;height:16px;border-radius:50%;background:#fff}\n\nPORTAL  .portal-wrap{left:50%;top:50%;width:min(320px,31vw);transform:translate(-50%,-54%);perspective:none}\n        .portal-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:16px;opacity:0}\n        .portal-heading strong{font-size:18px;margin-left:8px}\n        .portal{position:relative;display:block;width:100%;aspect-ratio:320/350;padding:0;overflow:visible;border:0;\n                border-radius:90px;background:transparent;cursor:pointer;box-shadow:none;transform:none!important}\n        .portal video,.portal img{visibility:hidden;position:absolute;width:1px;height:1px;pointer-events:none}\n        .portal-canvas{position:fixed;inset:0;z-index:3;width:100%;height:100%;pointer-events:none}\n        (The real media elements are INVISIBLE — they exist only as pixel sources the canvas samples.)\n\nCONTENT .planet-content{left:clamp(28px,4vw,58px);right:clamp(28px,3vw,44px);bottom:clamp(24px,3vh,30px);\n                        display:flex;justify-content:space-between;align-items:flex-end;gap:40px}\n        .planet-content h1{font-family:Aalto,'Arial Narrow',sans-serif;font-size:clamp(128px,21.8vw,314px);\n          font-weight:400;line-height:.72;margin:0 0 -.04em;letter-spacing:0;transform:translateX(-32px);opacity:0}\n        .planet-content dl{width:min(447px,34vw);margin:0;font-size:16px}\n        .fact{display:grid;grid-template-columns:138px 1fr;gap:18px;padding:8px 0;\n              border-bottom:1px solid rgba(255,255,255,.48);opacity:0}\n        .fact:last-child{border-bottom:0} .fact dt{font-weight:700} .fact dd{margin:0}\n\nMISC    .transition-layer{display:none} .scene-canvas{display:none}\n        .loading{position:absolute;z-index:12;left:50%;bottom:30px;transform:translateX(-50%);opacity:0;\n                 font-size:12px;letter-spacing:.14em;text-transform:uppercase;transition:opacity .2s}\n        .experience.is-loading .loading{opacity:.8}\n        .experience.is-transitioning .header,.experience.is-transitioning .planet-list{opacity:1;filter:none;pointer-events:auto}\n        .experience.is-transitioning .shade{opacity:1}\n        .experience.is-committing .background{transition:none!important}\n\n====================================================================\n6. PRELOADER (the first ~3 seconds)\n====================================================================\n.preloader{position:absolute;inset:0;z-index:20;background:#000;overflow:hidden}\n.preloader video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\n.preloader-shade{position:absolute;inset:auto 0 0;height:35%;background:linear-gradient(to bottom,transparent,#000)}\n.preloader.is-background{z-index:0} .preloader.is-background .preloader-shade{opacity:0}\n.floating-logo{position:fixed;z-index:22;left:50%;top:50%;width:59px;height:58px;transform:translate(-50%,-50%);\n  will-change:left,top,width,height,transform;\n  transition:left 2s cubic-bezier(.16,1,.3,1),top 2s ...,width 2s ...,height 2s ...,transform 2s ...}\n.floating-logo.is-docked{left:clamp(18px,1.95vw,28px);top:clamp(18px,3.1vh,28px);width:37px;height:36px;transform:none}\n.floating-logo.is-settled{z-index:5}\n.preloader-count{position:fixed;z-index:22;left:50%;bottom:clamp(22px,3.1vh,28px);display:flex;align-items:flex-end;\n  gap:4px;transform:translateX(-50%);font-family:'SF Pro',Arial,sans-serif;line-height:1}\n.preloader-count>span:first-child{font-family:'SF Pro Thin','SF Pro',Arial,sans-serif;font-size:64px;font-weight:100}\n.preloader-count .percent{font-size:24px;padding-bottom:4px}\n.preloader-count.is-leaving{animation:preload-count-out .75s cubic-bezier(.22,1,.36,1) both}\n@keyframes preload-count-out{to{opacity:0;filter:blur(7px);transform:translate(-50%,-34px)}}\nbody:not(.preload-complete) .custom-cursor{opacity:0!important}\n\nBehaviour: once #preloader-video metadata is ready, set\n  video.playbackRate = Math.max(.25, video.duration / 3)      // sequence lasts ~3s\nthen play(). On each rAF write Math.round(currentTime/duration*100) into\n#preloader-value. On 'ended' (or if play() rejects) run finish() ONCE:\n  value = '100'; add .is-leaving to #preloader-count; add .is-docked to the logo\n  (it flies from screen centre to the header slot over 2s); add .is-background to\n  #preloader; add .preload-complete to body; call startExperience();\n  remove the counter after 750ms; add .is-settled to the logo after 2000ms.\n\nstartExperience(): await the current portal media being loadable -> await\nrevealMask() -> add .intro-ready to body -> after 850ms call revealPlanetContent().\n\n====================================================================\n7. THE PORTAL — canvas mask with fake 3D (core mechanic, be precise)\n====================================================================\nA fixed full-screen canvas (#portal-canvas) paints a rounded-rectangle \"window\"\nthrough which the portal media is visible. The media is drawn SCREEN-LOCKED in\ncover mode, so the shape moves over a stationary image (parallax window, NOT a\ntextured card).\n\nresizeCanvas(): d = Math.min(devicePixelRatio||1, 2); canvas.width = innerWidth*d;\ncanvas.height = innerHeight*d; CSS size = innerWidth/innerHeight px;\nctx.setTransform(d,0,0,d,0,0). Mirror the same for #scene-canvas unless a frozen\nframe is being held. Re-run on resize.\n\ndrawCover(media): mw/mh = videoWidth||naturalWidth etc; scale = Math.max(innerWidth/mw,\ninnerHeight/mh); draw centered at ((innerWidth-w)/2,(innerHeight-h)/2,w,h).\n\nPointer tilt (skipped while busy):\n  targetY = (clientX/innerWidth - .5) * 37.4\n  targetX = (clientY/innerHeight - .5) * -33\n  on pointerleave -> both 0\nPer frame (dt clamped to 40ms):\n  rotX += (targetX-rotX) * Math.min(1, dt*.009)   // same for rotY\n\nRounded-rect point sampling: for each of the 4 corners walk the arc in 10 steps,\nproducing ~44 points of a w×h rect with corner radius r (r clamped to w/2,h/2),\nin local coords centred on origin. Corner arc ranges:\n  [ w/2-r, -h/2+r, -PI/2, 0 ] [ w/2-r, h/2-r, 0, PI/2 ]\n  [-w/2+r,  h/2-r,  PI/2, PI ] [-w/2+r,-h/2+r, PI, PI*1.5 ]\n\nProjection (fake perspective, focal 850):\n  ax = rx*PI/180; ay = ry*PI/180\n  xx = x*cos(ay); yy = y*cos(ax); z = x*sin(ay) - y*sin(ax); p = 850/(850+z)\n  screen = [ cx + xx*p, cy + yy*p ]\n\nFrame loop:\n  clear; if a frozen scene exists, blit #scene-canvas full-screen then drawShade()\n  rect = #portal.getBoundingClientRect(); e = expansion (0..1)\n  cx = rectCx + (innerWidth/2  - rectCx)*e\n  cy = rectCy + (innerHeight/2 - rectCy)*e\n  baseW = rect.width  + (innerWidth  - rect.width )*e\n  baseH = rect.height + (innerHeight - rect.height)*e\n  scale = e ? 1 : maskScale;  w = baseW*scale; h = baseH*scale\n  r  = 90*(1-e)*scale;  rx = rotX*(1-e);  ry = rotY*(1-e)\n  if (w>1 && h>1): build the projected path, ctx.save(), globalAlpha = canvasOpacity,\n    clip(), fill '#030303' over the viewport, drawCover(transitionActive ? transitionVideo\n    : (state.image ? portalImage : portalVideo)), if transitionActive drawShade(), restore()\nSo at e=0 you see a tilting rounded window; as e->1 it grows to fill the screen and\nthe corner radius and tilt both relax to 0.\n\ndrawShade(ctx): linear gradient from y=innerHeight*.52 (rgba(0,0,0,0)) to\ny=innerHeight (rgba(0,0,0,.88)), filled over the bottom 48% of the viewport.\n\n====================================================================\n8. TRAVEL TRANSITION (click the portal)\n====================================================================\nEasing used everywhere in JS: t<.5 ? 4t³ : 1 - Math.pow(-2t+2,3)/2   (easeInOutCubic)\nanimateValue(setter, duration) drives a value 0->1 over rAF with that easing.\n\ntravel():\n  guard: return if busy or current === 'venus'; set busy, zero the tilt targets\n  next = current === 'mars' ? 'earth' : 'venus'\n  #transition-video.src = states[current].portal; load(); add .is-loading\n  await canplaythrough (or 'error', or a 1600ms timeout — whichever first)\n  remove .is-loading/.content-revealing/.mask-revealing; add .is-transitioning\n  currentTime=0; playbackRate = 1.3; canvasOpacity=1; transitionActive=true; await play()\n  await animateValue(v => expansion = v, 1100)      // window swallows the screen\n  await the video's 'ended'\n  freeze its final frame into #scene-canvas (clear, drawCover into that context)\n  current = next; add .is-committing; render(); await two rAFs\n  transitionActive=false; expansion=0; maskScale=0; canvasOpacity=1\n  remove .is-transitioning/.is-committing\n  maskReveal = revealMask(); after 100ms revealPlanetContent(); await maskReveal\n  after 450ms: drop the transition src, load(), busy=false\n  On any throw: reset transitionActive=false, expansion=0, maskScale=1, canvasOpacity=1,\n  strip the three state classes, busy=false.\n\nrevealMask(): retrigger .mask-revealing on .experience (remove -> offsetWidth -> add),\nmaskScale=0, then animateValue(v => maskScale = v, 1050).\nrevealPlanetContent(): retrigger .content-revealing the same way.\n\n====================================================================\n9. CUSTOM CURSOR\n====================================================================\nhtml,body,button,a,.portal{cursor:none!important}\n.custom-cursor{display:block;position:fixed;left:0;top:0;z-index:100;width:1px;height:1px;\n  pointer-events:none;opacity:0;transition:opacity .2s ease}\n.custom-cursor.is-visible{opacity:1}\n.cursor-dot,.cursor-orbit{position:absolute;left:0;top:0;border-radius:50%;transform:translate(-50%,-50%)}\n.cursor-dot{width:12px;height:12px;background:#fff}\n.cursor-orbit{width:36px;height:36px;border:1px solid #fff;background:rgba(255,255,255,.4);\n  transition:transform .3s cubic-bezier(.22,1,.36,1)}\n.custom-cursor.is-enter .cursor-orbit{transform:translate(-50%,-50%) scale(1.16)}\n.cursor-label{position:absolute;top:26px;left:0;transform:translateX(-50%) translateY(-4px);\n  font:16px/1.2 'SF Pro',Arial,sans-serif;white-space:nowrap;opacity:0;\n  transition:opacity .2s ease,transform .3s cubic-bezier(.22,1,.36,1)}\n.custom-cursor.is-enter .cursor-label{opacity:1;transform:translateX(-50%) translateY(0)}\nJS: track pointer, lerp orbit position by 0.2 per frame, apply via\ntranslate3d(x,y,0); add .is-visible on first move, remove on document mouseleave;\nadd/remove .is-enter on portal pointerenter/pointerleave.\n\n====================================================================\n10. ENTRANCE / SWITCH ANIMATIONS\n====================================================================\nbody:not(.intro-ready) .header,.planet-list,.planet-content h1,.planet-content .fact{opacity:0}\n.intro-ready .header       { animation:reveal-down .9s cubic-bezier(.22,1,.36,1) .1s both }\n.intro-ready .planet-list  { animation:reveal-side .9s cubic-bezier(.22,1,.36,1) .65s both }\n.content-revealing h1      { animation:title-rise 1.05s cubic-bezier(.16,1,.3,1) both }\n.content-revealing .fact   { animation:fact-rise .72s cubic-bezier(.22,1,.36,1) both }\n   .fact delays: 1)=.52s 2)=.68s 3)=.84s 4)=1s\n.mask-revealing .portal-heading { animation:portal-caption .85s cubic-bezier(.22,1,.36,1) both }\n.planet-list.is-switching .planet-item { animation:menu-row .58s cubic-bezier(.22,1,.36,1) both }\n   item delays: .02 .05 .08 .11 .14 .17 .2 .23s\n.planet-list.is-switching .planet-item.active:before { animation:active-dot .55s cubic-bezier(.22,1,.36,1) .18s both }\n\n@keyframes reveal-down   {from{opacity:0;filter:blur(8px);transform:translateY(-18px)}      to{opacity:1;filter:blur(0);transform:translateY(0)}}\n@keyframes reveal-side   {from{opacity:0;filter:blur(8px);transform:translate(-20px,-43%)}  to{opacity:1;filter:blur(0);transform:translate(0,-43%)}}\n@keyframes title-rise    {from{opacity:0;filter:blur(12px);transform:translate(-32px,42px)} to{opacity:1;filter:blur(0);transform:translate(-32px,0)}}\n@keyframes fact-rise     {from{opacity:0;filter:blur(7px);transform:translateY(18px)}       to{opacity:1;filter:blur(0);transform:translateY(0)}}\n@keyframes portal-caption{from{opacity:0;filter:blur(7px);transform:translateY(22px)}       to{opacity:1;filter:blur(0);transform:translateY(0)}}\n@keyframes menu-row      {from{opacity:.35;transform:translateX(-8px)}                      to{opacity:1;transform:translateX(0)}}\n@keyframes active-dot    {from{opacity:0;transform:scale(0)}                                to{opacity:1;transform:scale(1)}}\n\n====================================================================\n11. RESPONSIVE\n====================================================================\n@media(max-width:900px){\n  .nav{display:none}\n  .portal-wrap{width:min(300px,48vw)}\n  .planet-content h1{font-size:clamp(105px,24vw,190px)}\n  .planet-content dl{width:43vw}\n  .fact{grid-template-columns:110px 1fr}\n  .planet-list{font-size:14px} .planet-item.active{font-size:16px}\n}\n@media(max-width:640px){\n  .experience{min-height:600px}\n  .planet-list{display:none}\n  .portal-wrap{top:44%;width:min(260px,66vw)}\n  .planet-content{left:18px;right:18px;bottom:18px;display:block}\n  .planet-content h1{font-size:clamp(98px,30vw,160px);margin-bottom:20px}\n  .planet-content dl{width:100%;font-size:13px}\n  .fact{grid-template-columns:92px 1fr;padding:5px 0}\n  .portal-heading{font-size:14px} .portal-heading strong{font-size:16px}\n  .menu{height:38px} .portal{border-radius:70px}\n}\n@media(prefers-reduced-motion:reduce){*{transition-duration:.01ms!important}.portal{transform:none!important}}\nOn touch devices the tilt simply stays at 0 (no pointermove); tapping the portal\nmust still trigger the full travel sequence, and the canvas mask must still be\nsized from the portal's live bounding rect so it lines up at every breakpoint.\n\n====================================================================\n12. BOOT ORDER (last lines of the script)\n====================================================================\npause + rewind every .background video; resizeCanvas(); render();\nrequestAnimationFrame(draw); requestAnimationFrame(cursorLoop); runPreloader();\n\n====================================================================\n13. ACCEPTANCE CHECKLIST\n====================================================================\n[ ] Black screen -> Mars approach video plays for ~3s with a thin 0–100% counter\n    bottom-centre and the logo floating dead-centre.\n[ ] At 100% the counter blurs upward away, the logo glides to the top-left header\n    slot over 2s, header fades down, planet list slides in from the left.\n[ ] A rounded-rectangle window (radius 90px) grows open in the centre revealing the\n    Earth-approach footage; the window tilts toward the pointer (max ~±18.7°/16.5°)\n    with smooth easing while the footage behind it stays screen-locked.\n[ ] \"MARS\" renders huge in the condensed display face bottom-left; four fact rows\n    rise in with a stagger; \"Next: [03] Earth\" sits above the portal.\n[ ] Clicking the portal blurs out the chrome, plays the transition at 1.3× while the\n    window expands to fill the viewport, freezes the last frame, commits to Earth\n    (\"Next: [02] Venus\"), and re-opens the mask on the new state.\n[ ] Earth -> Venus works the same; at Venus the portal shows the Mercury still image\n    and further clicks are ignored.\n[ ] Custom cursor (12px dot + 36px translucent ring) follows with easing everywhere;\n    ring scales 1.16× and the word \"Enter\" fades in over the portal.\n[ ] No scrollbars at any size; layout holds at 375px, 768px and 1440px wide.\n[ ] Zero console errors; no external libraries.",
    "existe": true,
    "construidoExiste": false
  },
  {
    "id": "ethan-vale",
    "nombre": "Nature Portfolio",
    "tipo": "Landings",
    "categoria": "Photography",
    "formato": "prompt",
    "archivo": "prompts/ethan-vale.md",
    "construido": "templates/ethan-vale.html",
    "tags": [
      "esfera 3D",
      "fotografía",
      "lightbox",
      "grid"
    ],
    "colores": [
      "#000000",
      "#2b3a22",
      "#f4f2ef"
    ],
    "destacado": true,
    "nota": "Archivo de fotografía de fauna: 21 fotos en una esfera Fibonacci arrastrable, título centrado, video intro y lightbox FLIP.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "kernelcode",
    "nombre": "Kernel Code",
    "tipo": "Landings",
    "categoria": "3D",
    "formato": "prompt",
    "archivo": "prompts/kernelcode.md",
    "construido": "templates/kernelcode.html",
    "tags": [
      "Three.js",
      "vóxeles",
      "partículas",
      "scroll por secciones"
    ],
    "colores": [
      "#466e87",
      "#000000",
      "#ffffff"
    ],
    "destacado": true,
    "nota": "Wordmark <K> de vóxeles iridiscentes y 30.000 partículas que pasan de esfera a teclado a logo.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "lead-funnel",
    "nombre": "Lead Funnel",
    "tipo": "Heros",
    "categoria": "Hero",
    "formato": "codigo",
    "archivo": "templates/lead-funnel.html",
    "tags": [
      "carrusel 3D",
      "React",
      "formulario",
      "Tailwind"
    ],
    "colores": [
      "#000000",
      "#3a3a3a",
      "#ffffff"
    ],
    "destacado": false,
    "nota": "Carrusel 3D de tarjetas con inercia y formulario de presupuesto + email en dos pasos (Viktor Oddy).",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "oyla",
    "nombre": "OYLA",
    "tipo": "Landings",
    "categoria": "Ecommerce",
    "formato": "prompt",
    "archivo": "prompts/oyla.md",
    "construido": "templates/oyla.html",
    "tags": [
      "GSAP",
      "video scrub",
      "carrusel horizontal",
      "Vite + Express"
    ],
    "colores": [
      "#ffffff",
      "#d9d4cf",
      "#A3111E"
    ],
    "destacado": true,
    "nota": "Joyería artesanal: video controlado por scroll, carrusel horizontal de anillos con revelado de video, stats y footer fijo.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "cyberpunk-reveal",
    "nombre": "Cyberpunk Reveal",
    "tipo": "Heros",
    "categoria": "Hero",
    "formato": "prompt",
    "archivo": "prompts/cyberpunk-reveal.md",
    "construido": "templates/cyberpunk-reveal.html",
    "tags": [
      "React",
      "Tailwind",
      "máscara de cursor",
      "arcos SVG"
    ],
    "colores": [
      "#3a0508",
      "#e0262f",
      "#ffffff"
    ],
    "destacado": false,
    "nota": "Retrato rojo con linterna que revela una segunda imagen bajo el cursor, grilla con parallax y estadísticas en arcos.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "dental-health",
    "nombre": "Dental Health",
    "tipo": "Landings",
    "categoria": "Salud",
    "formato": "prompt",
    "archivo": "prompts/dental-health.md",
    "construido": "templates/dental-health.html",
    "tags": [
      "React",
      "Tailwind",
      "tarjetas enmascaradas",
      "splash"
    ],
    "colores": [
      "#ffffff",
      "#cfd8dc",
      "#000000"
    ],
    "destacado": false,
    "nota": "Clínica dental: mosaico de tarjetas que comparten una sola imagen de fondo, splash con contador y 3 secciones.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "velar",
    "nombre": "Velar.",
    "tipo": "Landings",
    "categoria": "Real Estate",
    "formato": "prompt",
    "archivo": "prompts/velar.md",
    "construido": "templates/velar.html",
    "tags": [
      "React",
      "Tailwind",
      "typewriter",
      "galería de video"
    ],
    "colores": [
      "#f5f0ea",
      "#213138",
      "#1a1a1a"
    ],
    "destacado": false,
    "nota": "Inmobiliaria de lujo: preloader que escribe Velar., casa que crece con el scroll, stats con contador y galería acordeón de videos.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "nova-ai",
    "nombre": "NOVA_AI",
    "tipo": "Landings",
    "categoria": "AI",
    "formato": "prompt",
    "archivo": "prompts/nova-ai.md",
    "construido": "templates/nova-ai.html",
    "tags": [
      "React",
      "Tailwind",
      "video scrub",
      "canvas"
    ],
    "colores": [
      "#0a0a0a",
      "#2a3550",
      "#ffffff"
    ],
    "destacado": false,
    "nota": "Video de fondo que avanza con el scroll (frames pre-extraídos a canvas), títulos escalonados y navegación en las esquinas.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "precision-farming",
    "nombre": "Precision Farming",
    "tipo": "Landings",
    "categoria": "Agro",
    "tags": [
      "video hero",
      "stats",
      "marquee",
      "servicios"
    ],
    "formato": "prompt",
    "archivo": "prompts/precision-farming.md",
    "construido": "templates/precision-farming.html",
    "colores": [
      "#10170f",
      "#5f7d3a",
      "#f2efe6"
    ],
    "destacado": false,
    "nota": "Prompt corto: secciones claras y oscuras, video de fondo en el hero, grilla de estadísticas, marquee de logos y tarjetas de servicios.",
    "texto": "Precision farming landing page with dark/light sections, hero video background, stats grid, logo marquee, and service cards.",
    "existe": true,
    "construidoExiste": false
  },
  {
    "id": "velora",
    "nombre": "VELORA",
    "tipo": "Landings",
    "categoria": "Real Estate",
    "formato": "prompt",
    "archivo": "prompts/velora.md",
    "construido": "templates/velora.html",
    "tags": [
      "React",
      "Tailwind",
      "video splash",
      "galería por scroll",
      "menú morph"
    ],
    "colores": [
      "#000000",
      "#3b3226",
      "#f59e0b"
    ],
    "destacado": false,
    "nota": "Inmobiliaria: splash con video, hero con video en loop, barra inferior que se transforma en botón de menú y galería que se abre desde una línea al hacer scroll.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "wealth-dashboard",
    "nombre": "Wealth Dashboard",
    "tipo": "Apps y dashboards",
    "categoria": "Finanzas",
    "formato": "prompt",
    "archivo": "prompts/wealth-dashboard.md",
    "construido": "templates/wealth-dashboard.html",
    "tags": [
      "HTML + CSS",
      "glassmorphism",
      "dashboard",
      "responsive"
    ],
    "colores": [
      "#050605",
      "#2c5351",
      "#8fce9d"
    ],
    "destacado": false,
    "nota": "Dashboard financiero con tarjetas de vidrio esmerilado sobre un retrato nocturno: gastos, ingresos, portafolio, anillo de crecimiento, puntaje y flujo de caja.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "forma-pricing",
    "nombre": "Forma AI Pricing",
    "tipo": "Secciones",
    "categoria": "Pricing",
    "formato": "prompt",
    "archivo": "prompts/forma-pricing.md",
    "construido": "templates/forma-pricing.html",
    "tags": [
      "React",
      "video boomerang",
      "glassmorphism",
      "toggle anual"
    ],
    "colores": [
      "#000000",
      "#0B2551",
      "#A4F4FD"
    ],
    "destacado": false,
    "nota": "Sección de precios con video de fondo en ida y vuelta, marca de agua gigante \"Pricing\" con degradado y ruido, 3 tarjetas de vidrio y selector mensual/anual.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "smilelab",
    "nombre": "SmileLab",
    "tipo": "Heros",
    "categoria": "Salud",
    "formato": "prompt",
    "archivo": "prompts/smilelab.md",
    "construido": "templates/smilelab.html",
    "tags": [
      "React",
      "Tailwind",
      "video hero",
      "menú móvil"
    ],
    "colores": [
      "#5F9AD1",
      "#3D8CD5",
      "#EBFA73"
    ],
    "destacado": false,
    "nota": "Hero de clínica dental sobre fondo azul con video, título \"Restore Your True Smile\" con avatares, estadística 98% y botón de contacto lima.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "stretch",
    "nombre": "STRETCH",
    "tipo": "Landings",
    "categoria": "Ecommerce",
    "formato": "prompt",
    "archivo": "prompts/stretch.md",
    "construido": "templates/stretch.html",
    "tags": [
      "React",
      "Tailwind",
      "slideshow de video",
      "carrusel de productos",
      "skincare"
    ],
    "colores": [
      "#F9F4F0",
      "#C8A45C",
      "#000000"
    ],
    "destacado": false,
    "nota": "Marca de skincare: hero dividido con imagen y slideshow de 3 videos, carrusel de 7 best sellers con pestañas y 3 categorías con video y texto vertical.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "step-into-wonder",
    "nombre": "Step Into Wonder",
    "tipo": "Landings",
    "categoria": "Creative",
    "formato": "prompt",
    "archivo": "prompts/step-into-wonder.md",
    "construido": "templates/step-into-wonder.html",
    "tags": [
      "React",
      "scrollytelling",
      "parallax",
      "cortinas",
      "slider en arco"
    ],
    "colores": [
      "#0a0608",
      "#6b2e0e",
      "#f3cdd6"
    ],
    "destacado": false,
    "nota": "Cortinas que se abren sobre un portal; al hacer scroll se vuela a través del portal y aparece una rueda de 9 tarjetas pastel en arco.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "aura-email",
    "nombre": "Aura",
    "tipo": "Landings",
    "categoria": "SaaS",
    "formato": "prompt",
    "archivo": "prompts/aura-email.md",
    "construido": "templates/aura-email.html",
    "tags": [
      "React",
      "framer motion",
      "liquid glass",
      "mockup de inbox",
      "pricing"
    ],
    "colores": [
      "#0c0c0c",
      "#0B2551",
      "#00d2ff"
    ],
    "destacado": false,
    "nota": "Cliente de email con IA: video de fondo, título con degradado brillante, barra estilo macOS, maqueta de inbox, triage, testimonios, precios y CTA final.",
    "existe": false,
    "construidoExiste": false
  },
  {
    "id": "bakery-facilities",
    "nombre": "Bakery Facilities",
    "tipo": "Landings",
    "categoria": "Food",
    "formato": "prompt",
    "archivo": "prompts/bakery-facilities.md",
    "construido": "templates/bakery-facilities.html",
    "tags": [
      "React",
      "GSAP",
      "SplitText",
      "Lottie",
      "video slider"
    ],
    "colores": [
      "#171717",
      "#CB9D06",
      "#ffffff"
    ],
    "destacado": false,
    "nota": "Panadería B2B: slider de 3 videos que se revelan con elipse al hacer scroll, galería de productos en masonry, texto que se revela palabra por palabra y marquee de partners.",
    "existe": false,
    "construidoExiste": false
  }
];
