// Genera setmanes.json a partir de la carpeta setmanes/
//
// Cada setmana és una carpeta amb la data (qualsevol dia de la setmana):
//   setmanes/2026-11-02/
//     setmana.txt   -> 1a línia = títol. Després, opcionalment:
//                        Etiquetes: menjar, partit, excursió
//                        Júlia: la meva frase de la setmana
//                        Erica: la meva frase de la setmana
//                      Tota la resta de línies és el text de la setmana.
//     fotos         -> jpg, png, webp, gif. El nom és el peu de foto:
//                      "1 Boo!.jpg" -> "Boo!" (els números del davant només ordenen)
//
// Llista de coses pendents: setmanes/pendents.txt
//   - [ ] Anar al Tibidabo
//   - [x] Veure un partit del Barça | 2026-10-19      (data opcional = setmana en què es va fer)
const fs = require("fs");
const path = require("path");

const ARREL = "setmanes";
const EXT = /\.(jpe?g|png|webp|gif)$/i;
const net = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const CLAUS = { etiquetes: "etiquetes", etiqueta: "etiquetes", tags: "etiquetes", julia: "julia", erica: "erica" };

function llegeixSetmana(fitxer, nom) {
  const linies = fs.readFileSync(fitxer, "utf8").replace(/^﻿/, "").split(/\r?\n/);
  const titol = (linies.shift() || "").trim() || nom;
  const text = [];
  const meta = { etiquetes: [], julia: "", erica: "" };
  for (const l of linies) {
    const m = l.match(/^\s*([^:]{1,20}):\s*(.*)$/);
    const clau = m && CLAUS[net(m[1])];
    if (clau === "etiquetes") {
      for (const t of m[2].split(/[,;]|\s+(?=#)/)) {
        const v = t.trim().replace(/^#/, "").toLowerCase();
        if (v && !meta.etiquetes.includes(v)) meta.etiquetes.push(v);
      }
    } else if (clau) {
      meta[clau] = m[2].trim();
    } else {
      text.push(l);
    }
  }
  return { titol, text: text.join("\n").trim(), ...meta };
}

function llegeixPendents() {
  const f = path.join(ARREL, "pendents.txt");
  if (!fs.existsSync(f)) return [];
  const res = [];
  for (const brut of fs.readFileSync(f, "utf8").replace(/^﻿/, "").split(/\r?\n/)) {
    const m = brut.trim().match(/^[-*]\s*\[( |x|X)?\]\s*(.+)$/);
    if (!m) continue;
    let text = m[2].trim(), setmana = "";
    const k = text.lastIndexOf("|");
    if (k >= 0) {
      const d = text.slice(k + 1).trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(d)) { setmana = d; text = text.slice(0, k).trim(); }
    }
    res.push({ text, fet: /x/i.test(m[1] || ""), setmana });
  }
  return res;
}

const setmanes = [];
if (fs.existsSync(ARREL)) {
  const carpetes = fs.readdirSync(ARREL, { withFileTypes: true })
    .filter(d => d.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(d.name))
    .map(d => d.name)
    .sort().reverse();

  for (const nom of carpetes) {
    const dir = path.join(ARREL, nom);
    const txt = path.join(dir, "setmana.txt");
    let info = { titol: nom, text: "", etiquetes: [], julia: "", erica: "" };
    if (fs.existsSync(txt)) info = llegeixSetmana(txt, nom);
    else console.warn(`Avís: ${dir} no té setmana.txt`);

    const fotos = fs.readdirSync(dir)
      .filter(f => EXT.test(f))
      .sort((a, b) => a.localeCompare(b, "ca", { numeric: true }))
      .map(f => ({
        src: [ARREL, nom, f].map(encodeURIComponent).join("/"),
        peu: f.replace(EXT, "").replace(/^\d+[\s._-]*/, "").trim()
      }));
    setmanes.push({ inici: nom, ...info, fotos });
  }
}

// Jocs de taula i restaurants: una carpeta per cosa, igual que les setmanes:
//   setmanes/jocs/catan/fitxa.txt + fotos        setmanes/restaurants/can-joan/fitxa.txt + fotos
//   fitxa.txt -> 1a línia = nom. Després, opcionalment (una per línia):
//     Estat: tenim   (jocs: tenim / volem)   |   Estat: hi hem anat   (restaurants: hi hem anat / volem anar)
//     Jugadors, Durada, Cuina, Zona, Preu, Data, Mapa (enllaç), Setmana (2026-10-26), Júlia, Erica
//   Tota la resta de línies és el comentari. La 1a foto és la portada.
const CLAUS2 = { estat: "estat", jugadors: "jugadors", durada: "durada", cuina: "cuina", zona: "zona", preu: "preu", data: "data", mapa: "mapa", maps: "mapa", enllac: "mapa", setmana: "setmana", julia: "julia", erica: "erica" };
function llegeixFitxa(fitxer, carpeta) {
  const linies = fs.readFileSync(fitxer, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/);
  const nom = (linies.shift() || "").trim() || carpeta, text = [], o = {};
  for (const l of linies) {
    const m = l.match(/^\s*([^:]{1,20}):\s*(.*)$/), clau = m && CLAUS2[net(m[1])];
    if (clau) o[clau] = m[2].trim(); else text.push(l);
  }
  return { nom, text: text.join("\n").trim(), ...o };
}
function llegeixFitxes(tipus) {
  const arrel = path.join(ARREL, tipus);
  if (!fs.existsSync(arrel)) return [];
  const ordre = (a, b) => a.localeCompare(b, "ca", { numeric: true });
  return fs.readdirSync(arrel, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort(ordre).map(carpeta => {
    const dir = path.join(arrel, carpeta), txt = path.join(dir, "fitxa.txt");
    const info = fs.existsSync(txt) ? llegeixFitxa(txt, carpeta) : { nom: carpeta, text: "" };
    const fet = /^(tenim|fet|fets|si|x|ja|hi hem anat|anat)/.test(net(info.estat || ""));
    delete info.estat;
    const fotos = fs.readdirSync(dir).filter(f => EXT.test(f)).sort(ordre).map(f => ({
      src: [ARREL, tipus, carpeta, f].map(encodeURIComponent).join("/"),
      peu: f.replace(EXT, "").replace(/^\d+[\s._-]*/, "").trim()
    }));
    return { carpeta, ...info, fet, fotos };
  });
}
const pendents = llegeixPendents();
const jocs = llegeixFitxes("jocs"), restaurants = llegeixFitxes("restaurants");

// Miniatures (opcional): amb 'sharp' crea min/<foto>-t.webp (640 px, targetes) i -m.webp (1600 px, visor)
// dins de cada carpeta. Els originals no es toquen. Si canvies una foto, esborra la carpeta min.
let sharp = null;
try { sharp = require("sharp"); } catch (e) { console.warn("Avís: no hi ha 'sharp', no es fan miniatures (npm install sharp)."); }
async function miniatures() {
  if (!sharp) return;
  const llocs = [...setmanes.map(s => [[s.inici], s.fotos]), ...jocs.map(x => [["jocs", x.carpeta], x.fotos]), ...restaurants.map(x => [["restaurants", x.carpeta], x.fotos])];
  for (const [segs, fotos] of llocs) for (const f of fotos) {
    const nomFoto = decodeURIComponent(f.src.split("/").pop());
    const base = nomFoto.replace(/\.[^.]+$/, ""), dir = [ARREL, ...segs];
    for (const [suf, ample, q, clau] of [["t", 640, 72, "th"], ["m", 1600, 80, "md"]]) {
      const fitxer = `${base}-${suf}.webp`, sortida = path.join(...dir, "min", fitxer);
      if (!fs.existsSync(sortida)) {
        fs.mkdirSync(path.dirname(sortida), { recursive: true });
        await sharp(path.join(...dir, nomFoto)).rotate().resize({ width: ample, withoutEnlargement: true }).webp({ quality: q }).toFile(sortida);
      }
      f[clau] = [...dir, "min", fitxer].map(encodeURIComponent).join("/");
    }
  }
}
miniatures().then(() => {
  fs.writeFileSync("setmanes.json", JSON.stringify({ setmanes, pendents, jocs, restaurants }, null, 2) + "\n");
  console.log(`setmanes.json: ${setmanes.length} setmanes, ${pendents.length} pendents, ${jocs.length} jocs, ${restaurants.length} restaurants`);
});
