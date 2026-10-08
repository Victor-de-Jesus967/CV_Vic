# Resumen de implementación

## Archivos creados

- 10 páginas HTML: portada, listado, perfil, contacto, 404 y cinco casos de estudio.
- Hoja de estilos compartida en `assets/css/styles.css`.
- JavaScript compartido en `assets/js/site.js`.
- Documentación en `README.md`, `ASSETS_MAP.md` y `MOBILE_TESTING.md`.
- Archivos de publicación: `.nojekyll`, `.gitignore` y `robots.txt`.
- CV público sanitizado en `assets/documents/CV-Victor-Jimenez.pdf`.

## Páginas construidas

1. `index.html`
2. `proyectos.html`
3. `sobre-mi.html`
4. `contacto.html`
5. `404.html`
6. `proyectos/nova-control.html`
7. `proyectos/gestor-activos-ti.html`
8. `proyectos/inventory.html`
9. `proyectos/aforos-pro.html`
10. `proyectos/testing-hits.html`

## Proyectos incluidos

- Nova Control
- Gestor de Activos TI
- Inventory
- Aforos Pro
- Taller Testing HITS

## Imágenes utilizadas

Se incorporaron 14 imágenes públicas: una de marca y trece de proyectos. El detalle de origen, destino y uso está en `ASSETS_MAP.md`.

## Rutas de ejecución

```powershell
python -m http.server 8080
```

- Computadora: `http://localhost:8080`
- Celular en la misma red: `http://IP-DE-LA-COMPUTADORA:8080`

## Pruebas realizadas

- Validación automática de 10 páginas HTML y todas sus rutas locales.
- Confirmación de 14 imágenes públicas existentes y correctamente referenciadas.
- Búsqueda de referencias restringidas en HTML, CSS, JavaScript, Markdown y CV público.
- Revisión del CV público de 2 páginas mediante extracción de texto y renderizado visual.
- Comprobación de ausencia de `CNAME`.
- Verificación de sintaxis de `assets/js/site.js`.
- Prueba HTTP local con respuesta correcta mediante servidor estático en el puerto 8080.
- Revisión responsive en 360, 390, 412, 768, 1024 y 1440 px, sin desplazamiento horizontal.
- Revisión visual de la portada a 390 y 1440 px.
- Revisión visual del caso Gestor de Activos TI con las nuevas capturas a 390 y 1440 px.
- Comprobación de controles visibles con altura mínima de 44 px.
- Prueba del menú móvil: apertura, cierre y tecla Escape.
- Prueba de galería: apertura, navegación con flechas, cierre con Escape y restauración del foco.
- Prueba de galerías actualizadas: 3 capturas en Gestor de Activos TI, 2 en Inventory y 2 en Aforos Pro.
- Comprobación del anuncio accesible del botón para copiar el correo; el navegador de prueba denegó el portapapeles y se mostró el mensaje alternativo previsto.
- Verificación directa del enlace público `https://github.com/Victor-de-Jesus967/ProyectTI`.

## Pendientes para publicar

- Crear o elegir el repositorio de GitHub.
- Subir los archivos publicables.
- Activar GitHub Pages desde la rama elegida y la carpeta raíz.
- Configurar el dominio personalizado únicamente cuando se haya comprado y sus DNS estén listos.

## GitHub Pages

El sitio no requiere compilación. En **Settings > Pages**, selecciona **Deploy from a branch**, la rama `main` y la carpeta `/ (root)`. El archivo `.nojekyll` ya está incluido. Las instrucciones completas y la futura configuración de `CNAME` están en `README.md`.


## Actualización 7 de octubre de 2026

- Aforo destacado primero en la portada y listado, con enlace a Google Play facilitado por el desarrollador.
- Caso de estudio ampliado con SQLite, JSON/CSV, generación PDF, suscripción mensual y limitaciones del cálculo de gas.
- URLs canónicas agregadas a portada, proyectos y ficha de Aforo.
- Validador actualizado para reconocer el archivo CNAME del dominio configurado y retirar referencias a archivos de documentación ausentes.
- Pendiente: publicar el PDF nuevo en `assets/documents/CV-Victor-Jimenez.pdf` y confirmar el contenido final del perfil `sobre-mi.html`.
- Esta sección describe cambios de código; no representa una nueva ejecución de pruebas visuales ni de despliegue.
