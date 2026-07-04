# Portafolio de Víctor J.

Sitio web estático multipágina, sin frameworks, backend ni dependencias de compilación. Está preparado para abrirse localmente y publicarse directamente en GitHub Pages.

## Abrir localmente

Puedes abrir `index.html` directamente. Para probar rutas, carga de activos y comportamiento similar a GitHub Pages, se recomienda servir la carpeta:

```powershell
python -m http.server 8080
```

Visita `http://localhost:8080`.

## Estructura principal

- `index.html`: portada.
- `proyectos.html`: listado de casos de estudio.
- `sobre-mi.html`: perfil, formación y habilidades.
- `contacto.html`: canales de contacto y descarga del CV.
- `404.html`: página de error personalizada.
- `proyectos/`: cinco casos de estudio.
- `assets/`: marca, estilos, JavaScript, documentos e imágenes públicas.
- `docs/IMPLEMENTATION_SUMMARY.md`: resumen técnico y pruebas.

## Subir a GitHub

1. Crea un repositorio nuevo en GitHub.
2. Desde esta carpeta ejecuta:

```powershell
git init
git add .
git commit -m "Publicar portafolio de Victor J"
git branch -M main
git remote add origin URL-DE-TU-REPOSITORIO
git push -u origin main
```

La configuración de `.gitignore` evita subir el ZIP, el material fuente, el CV original y los archivos temporales. Confirma con `git status` que solo se incluyan los archivos publicables.

## Activar GitHub Pages

1. Abre el repositorio en GitHub.
2. Entra a **Settings > Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/ (root)`.
5. Guarda y espera a que GitHub publique la URL.

El archivo `.nojekyll` evita el procesamiento innecesario de Jekyll.

## Actualizar imágenes

1. Conserva los originales fuera de `assets/`.
2. Copia la nueva imagen a la carpeta correspondiente dentro de `assets/projects/`.
3. Usa nombres en minúsculas, descriptivos y con guiones.
4. Actualiza la ruta, el texto alternativo, el ancho y el alto en el HTML.
5. Registra el cambio en `ASSETS_MAP.md`.
6. Comprueba que la captura use información ficticia o sanitizada.

## Actualizar el CV

Reemplaza `assets/documents/CV-Victor-Jimenez.pdf` manteniendo exactamente el mismo nombre. Antes de publicarlo, confirma que sea una versión pública sin teléfono visible, fotografía ni información sensible.

## Agregar `victordejesus.dev` en el futuro

No existe un archivo `CNAME` en esta versión porque el dominio todavía no está configurado.

Cuando el dominio esté comprado y sus DNS apunten a GitHub Pages:

1. Crea un archivo de texto llamado `CNAME` en la raíz del repositorio.
2. Escribe una sola línea: `victordejesus.dev`.
3. En GitHub entra a **Settings > Pages > Custom domain**.
4. Escribe `victordejesus.dev`, guarda y espera la verificación DNS.
5. Activa **Enforce HTTPS** cuando GitHub lo permita.

No agregues `CNAME` antes de que el dominio y los registros DNS estén listos.

## Probar en celular

Consulta `MOBILE_TESTING.md` para abrir el sitio desde un celular conectado a la misma red Wi-Fi y revisar los anchos objetivo.

## Publicación

Sube los HTML, `assets/`, `proyectos/`, `docs/`, `.nojekyll`, `.gitignore`, `robots.txt`, `README.md`, `ASSETS_MAP.md` y `MOBILE_TESTING.md`. No se necesita servidor, base de datos ni proceso de build.
