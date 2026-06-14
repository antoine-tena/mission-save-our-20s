import type { LayoutCategory } from './layoutsConfig';

export const cat1: LayoutCategory = {
  count: 1,
  name: "1 Photo",
  proposals: [
    // 6 Photos seules
    { id: "g1-p-1", name: "Héros Centré", slots: [{ x: 3, y: 2, w: 18, h: 14 }] },
    { id: "g1-p-2", name: "Carré Gauche", slots: [{ x: 3, y: 3, w: 12, h: 12 }] },
    { id: "g1-p-3", name: "Carré Droite", slots: [{ x: 9, y: 3, w: 12, h: 12 }] },
    { id: "g1-p-4", name: "Paysage Wide", slots: [{ x: 3, y: 4, w: 18, h: 10 }] },
    { id: "g1-p-5", name: "Portrait Élancé G.", slots: [{ x: 3, y: 2, w: 8, h: 14 }] },
    { id: "g1-p-6", name: "Portrait Élancé D.", slots: [{ x: 13, y: 2, w: 8, h: 14 }] },
    // 6 avec 1 Récit (3 avec 1 zone)
    { id: "g1-t1-1", name: "Héros & Journal Bas", slots: [{ x: 3, y: 2, w: 18, h: 8 }], texts: [{ x: 3, y: 11, w: 18, h: 5 }] },
    { id: "g1-t1-2", name: "Livre G., Image D.", slots: [{ x: 13, y: 2, w: 9, h: 14 }], texts: [{ x: 2, y: 2, w: 9, h: 14 }] },
    { id: "g1-t1-3", name: "Image G., Journal D.", slots: [{ x: 2, y: 2, w: 9, h: 14 }], texts: [{ x: 13, y: 2, w: 9, h: 14 }] },
    { id: "g1-t1-4", name: "Récit en En-tête", slots: [{ x: 3, y: 8, w: 18, h: 8 }], texts: [{ x: 3, y: 2, w: 18, h: 5 }] },
    { id: "g1-t1-5", name: "Carré G., Note Bas D.", slots: [{ x: 2, y: 2, w: 11, h: 11 }], texts: [{ x: 14, y: 9, w: 8, h: 7 }] },
    { id: "g1-t1-6", name: "Carré D., Note Bas G.", slots: [{ x: 11, y: 2, w: 11, h: 11 }], texts: [{ x: 2, y: 9, w: 8, h: 7 }] },
    // 6 avec 2 Récits (3 avec 2 zones)
    { id: "g1-t2-1", name: "Sable de Notes G/D", slots: [{ x: 2, y: 2, w: 12, h: 14 }], texts: [{ x: 15, y: 2, w: 7, h: 6 }, { x: 15, y: 9, w: 7, h: 7 }] },
    { id: "g1-t2-2", name: "Édito Double G.", slots: [{ x: 10, y: 2, w: 12, h: 14 }], texts: [{ x: 2, y: 2, w: 7, h: 6 }, { x: 2, y: 9, w: 7, h: 7 }] },
    { id: "g1-t2-3", name: "Triptyque Note", slots: [{ x: 2, y: 6, w: 20, h: 6 }], texts: [{ x: 2, y: 2, w: 20, h: 3 }, { x: 2, y: 13, w: 20, h: 3 }] },
    { id: "g1-t2-4", name: "Fiche Recto Verso", slots: [{ x: 9, y: 2, w: 7, h: 14 }], texts: [{ x: 2, y: 2, w: 6, h: 14 }, { x: 17, y: 2, w: 5, h: 14 }] },
    { id: "g1-t2-5", name: "Image Centrale & Duos", slots: [{ x: 7, y: 3, w: 10, h: 12 }], texts: [{ x: 2, y: 2, w: 4, h: 14 }, { x: 18, y: 2, w: 4, h: 14 }] },
    { id: "g1-t2-6", name: "Cadran 3 Blocs", slots: [{ x: 2, y: 5, w: 12, h: 8 }], texts: [{ x: 2, y: 2, w: 20, h: 2 }, { x: 15, y: 5, w: 7, h: 11 }] }
  ]
};

