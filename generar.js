// Genera setmanes.json a partir de les carpetes de setmanes/
// Cada carpeta: setmanes/ANY-MES-DIA/  (qualsevol dia de la setmana)
//   setmana.txt -> 1a línia = títol, la resta = text
//   fotos (jpg, png, webp, gif) -> en ordre alfabètic; el nom és el peu:
//   "1 Boo!.jpg" -> peu "Boo!"
const fs = require("fs");
const path = require("path");

const ARREL = "setmanes";
const EXT = /\.(jpe?g|png|webp|gif)$/i;
const out = [];

if (fs.existsSync(ARREL)) {
  const carpetes = fs.readdirSync(ARREL, { withFileTypes: true })
    .filter(d => d.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(d.name))
    .map(d => d.name)
    .sort().reverse();

  for (const nom of carpetes) {
    const dir = path.join(ARREL, nom);
    let titol = nom, text = "";
    const txt = path.join(dir, "setmana.txt");
    if (fs.existsSync(txt)) {
      const linies = fs.readFileSync(txt, "utf8").replace(/^﻿/, "").split(/\r?\n/);
      titol = (linies.shift() || nom).trim() || nom;
      text = linies.join("\n").trim();
    } else {
      console.warn(`Avís: ${dir} no té setmana.txt`);
    }
    const fotos = fs.readdirSync(dir)
      .filter(f => EXT.test(f))
      .sort((a, b) => a.localeCompare(b, "ca", { numeric: true }))
      .map(f => ({
        src: [ARREL, nom, f].map(encodeURIComponent).join("/"),
        peu: f.replace(EXT, "").replace(/^\d+[\s._-]*/, "").trim()
      }));
    out.push({ inici: nom, titol, text, fotos });
  }
}
fs.writeFileSync("setmanes.json", JSON.stringify(out, null, 2) + "\n");
console.log(`setmanes.json: ${out.length} setmanes`);
