# Laboratorio Dental MM – Sitio web (GitHub Pages)

Sitio estático (HTML, CSS y JavaScript). No necesita servidor.

## Estructura
```
index.html · css/styles.css · js/main.js · robots.txt · sitemap.xml
assets/images/logo.png · social-preview.png · flujos/ (diagramas) · laboratorio/ (fotos)
assets/docs/ (aquí va el PDF) · assets/icons/ (favicon)
```

## Qué colocar y dónde
- **Logo:** `assets/images/logo.png` (ya incluido).
- **Arancel:** copia tu PDF como `assets/docs/arancel-laboratorio-mm.pdf`. Si no existe, el sitio muestra un aviso de pendiente.
- **Flujos:** `assets/images/flujos/` ya contiene el flujo general de trabajo y el flujo de envíos. Si cambias los gráficos, conserva los nombres o actualiza `index.html`.
- **Fotos:** agrega fotografías reales en `assets/images/laboratorio/` y reemplaza el logo del Hero en `index.html`.

## Datos a reemplazar antes de publicar
1. `js/main.js` → bloque `CONFIG`: WhatsApp (formato `56912345678`), teléfono, correo, horario, dirección y fecha del arancel.
2. `index.html` → las URLs `https://USUARIO.github.io/REPOSITORIO/` (canonical y Open Graph), y los textos marcados `[Por completar]`, `[por confirmar]` y las etiquetas “Por revisar”.
3. `robots.txt` y `sitemap.xml` → la misma URL.
4. Confirma los beneficios de afiliación antes de publicar: no deben prometer nada que no esté acordado.

## Publicar en GitHub Pages
1. Crea un repositorio en github.com (ej. `laboratorio-dental-mm`).
2. Sube el contenido de la carpeta: `git init`, `git add .`, `git commit -m "Sitio web"`, `git branch -M main`, `git remote add origin URL_DEL_REPO`, `git push -u origin main` (o usa “Add file → Upload files”).
3. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / carpeta `/ (root)` → Save**.
4. En 1–2 minutos el sitio queda en `https://USUARIO.github.io/REPOSITORIO/`.

## Lista de comprobación
- [ ] Menú hamburguesa abre y cierra en el teléfono; los enlaces llevan a cada sección.
- [ ] Botones de WhatsApp abren la conversación con el mensaje listo.
- [ ] Formulario: ambos botones abren WhatsApp o el correo con los datos.
- [ ] Tocar un diagrama lo amplía; se cierra con “Cerrar”, Esc o tocando fuera.
- [ ] PDF del arancel: ver, descargar y vista previa.
- [ ] Mapa y “Cómo llegar” con la dirección real.
- [ ] Nada se desborda horizontalmente en el teléfono; se puede navegar con la tecla Tab.
- [ ] Prueba la vista previa social pegando la URL en WhatsApp.

---
## Versión plana (sin carpetas)
Todos los archivos van juntos en la raíz del repositorio (útil si subes desde el teléfono). El PDF del arancel se llama `arancel-laboratorio-mm.pdf` y también va en la raíz.
