import type { LayoutCategory } from './layoutsConfig';

export const cat3: LayoutCategory = {
  count: 3,
  name: "3 Photos",
  proposals: [
    // 6 Photos seules
    { id: "g3-p-1", name: "1 Grand, 2 Petits", slots: [{ x: 2, y: 3, w: 10, h: 12 }, { x: 13, y: 2, w: 9, h: 6 }, { x: 13, y: 10, w: 9, h: 6 }] },
    { id: "g3-p-2", name: "Triptyque Égal", slots: [{ x: 2, y: 3, w: 6, h: 12 }, { x: 9, y: 3, w: 6, h: 12 }, { x: 16, y: 3, w: 6, h: 12 }] },
    { id: "g3-p-3", name: "Bandeau Haut & Grille", slots: [{ x: 3, y: 2, w: 18, h: 7 }, { x: 3, y: 10, w: 8, h: 6 }, { x: 13, y: 10, w: 8, h: 6 }] },
    { id: "g3-p-4", name: "Cascade Diagonale", slots: [{ x: 2, y: 2, w: 7, h: 5 }, { x: 9, y: 6, w: 7, h: 5 }, { x: 15, y: 11, w: 7, h: 5 }] },
    { id: "g3-p-5", name: "Héros Central & Duos", slots: [{ x: 8, y: 2, w: 8, h: 14 }, { x: 2, y: 5, w: 5, h: 8 }, { x: 17, y: 5, w: 5, h: 8 }] },
    { id: "g3-p-6", name: "Mosaïque Split D.", slots: [{ x: 2, y: 2, w: 9, h: 6 }, { x: 2, y: 10, w: 9, h: 6 }, { x: 12, y: 3, w: 10, h: 12 }] },
    // 6 avec 1 Récit (3 avec 1 zone)
    { id: "g3-t1-1", name: "Triptyque & Récit Bas", slots: [{ x: 2, y: 2, w: 6, h: 9 }, { x: 9, y: 2, w: 6, h: 9 }, { x: 16, y: 2, w: 6, h: 9 }], texts: [{ x: 2, y: 12, w: 20, h: 4 }] },
    { id: "g3-t1-2", name: "Héros, 2 & Note D.", slots: [{ x: 2, y: 2, w: 10, h: 14 }, { x: 13, y: 2, w: 9, h: 4 }, { x: 13, y: 7, w: 9, h: 4 }], texts: [{ x: 13, y: 12, w: 9, h: 4 }] },
    { id: "g3-t1-3", name: "Cascade & Journal", slots: [{ x: 2, y: 2, w: 6, h: 5 }, { x: 9, y: 5, w: 6, h: 5 }, { x: 16, y: 8, w: 6, h: 5 }], texts: [{ x: 2, y: 14, w: 20, h: 3 }] },
    { id: "g3-t1-4", name: "Récit G., Triptyque D.", slots: [{ x: 11, y: 2, w: 3, h: 14 }, { x: 15, y: 2, w: 3, h: 14 }, { x: 19, y: 2, w: 3, h: 14 }], texts: [{ x: 2, y: 2, w: 8, h: 14 }] },
    { id: "g3-t1-5", name: "Bandeau & Notes G/D", slots: [{ x: 6, y: 2, w: 12, h: 7 }, { x: 2, y: 10, w: 9, h: 6 }, { x: 13, y: 10, w: 9, h: 6 }], texts: [{ x: 2, y: 2, w: 3, h: 7 }] },
    { id: "g3-t1-6", name: "Cinéma Récit Central", slots: [{ x: 2, y: 4, w: 6, h: 8 }, { x: 16, y: 4, w: 6, h: 8 }, { x: 9, y: 2, w: 6, h: 4 }], texts: [{ x: 9, y: 7, w: 6, h: 9 }] },
    // 6 avec 2 Récits (3 avec 2 zones)
    { id: "g3-t2-1", name: "Asymétrie & Double Note", slots: [{ x: 2, y: 3, w: 10, h: 12 }, { x: 13, y: 2, w: 9, h: 4 }, { x: 13, y: 7, w: 9, h: 4 }], texts: [{ x: 13, y: 12, w: 9, h: 2 }, { x: 13, y: 15, w: 9, h: 2 }] },
    { id: "g3-t2-2", name: "Triptyque Écarté", slots: [{ x: 2, y: 4, w: 5, h: 10 }, { x: 9, y: 4, w: 6, h: 10 }, { x: 17, y: 4, w: 5, h: 10 }], texts: [{ x: 2, y: 15, w: 20, h: 2 }, { x: 2, y: 2, w: 20, h: 1 }] },
    { id: "g3-t2-3", name: "Vignettes Centrales", slots: [{ x: 8, y: 2, w: 8, h: 14 }], texts: [{ x: 2, y: 2, w: 5, h: 14 }, { x: 17, y: 2, w: 5, h: 14 }] },
    { id: "g3-t2-4", name: "Triptyque de tête", slots: [{ x: 2, y: 2, w: 6, h: 5 }, { x: 9, y: 2, w: 6, h: 5 }, { x: 16, y: 2, w: 6, h: 5 }], texts: [{ x: 2, y: 8, w: 9, h: 8 }, { x: 13, y: 8, w: 9, h: 8 }] },
    { id: "g3-t2-5", name: "Pyramide de Récits", slots: [{ x: 2, y: 11, w: 6, h: 5 }, { x: 9, y: 11, w: 6, h: 5 }, { x: 16, y: 11, w: 6, h: 5 }], texts: [{ x: 4, y: 3, w: 6, h: 6 }, { x: 14, y: 3, w: 6, h: 6 }] },
    { id: "g3-t2-6", name: "Mélange Asymétrique", slots: [{ x: 2, y: 2, w: 10, h: 7 }, { x: 12, y: 10, w: 10, h: 6 }], texts: [{ x: 13, y: 2, w: 9, h: 7 }, { x: 2, y: 10, w: 9, h: 6 }] }
  ]
};