export const cat2: LayoutCategory = {
  count: 2,
  name: "2 Photos",
  proposals: [
    // 6 Photos seules
    { id: "g2-p-1", name: "Colonnes Symétriques", slots: [{ x: 2, y: 3, w: 9, h: 12 }, { x: 13, y: 3, w: 9, h: 12 }] },
    { id: "g2-p-2", name: "Bandes Horizontales", slots: [{ x: 3, y: 2, w: 18, h: 6 }, { x: 3, y: 10, w: 18, h: 6 }] },
    { id: "g2-p-3", name: "Asymétrique Chic G.", slots: [{ x: 2, y: 2, w: 12, h: 14 }, { x: 15, y: 5, w: 7, h: 8 }] },
    { id: "g2-p-4", name: "Asymétrique Chic D.", slots: [{ x: 2, y: 5, w: 7, h: 8 }, { x: 10, y: 2, w: 12, h: 14 }] },
    { id: "g2-p-5", name: "Duo Diagonale", slots: [{ x: 2, y: 2, w: 9, h: 7 }, { x: 13, y: 9, w: 9, h: 7 }] },
    { id: "g2-p-6", name: "Polaroids Superposés", slots: [{ x: 3, y: 3, w: 9, h: 11 }, { x: 11, y: 4, w: 9, h: 11 }] },
    // 6 avec 1 Récit (3 avec 1 zone)
    { id: "g2-t1-1", name: "Duo & Légende Bas", slots: [{ x: 2, y: 2, w: 9, h: 10 }, { x: 13, y: 2, w: 9, h: 10 }], texts: [{ x: 2, y: 13, w: 20, h: 3 }] },
    { id: "g2-t1-2", name: "Duo G., Récit D.", slots: [{ x: 2, y: 2, w: 9, h: 6 }, { x: 2, y: 9, w: 9, h: 7 }], texts: [{ x: 13, y: 2, w: 9, h: 14 }] },
    { id: "g2-t1-3", name: "Asymétrique & Note", slots: [{ x: 2, y: 2, w: 12, h: 14 }, { x: 15, y: 2, w: 7, h: 6 }], texts: [{ x: 15, y: 9, w: 7, h: 7 }] },
    { id: "g2-t1-4", name: "Duo D., Récit G.", slots: [{ x: 13, y: 2, w: 9, h: 6 }, { x: 13, y: 9, w: 9, h: 7 }], texts: [{ x: 2, y: 2, w: 9, h: 14 }] },
    { id: "g2-t1-5", name: "Bandeau Haut & Récit", slots: [{ x: 2, y: 2, w: 9, h: 7 }, { x: 13, y: 2, w: 9, h: 7 }], texts: [{ x: 2, y: 10, w: 20, h: 6 }] },
    { id: "g2-t1-6", name: "Sandwich d'Images", slots: [{ x: 2, y: 2, w: 20, h: 5 }, { x: 2, y: 11, w: 20, h: 5 }], texts: [{ x: 2, y: 8, w: 20, h: 2 }] },
    // 6 avec 2 Récits (3 avec 2 zones)
    { id: "g2-t2-1", name: "Double Colonnes Notes", slots: [{ x: 2, y: 2, w: 9, h: 7 }, { x: 13, y: 2, w: 9, h: 7 }], texts: [{ x: 2, y: 10, w: 9, h: 6 }, { x: 13, y: 10, w: 9, h: 6 }] },
    { id: "g2-t2-2", name: "Timeline Double", slots: [{ x: 2, y: 5, w: 9, h: 8 }, { x: 13, y: 5, w: 9, h: 8 }], texts: [{ x: 2, y: 2, w: 20, h: 2 }, { x: 2, y: 14, w: 20, h: 2 }] },
    { id: "g2-t2-3", name: "Grille Notes Libres", slots: [{ x: 7, y: 2, w: 10, h: 14 }], texts: [{ x: 2, y: 2, w: 4, h: 8 }, { x: 18, y: 2, w: 4, h: 8 }] },
    { id: "g2-t2-4", name: "Duo Central vertical", slots: [{ x: 8, y: 2, w: 8, h: 6 }, { x: 8, y: 10, w: 8, h: 6 }], texts: [{ x: 2, y: 2, w: 5, h: 14 }, { x: 17, y: 2, w: 5, h: 14 }] },
    { id: "g2-t2-5", name: "Asymétrie & Double Note", slots: [{ x: 2, y: 2, w: 11, h: 9 }, { x: 15, y: 2, w: 7, h: 5 }], texts: [{ x: 2, y: 12, w: 11, h: 4 }, { x: 15, y: 8, w: 7, h: 8 }] },
    { id: "g2-t2-6", name: "Cadran 4 Blocs", slots: [{ x: 2, y: 2, w: 9, h: 6 }, { x: 13, y: 10, w: 9, h: 6 }], texts: [{ x: 13, y: 2, w: 9, h: 7 }, { x: 2, y: 10, w: 9, h: 6 }] }
  ]
};
