# Com afegir una setmana

1. A GitHub, dins `setmanes/`, crea una carpeta amb la data de la setmana (qualsevol dia): `2026-11-09`.
2. Puja-hi les fotos. El nom és el peu: `1 Boo!.jpg` → «Boo!». El número del davant només ordena (la foto `1` és la portada).
3. Crea `setmana.txt` dins la carpeta. Format:

```
Títol de la setmana
Etiquetes: menjar, partit, excursió
Júlia: la meva frase de la setmana
Erica: la meva frase de la setmana
Aquí va el text de la setmana (pot ser de diverses línies).
```
Només el títol (1a línia) és obligatori. Les línies `Etiquetes:`, `Júlia:` i `Erica:` són opcionals i poden anar en qualsevol ordre. Tot el que no sigui un d'aquests camps és el text.

4. En uns segons l'Action actualitza `setmanes.json` i la web ja ho mostra.

# Llista «Voldríem fer…»
Edita `setmanes/pendents.txt` (llapis a GitHub):
```
- [ ] Anar al Tibidabo
- [x] Veure un partit del Barça | 2026-10-19
```
`[ ]` és pendent, `[x]` és fet, i la data opcional enllaça amb la setmana en què es va fer.

# Tema d'estació
Es tria sol segons la data (tardor, hivern, primavera, estiu). Per provar-ne un: `index.html?tema=hivern`.

# Estructura
```
index.html
generar.js
setmanes.json            (es genera sol)
.github/workflows/setmanes.yml
setmanes/
  pendents.txt
  2026-10-26/
    setmana.txt
    1 Boo!.jpg
```


## Miniatures

`generar.js` crea sol miniatures a `setmanes/<setmana>/min/` (cal `sharp`; l'acció de GitHub ja l'instal·la). Si canvies una foto, esborra'n la carpeta `min`.

## Jocs de taula i restaurants

Cada joc i cada restaurant té la seva carpeta, a l'arrel del projecte, al costat de `setmanes/` (si ja les tens dins de `setmanes/jocs/` i `setmanes/restaurants/`, també funcionen):

```
jocs/catan/fitxa.txt                + les fotos (la 1a és la portada)
restaurants/can-joan/fitxa.txt      + les fotos
```

Format de `fitxa.txt` (només el nom, a la 1a línia, és obligatori):

```
Catan
Estat: tenim
Jugadors: 3-4
Durada: 60 min
Júlia: 8
Erica: 7
Aquí va el comentari (pot ser de diverses línies).
```

- **Jocs:** `Estat: tenim` o `Estat: volem`. Camps: Jugadors, Durada, Júlia, Erica.
- **Restaurants:** `Estat: hi hem anat` o `Estat: volem anar`. Camps: Cuina, Zona, Preu, Data, Mapa (enllaç), Setmana (`2026-10-26`, crea un enllaç a aquella setmana), Júlia, Erica.
- Si no poses `Estat`, es considera «el volem» / «hi volem anar».
- Es mostren per ordre alfabètic del nom de la carpeta. Les miniatures es creen soles, com a les setmanes.

## Fotos del calendari

La foto que es mostra de cada setmana al calendari és la que més has obert a l'ampliació. El recompte es guarda només al navegador de cada dispositiu.