export const cat4: LayoutCategory = {
  count: 4,
  name: "4 Photos",
  proposals: [
    // 6 Photos seules
    { id: "g4-p-1", name: "Grille 2x2 Dynamique", slots: [{ x: 2, y: 2, w: 9, h: 6 }, { x: 13, y: 2, w: 9, h: 6 }, { x: 2, y: 10, w: 9, h: 6 }, { x: 13, y: 10, w: 9, h: 6 }] },
    { id: "g4-p-2", name: "Pellicule Gauche", slots: [{ x: 2, y: 2, w: 4, h: 4 }, { x: 2, y: 7, w: 4, h: 4 }, { x: 2, y: 12, w: 4, h: 4 }, { x: 8, y: 2, w: 14, h: 14 }] },
    { id: "g4-p-3", name: "Mosaïque Frise", slots: [{ x: 2, y: 4, w: 4, h: 10 }, { x: 7, y: 4, w: 4, h: 10 }, { x: 13, y: 4, w: 4, h: 10 }, { x: 18, y: 4, w: 4, h: 10 }] },
    { id: "g4-p-4", name: "Pellicule Droite", slots: [{ x: 2, y: 2, w: 14, h: 14 }, { x: 18, y: 2, w: 4, h: 4 }, { x: 18, y: 7, w: 4, h: 4 }, { x: 18, y: 12, w: 4, h: 4 }] },
    { id: "g4-p-5", name: "Asymétrie Échelonnée", slots: [{ x: 2, y: 2, w: 6, h: 6 }, { x: 9, y: 2, w: 13, h: 6 }, { x: 2, y: 10, w: 13, h: 6 }, { x: 16, y: 10, w: 6, h: 6 }] },
    { id: "g4-p-6", name: "4 Coins Opposés", slots: [{ x: 2, y: 2, w: 8, h: 6 }, { x: 14, y: 2, w: 8, h: 6 }, { x: 2, y: 10, w: 8, h: 6 }, { x: 14, y: 10, w: 8, h: 6 }] },
    // 6 avec 1 Récit (3 avec 1 zone)
    { id: "g4-t1-1", name: "Grille 4 & Note Centrale", slots: [{ x: 2, y: 2, w: 6, h: 5 }, { x: 16, y: 2, w: 6, h: 5 }, { x: 2, y: 11, w: 6, h: 5 }, { x: 16, y: 11, w: 6, h: 5 }], texts: [{ x: 9, y: 5, w: 6, h: 8 }] },
    { id: "g4-t1-2", name: "Pellicule G. & Récit D.", slots: [{ x: 2, y: 2, w: 4, h: 4 }, { x: 2, y: 7, w: 4, h: 4 }, { x: 2, y: 12, w: 4, h: 4 }, { x: 7, y: 2, w: 8, h: 14 }], texts: [{ x: 16, y: 2, w: 6, h: 14 }] },
    { id: "g4-t1-3", name: "Frise & Journal Bas", slots: [{ x: 2, y: 2, w: 4, h: 8 }, { x: 7, y: 2, w: 4, h: 8 }, { x: 12, y: 2, w: 4, h: 8 }, { x: 17, y: 2, w: 5, h: 8 }], texts: [{ x: 2, y: 11, w: 20, h: 5 }] },
    { id: "g4-t1-4", name: "Cinéma Quatuor & Note", slots: [{ x: 2, y: 2, w: 9, h: 5 }, { x: 13, y: 2, w: 9, h: 5 }, { x: 2, y: 8, w: 9, h: 5 }, { x: 13, y: 8, w: 9, h: 5 }], texts: [{ x: 2, y: 14, w: 20, h: 3 }] },
    { id: "g4-t1-5", name: "Portraits doubles & Récit", slots: [{ x: 2, y: 2, w: 4, h: 10 }, { x: 7, y: 2, w: 4, h: 10 }, { x: 12, y: 2, w: 4, h: 10 }, { x: 17, y: 2, w: 5, h: 10 }], texts: [{ x: 2, y: 13, w: 20, h: 3 }] },
    { id: "g4-t1-6", name: "Fleurs d'Images", slots: [{ x: 2, y: 2, w: 8, h: 5 }, { x: 14, y: 2, w: 8, h: 5 }, { x: 2, y: 11, w: 8, h: 5 }, { x: 14, y: 11, w: 8, h: 5 }], texts: [{ x: 11, y: 2, w: 2, h: 14 }] },
    // 6 avec 2 Récits (3 avec 2 zones)
    { id: "g4-t2-1", name: "Carré Central & Notes", slots: [{ x: 2, y: 2, w: 7, h: 6 }, { x: 15, y: 2, w: 7, h: 6 }, { x: 2, y: 10, w: 7, h: 6 }, { x: 15, y: 10, w: 7, h: 6 }], texts: [{ x: 10, y: 2, w: 4, h: 6 }, { x: 10, y: 10, w: 4, h: 6 }] },
    { id: "g4-t2-2", name: "Timeline Notes Libres", slots: [{ x: 2, y: 4, w: 4, h: 10 }, { x: 7, y: 4, w: 4, h: 10 }, { x: 13, y: 4, w: 4, h: 10 }, { x: 18, y: 4, w: 4, h: 10 }], texts: [{ x: 2, y: 15, w: 20, h: 2 }, { x: 2, y: 2, w: 20, h: 1 }] },
    { id: "g4-t2-3", name: "4 Blocs & Double Note", slots: [{ x: 2, y: 2, w: 4, h: 4 }, { x: 2, y: 12, w: 4, h: 4 }, { x: 18, y: 2, w: 4, h: 4 }, { x: 18, y: 12, w: 4, h: 4 }], texts: [{ x: 7, y: 2, w: 10, h: 6 }, { x: 7, y: 10, w: 10, h: 6 }] },
    { id: "g4-t2-4", name: "Carré de gauche étendu", slots: [{ x: 2, y: 2, w: 9, h: 6 }, { x: 2, y: 10, w: 9, h: 6 }], texts: [{ x: 12, y: 2, w: 10, h: 3 }, { x: 12, y: 13, w: 10, h: 3 }] },
    { id: "g4-t2-5", name: "Quatuor Cascade", slots: [{ x: 2, y: 2, w: 4, h: 4 }, { x: 7, y: 5, w: 4, h: 4 }, { x: 12, y: 8, w: 4, h: 4 }, { x: 17, y: 11, w: 4, h: 4 }], texts: [{ x: 22, y: 2, w: 2, h: 13 }, { x: 2, y: 14, w: 9, h: 2 }] },
    { id: "g4-t2-6", name: "Double triptyque mixte", slots: [{ x: 2, y: 2, w: 4, h: 4 }, { x: 7, y: 2, w: 4, h: 4 }, { x: 13, y: 2, w: 4, h: 4 }, { x: 18, y: 2, w: 4, h: 4 }], texts: [{ x: 2, y: 9, w: 10, h: 7 }, { x: 13, y: 9, w: 9, h: 7 }] }
  ]
};
