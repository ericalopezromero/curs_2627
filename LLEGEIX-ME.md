# Com afegir una setmana

1. A GitHub, dins `setmanes/`, crea una carpeta amb la data de la setmana (qualsevol dia): `2026-11-02`.
2. Hi puges les fotos (arrossega-les a GitHub). El nom és el peu: `1 Boo!.jpg` → "Boo!".
3. Hi crees `setmana.txt`: la primera línia és el títol i la resta el text.
4. Fet! En uns segons l'Action actualitza `setmanes.json` i la web ja ho mostra.

Estructura:
```
index.html
generar.js
setmanes.json            (es genera sol)
.github/workflows/setmanes.yml
setmanes/
  2026-10-26/
    setmana.txt
    1 Boo!.jpg
    2 Uuuh, un home llop!.jpg
```
Si ho vols provar en local: `node generar.js`.

Pel que fa als noms de les fotos: sí, poden tenir el nom que vulguis, amb algunes regles:
    - Han de ser .jpg, .jpeg, .png, .webp o .gif (majúscules o minúscules no importen). Les fotos de l’iPhone en format .heic no es veuen als navegadors, així que cal convertir-les a JPG.
    - El nom és el peu que surt en ampliar la foto: Passeig pel Born.jpg → «Passeig pel Born». Els números del principi s’ignoren en el peu, però serveixen per ordenar: 1 Boo!.jpg surt abans que 2 Home llop.jpg. Sense números s’ordenen alfabèticament.
    - La primera foto de cada setmana és la gran del mosaic, i es mostren les 4 primeres (a partir de la cinquena hi ha el «+N»). Si vols triar quina surt primera, posa-hi un 1 al davant.
    - Si no vols peu, posa només el número: 1.jpg surt sense text.
