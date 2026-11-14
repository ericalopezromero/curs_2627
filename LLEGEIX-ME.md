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

Dos fitxers: `setmanes/jocs.txt` i `setmanes/restaurants.txt`. Una línia per cosa:

```
- [x] Catan | jugadors: 3-4 | durada: 60 min | Júlia: 8 | Erica: 7 | foto: catan.jpg | Ens encanta
- [ ] Wingspan | jugadors: 1-5
- [x] Nom del lloc | cuina: italiana | zona: Gràcia | preu: 25 € | data: octubre | mapa: https://maps.app.goo.gl/… | setmana: 2026-10-26 | Júlia: 9 | Erica: 8 | foto: lloc.jpg | Comentari lliure
```

`[x]` = ja el tenim / hi hem anat; `[ ]` = el volem / hi volem anar. Només el nom és obligatori; l'ordre de la resta no importa. Les fotos van dins `setmanes/jocs/` o `setmanes/restaurants/` (millor si ja són petites, aquestes no es redueixen soles). Les línies que comencen per `#` s'ignoren.

## Llista de pendents i fotos més vistes

Els canvis que fas a la llista «Tenim pendent» a la web (marcar, afegir, treure) i el recompte de fotos més vistes del calendari es guarden només al navegador de cada dispositiu. Perquè una cosa sigui per a tothom, escriu-la a `setmanes/pendents.txt`.
