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
