export default function ModifiedSquareSVG () {
  return (
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="140" height="140" stroke="blue" fill="lightblue"/>
    </svg>
  );
};

/*


Ce code SVG crée un carré avec des propriétés spécifiques. Voici les détails de chaque partie :

Élément <svg> :

width="200" height="200" : Définit la largeur et la hauteur de la zone de travail SVG en pixels. Ici, un carré de 200x200 pixels.
xmlns="http://www.w3.org/2000/svg" : Déclare l'espace de noms XML pour SVG, nécessaire pour que le SVG soit interprété correctement par les navigateurs.
Élément <rect> (rectangle) :

x="30" y="30" : Détermine la position du coin supérieur gauche du rectangle. Dans ce cas, le rectangle est placé à 30 pixels du bord gauche (x="30") et 30 pixels du bord supérieur (y="30") du SVG.
width="140" height="140" : Spécifie la largeur et la hauteur du rectangle. Ici, le rectangle a une largeur et une hauteur de 140 pixels, ce qui le rend carré.
stroke="blue" : Définit la couleur du contour du rectangle. stroke spécifie la couleur de la ligne qui entoure le rectangle. Dans cet exemple, la couleur du contour est bleue.
fill="lightblue" : Détermine la couleur de remplissage du rectangle. Le rectangle est rempli d'une couleur bleu clair.
En somme, ce code SVG produit un carré bleu clair de 140x140 pixels, avec un contour bleu, positionné à 30 pixels du bord supérieur et du bord gauche de l'espace de travail SVG de 200x200 pixels.

*/