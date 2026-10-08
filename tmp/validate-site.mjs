import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(full) : [full];
});

const htmlFiles = walk(root).filter((file) => file.endsWith(".html") && !file.includes(`${path.sep}tmp${path.sep}`));
const publicTextFiles = [
  ...htmlFiles,
  path.join(root, "assets/css/styles.css"),
  path.join(root, "assets/js/site.js"),
  path.join(root, "README.md"),
  path.join(root, "docs/IMPLEMENTATION_SUMMARY.md"),
];
const errors = [];
const warnings = [];
const forbidden = [
  "backward path studio",
  "psycho gym",
];
const containsTerm = (source, term) => {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(source);
};

for (const file of htmlFiles) {
  const source = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  const textOnly = source
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();

  for (const term of forbidden) {
    if (containsTerm(textOnly, term)) errors.push(`${relative}: texto visible prohibido: ${term}`);
  }
  if (textOnly.includes("9231001923")) errors.push(`${relative}: teléfono visible`);
  if (!/<html\s+lang="es"/i.test(source)) errors.push(`${relative}: falta lang=es`);
  if (!/<title>[^<]+<\/title>/i.test(source)) errors.push(`${relative}: falta title`);
  if (!/<meta\s+name="description"/i.test(source)) errors.push(`${relative}: falta meta description`);
  if (!/property="og:title"/i.test(source) || !/property="og:description"/i.test(source) || !/property="og:image"/i.test(source)) errors.push(`${relative}: Open Graph incompleto`);
  if (!/class="skip-link"/i.test(source)) errors.push(`${relative}: falta skip link`);

  for (const match of source.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\balt="[^"]*"/i.test(tag)) errors.push(`${relative}: imagen sin alt`);
    if (!/\bwidth="\d+"/i.test(tag) || !/\bheight="\d+"/i.test(tag)) errors.push(`${relative}: imagen sin dimensiones: ${tag.slice(0, 100)}`);
  }

  for (const match of source.matchAll(/\b(?:href|src)="([^"]+)"/gi)) {
    const value = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|#)/i.test(value)) continue;
    const clean = decodeURIComponent(value.split(/[?#]/)[0]);
    if (!clean) continue;
    const target = path.resolve(path.dirname(file), clean);
    if (!fs.existsSync(target)) errors.push(`${relative}: ruta inexistente: ${value}`);
  }
}

for (const file of publicTextFiles) {
  const source = fs.readFileSync(file, "utf8").toLowerCase();
  for (const term of forbidden) {
    if (containsTerm(source, term)) errors.push(`${path.relative(root, file)}: referencia prohibida: ${term}`);
  }
}

const projectImages = walk(path.join(root, "assets/projects")).filter((file) => /\.(?:png|jpe?g|webp|svg)$/i.test(file));
const brandImages = walk(path.join(root, "assets/brand")).filter((file) => /\.(?:png|jpe?g|webp|svg)$/i.test(file));
const cname = path.join(root, "CNAME");
if (!fs.existsSync(cname) || fs.readFileSync(cname,"utf8").trim() !== "victordejesus.dev") errors.push("CNAME ausente o distinto del dominio configurado");
if (htmlFiles.length !== 10) errors.push(`Se esperaban 10 páginas HTML y se encontraron ${htmlFiles.length}`);

console.log(`Páginas HTML: ${htmlFiles.length}`);
console.log(`Imágenes públicas: ${projectImages.length + brandImages.length}`);
console.log(`Rutas y referencias revisadas: ${htmlFiles.length} páginas`);
if (warnings.length) console.log(`Advertencias:\n- ${warnings.join("\n- ")}`);
if (errors.length) {
  console.error(`Errores (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("Validación estática completada sin errores.");
