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

Antes de subir archivos revisa con `git status` que no haya datos privados ni artefactos temporales.

## Activar GitHub Pages

1. Abre el repositorio en GitHub.
2. Entra a **Settings > Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/ (root)`.
5. Guarda y espera a que GitHub publique la URL.

Para este sitio HTML estático no se requiere compilación.

## Actualizar imágenes

1. Conserva los originales fuera de `assets/`.
2. Copia la nueva imagen a la carpeta correspondiente dentro de `assets/projects/`.
3. Usa nombres en minúsculas, descriptivos y con guiones.
4. Actualiza la ruta, el texto alternativo, el ancho y el alto en el HTML.
5. Documenta el origen y la licencia de los recursos gráficos cuando corresponda.
6. Comprueba que la captura use información ficticia o sanitizada.

## Actualizar el CV

Reemplaza `assets/documents/CV-Victor-Jimenez.pdf` manteniendo exactamente el mismo nombre. Antes de publicarlo, confirma que sea una versión pública sin teléfono visible, fotografía ni información sensible.

## Dominio personalizado `victordejesus.dev`

El dominio `victordejesus.dev` ya está configurado en el archivo raíz `CNAME`.

Cuando el dominio esté comprado y sus DNS apunten a GitHub Pages:

1. Crea un archivo de texto llamado `CNAME` en la raíz del repositorio.
2. Escribe una sola línea: `victordejesus.dev`.
3. En GitHub entra a **Settings > Pages > Custom domain**.
4. Escribe `victordejesus.dev`, guarda y espera la verificación DNS.
5. Activa **Enforce HTTPS** cuando GitHub lo permita.

Mantén el archivo `CNAME` con el valor `victordejesus.dev` y verifica DNS y HTTPS desde GitHub Pages.

## Probar en celular

Abre el sitio desde el teléfono y comprueba navegación, imágenes, enlaces y distribución responsive.

## Publicación

Publica los HTML, `assets/`, `proyectos/`, `docs/`, `CNAME` y `README.md`. No se necesita servidor, base de datos ni proceso de build.
