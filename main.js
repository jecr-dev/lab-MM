/* ===== CONFIGURACIÓN: edita solo este bloque ===== */
const CONFIG = {
  whatsapp: "",            // Número internacional sin + ni espacios. Ej: "56912345678"
  telefono: "",            // Ej: "+56 9 1234 5678"
  correo: "",              // Ej: "contacto@ejemplo.cl"
  horario: "Lunes a viernes: 9:00 a 19:00\nSábado: 10:30 a 14:30\nDomingo: cerrado",
  direccion: "Maestranza 355, Ovalle, Coquimbo",   // Para el mapa y "Cómo llegar"
  mapsUrl: "https://maps.app.goo.gl/HJHTBjZ5Jo7Q6NF96",
  arancelFecha: "",        // Ej: "Octubre 2026"
  arancelPdf: "arancel-laboratorio-mm.pdf",
  contratoPdf: "convenio-afiliado-laboratorio-mm.pdf"
};
/* ================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const waLink = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

// WhatsApp: enlaces reales solo si hay número configurado
$$(".js-wa").forEach(a => {
  if (CONFIG.whatsapp) { a.href = waLink(a.dataset.msg); a.target = "_blank"; a.rel = "noopener"; }
  else a.title = "WhatsApp aún no configurado";
});

// Datos de contacto
const set = (id, v) => { if (v) $(id).textContent = v; };
set("#c-tel", CONFIG.telefono); set("#c-hor", CONFIG.horario);
set("#c-dir", CONFIG.direccion); set("#u-dir", CONFIG.direccion);
if (CONFIG.whatsapp) $("#c-wa").textContent = "+" + CONFIG.whatsapp;
if (CONFIG.correo) $("#c-mail").innerHTML = `<a href="mailto:${CONFIG.correo}">${CONFIG.correo}</a>`;
if (CONFIG.telefono) $("#c-tel").innerHTML = `<a href="tel:${CONFIG.telefono.replace(/[^\d+]/g, "")}">${CONFIG.telefono}</a>`;

// Mapa (solo con dirección real)
if (CONFIG.direccion) {
  const q = encodeURIComponent(CONFIG.direccion);
  $("#map-box").innerHTML = `<iframe title="Mapa de ubicación de Laboratorio Dental MM" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${q}&output=embed"></iframe>`;
  const go = `https://www.google.com/maps/dir/?api=1&destination=${q}`, open = CONFIG.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${q}`;
  $("#map-go").href = go; $("#map-open").href = open; $("#foot-map").href = open;
} else { ["#map-go", "#map-open"].forEach(s => $(s).setAttribute("aria-disabled", "true")); }

// Arancel: muestra botones solo si el PDF existe
if (CONFIG.arancelFecha) $("#arancel-fecha").textContent = CONFIG.arancelFecha;
const pdfBlock = (p, path) => fetch(path, { method: "HEAD" }).then(r => {
  if (!r.ok) throw 0;
  $(`#${p}-ver`).href = $(`#${p}-dl`).href = path;
  $(`#${p}-obj`).data = path;
  $(`#${p}-ok`).hidden = false; $(`#${p}-pending`).hidden = true;
}).catch(() => {});
pdfBlock("arancel", CONFIG.arancelPdf);

// Menú móvil
const burger = $(".burger"), menu = $("#menu");
burger.addEventListener("click", () => {
  const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o);
});
$$("#menu a").forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); }));

// Formulario de afiliación (WhatsApp o correo; no almacena datos)
const form = $("#afil-form"), msgEl = $("#form-msg");
$$("[data-send]", form).forEach(b => b.addEventListener("click", () => {
  if (!form.reportValidity()) return;
  const d = Object.fromEntries(new FormData(form));
  const txt = `Hola, quisiera solicitar afiliación a Laboratorio Dental MM.\nNombre: ${d.nombre}\nClínica o consulta: ${d.clinica}\nCorreo: ${d.correo}\nTeléfono: ${d.telefono}`;
  if (b.dataset.send === "wa") {
    if (!CONFIG.whatsapp) return void (msgEl.textContent = "WhatsApp aún no está configurado en el sitio.");
    window.open(waLink(txt), "_blank", "noopener");
  } else {
    if (!CONFIG.correo) return void (msgEl.textContent = "El correo aún no está configurado en el sitio.");
    location.href = `mailto:${CONFIG.correo}?subject=${encodeURIComponent("Solicitud de afiliación")}&body=${encodeURIComponent(txt)}`;
  }
  msgEl.textContent = "Se abrió tu aplicación con el mensaje listo. Debes enviarlo desde allí.";
}));

// Vista ampliada de diagramas
const lb = $("#lightbox"), lbImg = $("#lb-img");
$$(".zoom").forEach(z => z.addEventListener("click", () => {
  lbImg.src = z.dataset.src; lbImg.alt = z.dataset.alt; lb.showModal(); $(".close", lb).focus();
}));
$(".close", lb).addEventListener("click", () => lb.close());
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });

$("#year").textContent = new Date().getFullYear();
