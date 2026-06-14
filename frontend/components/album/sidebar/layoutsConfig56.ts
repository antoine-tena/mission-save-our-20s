import type { LayoutCategory } from './layoutsConfig';

export const cat5: LayoutCategory = {
  count: 5,
  name: "5 Photos",
  proposals: [
    // 6 Photos seules
    { id: "g5-p-1", name: "Mosaïque Centrale", slots: [{ x: 2, y: 2, w: 9, h: 6 }, { x: 13, y: 2, w: 9, h: 6 }, { x: 2, y: 10, w: 6, h: 6 }, { x: 9, y: 10, w: 6, h: 6 }, { x: 16, y: 10, w: 6, h: 6 }] },
    { id: "g5-p-2", name: "Mosaïque en V", slots: [{ x: 8, y: 6, w: 8, h: 7 }, { x: 2, y: 2, w: 5, h: 4 }, { x: 17, y: 2, w: 5, h: 4 }, { x: 2, y: 12, w: 5, h: 4 }, { x: 17, y: 12, w: 5, h: 4 }] },
    { id: "g5-p-3", name: "Colonnes Décalées", slots: [{ x: 2, y: 4, w: 3, h: 10 }, { x: 6, y: 2, w: 3, h: 10 }, { x: 10, y: 4, w: 4, h: 10 }, { x: 15, y: 2, w: 3, h: 10 }, { x: 19, y: 4, w: 3, h: 10 }] },
    { id: "g5-p-4", name: "Frise Cascade 5", slots: [{ x: 2, y: 2, w: 3, h: 5 }, { x: 6, y: 4, w: 3, h: 5 }, { x: 10, y: 6, w: 4, h: 5 }, { x: 15, y: 8, w: 3, h: 5 }, { x: 19, y: 10, w: 3, h: 5 }] },
    { id: "g5-p-5", name: "Héros & 4 Angles", slots: [{ x: 2, y: 2, w: 5, h: 5 }, { x: 17, y: 2, w: 5, h: 5 }, { x: 7, y: 6, w: 10, h: 6 }, { x: 2, y: 11, w: 5, h: 5 }, { x: 17, y: 11, w: 5, h: 5 }] },
    { id: "g5-p-6", name: "Block Asymétrique", slots: [{ x: 2, y: 2, w: 6, h: 6 }, { x: 9, y: 2, w: 6, h: 6 }, { x: 16, y: 2, w: 6, h: 6 }, { x: 2, y: 10, w: 10, h: 6 }, { x: 13, y: 10, w: 9, h: 6 }] },
    // 6 avec 1 Récit (3 avec 1 zone)
    { id: "g5-t1-1", name: "Grille 5 & Note Droite", slots: [{ x: 2, y: 2, w: 4, h: 4 }, { x: 7, y: 2, w: 4, h: 4 }, { x: 2, y: 7, w: 4, h: 4 }, { x: 7, y: 7, w: 4, h: 4 }, { x: 2, y: 12, w: 9, h: 4 }], texts: [{ x: 13, y: 2, w: 9, h: 14 }] },
    { id: "g5-t1-2", name: "Cascade 5 & Récit G.", slots: [{ x: 13, y: 2, w: 4, h: 4 }, { x: 18, y: 2, w: 4, h: 4 }, { x: 13, y: 7, w: 4, h: 4 }, { x: 18, y: 7, w: 4, h: 4 }, { x: 13, y: 12, w: 9, h: 4 }], texts: [{ x: 2, y: 2, w: 10, h: 14 }] },
    { id: "g5-t1-3", name: "Pellicule T. & Journal", slots: [{ x: 2, y: 2, w: 3, h: 4 }, { x: 6, y: 2, w: 3, h: 4 }, { x: 10, y: 2, w: 4, h: 4 }, { x: 15, y: 2, w: 3, h: 4 }, { x: 19, y: 2, w: 3, h: 4 }], texts: [{ x: 2, y: 8, w: 20, h: 8 }] },
    { id: "g5-t1-4", name: "Pyramide & Récit Bas", slots: [{ x: 2, y: 2, w: 6, h: 5 }, { x: 9, y: 2, w: 6, h: 5 }, { x: 16, y: 2, w: 6, h: 5 }, { x: 5, y: 8, w: 6, h: 5 }, { x: 13, y: 8, w: 6, h: 5 }], texts: [{ x: 2, y: 14, w: 20, h: 3 }] },
    { id: "g5-t1-5", name: "Duo & Trio Vertical", slots: [{ x: 2, y: 2, w: 9, h: 6 }, { x: 2, y: 9, w: 9, h: 6 }, { x: 13, y: 2, w: 4, h: 4 }, { x: 18, y: 2, w: 4, h: 4 }, { x: 13, y: 7, w: 4, h: 4 }], texts: [{ x: 13, y: 12, w: 9, h: 4 }] },
    { id: "g5-t1-6", name: "Mosaïque en X Note", slots: [{ x: 2, y: 2, w: 5, h: 4 }, { x: 17, y: 2, w: 5, h: 4 }, { x: 9, y: 6, w: 6, h: 5 }, { x: 2, y: 12, w: 5, h: 4 }, { x: 17, y: 12, w: 5, h: 4 }], texts: [{ x: 8, y: 12, w: 8, h: 4 }] },
    // 6 avec 2 Récits (3 avec 2 zones)
    { id: "g5-t2-1", name: "Mosaic 5 & Doubles Notes", slots: [{ x: 2, y: 2, w: 6, h: 5 }, { x: 9, y: 2, w: 6, h: 5 }, { x: 16, y: 2, w: 6, h: 5 }, { x: 2, y: 11, w: 6, h: 5 }, { x: 9, y: 11, w: 6, h: 5 }], texts: [{ x: 16, y: 8, w: 6, h: 3 }, { x: 16, y: 12, w: 6, h: 4 }] },
    { id: "g5-t2-2", name: "Pellicules Latérales Notes", slots: [{ x: 2, y: 2, w: 4, h: 4 }, { x: 2, y: 7, w: 4, h: 4 }, { x: 2, y: 12, w: 4, h: 4 }, { x: 18, y: 2, w: 4, h: 4 }, { x: 18, y: 12, w: 4, h: 4 }], texts: [{ x: 7, y: 2, w: 10, h: 6 }, { x: 7, y: 10, w: 10, h: 6 }] },
    { id: "g5-t2-3", name: "Héros Central & Duos Notes", slots: [{ x: 8, y: 4, w: 8, h: 10 }, { x: 2, y: 2, w: 5, h: 5 }, { x: 17, y: 2, w: 5, h: 5 }, { x: 2, y: 11, w: 5, h: 5 }, { x: 17, y: 11, w: 5, h: 5 }], texts: [{ x: 8, y: 2, w: 8, h: 1 }, { x: 8, y: 15, w: 8, h: 2 }] },
    { id: "g5-t2-4", name: "Bandeau Haut Notes Bas", slots: [{ x: 2, y: 2, w: 4, h: 5 }, { x: 7, y: 2, w: 4, h: 5 }, { x: 13, y: 2, w: 4, h: 5 }, { x: 18, y: 2, w: 4, h: 5 }, { x: 2, y: 8, w: 10, h: 5 }], texts: [{ x: 13, y: 8, w: 9, h: 4 }, { x: 2, y: 14, w: 20, h: 3 }] },
    { id: "g5-t2-5", name: "Mosaïque en H", slots: [{ x: 2, y: 2, w: 4, h: 6 }, { x: 2, y: 10, w: 4, h: 6 }, { x: 18, y: 2, w: 4, h: 6 }, { x: 18, y: 10, w: 4, h: 6 }, { x: 8, y: 6, w: 8, h: 6 }], texts: [{ x: 8, y: 2, w: 8, h: 3 }, { x: 8, y: 13, w: 8, h: 3 }] },
    { id: "g5-t2-6", name: "Asymétrie Éparse Notes", slots: [{ x: 2, y: 2, w: 10, h: 6 }, { x: 14, y: 2, w: 8, h: 4 }, { x: 14, y: 7, w: 8, h: 4 }, { x: 2, y: 10, w: 5, h: 6 }, { x: 8, y: 10, w: 5, h: 6 }], texts: [{ x: 14, y: 12, w: 8, h: 4 }, { x: 2, y: 17, w: 20, h: 1 }] }
  ]
};

export const cat6: LayoutCategory = {
  count: 6,
  name: "6 Photos",
  proposals: [
    // 6 Photos seules
    { id: "g6-p-1", name: "Grille 3x2 Régulière", slots: [{ x: 2, y: 2, w: 6, h: 6 }, { x: 9, y: 2, w: 6, h: 6 }, { x: 16, y: 2, w: 6, h: 6 }, { x: 2, y: 10, w: 6, h: 6 }, { x: 9, y: 10, w: 6, h: 6 }, { x: 16, y: 10, w: 6, h: 6 }] },
    { id: "g6-p-2", name: "Pellicule Double", slots: [{ x: 2, y: 2, w: 9, h: 4 }, { x: 13, y: 2, w: 9, h: 4 }, { x: 2, y: 7, w: 9, h: 4 }, { x: 13, y: 7, w: 9, h: 4 }, { x: 2, y: 12, w: 9, h: 4 }, { x: 13, y: 12, w: 9, h: 4 }] },
    { id: "g6-p-3", name: "Cascade Mosaïque 6", slots: [{ x: 2, y: 2, w: 6, h: 4 }, { x: 9, y: 2, w: 13, h: 4 }, { x: 2, y: 7, w: 13, h: 4 }, { x: 16, y: 7, w: 6, h: 4 }, { x: 2, y: 12, w: 6, h: 4 }, { x: 9, y: 12, w: 13, h: 4 }] },
    { id: "g6-p-4", name: "Colonnes 2x3 Serrées", slots: [{ x: 3, y: 2, w: 5, h: 6 }, { x: 9, y: 2, w: 6, h: 6 }, { x: 16, y: 2, w: 5, h: 6 }, { x: 3, y: 10, w: 5, h: 6 }, { x: 9, y: 10, w: 6, h: 6 }, { x: 16, y: 10, w: 5, h: 6 }] },
    { id: "g6-p-5", name: "Héros Central & 5 Vignettes", slots: [{ x: 7, y: 5, w: 10, h: 8 }, { x: 2, y: 2, w: 4, h: 4 }, { x: 18, y: 2, w: 4, h: 4 }, { x: 2, y: 12, w: 4, h: 4 }, { x: 18, y: 12, w: 4, h: 4 }, { x: 10, y: 1, w: 4, h: 3 }] },
    { id: "g6-p-6", name: "6 Bandes Fines G/D", slots: [{ x: 2, y: 2, w: 9, h: 4 }, { x: 13, y: 2, w: 9, h: 4 }, { x: 2, y: 7, w: 9, h: 4 }, { x: 13, y: 7, w: 9, h: 4 }, { x: 2, y: 12, w: 9, h: 4 }, { x: 13, y: 12, w: 9, h: 4 }] },
    // 6 avec 1 Récit (3 avec 1 zone)
    { id: "g6-t1-1", name: "Grille 6 & Récit G.", slots: [{ x: 11, y: 2, w: 5, h: 4 }, { x: 17, y: 2, w: 5, h: 4 }, { x: 11, y: 7, w: 5, h: 4 }, { x: 17, y: 7, w: 5, h: 4 }, { x: 11, y: 12, w: 5, h: 4 }, { x: 17, y: 12, w: 5, h: 4 }], texts: [{ x: 2, y: 2, w: 8, h: 14 }] },
    { id: "g6-t1-2", name: "Frise Double & Note Bas", slots: [{ x: 2, y: 2, w: 4, h: 4 }, { x: 7, y: 2, w: 4, h: 4 }, { x: 12, y: 2, w: 4, h: 4 }, { x: 17, y: 2, w: 5, h: 4 }, { x: 2, y: 7, w: 4, h: 4 }, { x: 7, y: 7, w: 4, h: 4 }], texts: [{ x: 2, y: 13, w: 20, h: 3 }] },
    { id: "g6-t1-3", name: "Cascade 6 & Journal", slots: [{ x: 2, y: 2, w: 4, h: 4 }, { x: 7, y: 2, w: 4, h: 4 }, { x: 13, y: 2, w: 4, h: 4 }, { x: 2, y: 7, w: 4, h: 4 }, { x: 7, y: 7, w: 4, h: 4 }, { x: 13, y: 7, w: 4, h: 4 }], texts: [{ x: 18, y: 2, w: 4, h: 14 }] },
    { id: "g6-t1-4", name: "Double Trio G/D & Note", slots: [{ x: 2, y: 2, w: 4, h: 4 }, { x: 2, y: 7, w: 4, h: 4 }, { x: 2, y: 12, w: 4, h: 4 }, { x: 18, y: 2, w: 4, h: 4 }, { x: 18, y: 7, w: 4, h: 4 }, { x: 18, y: 12, w: 4, h: 4 }], texts: [{ x: 7, y: 2, w: 10, h: 14 }] },
    { id: "g6-t1-5", name: "Note en En-tête Grille 6", slots: [{ x: 2, y: 8, w: 6, h: 8 }, { x: 9, y: 8, w: 6, h: 8 }, { x: 16, y: 8, w: 6, h: 8 }, { x: 2, y: 14, w: 6, h: 3 }, { x: 9, y: 14, w: 6, h: 3 }, { x: 16, y: 14, w: 6, h: 3 }], texts: [{ x: 2, y: 2, w: 20, h: 4 }] },
    { id: "g6-t1-6", name: "Cascade diagonale & Note", slots: [{ x: 2, y: 2, w: 4, h: 4 }, { x: 7, y: 4, w: 4, h: 4 }, { x: 12, y: 6, w: 4, h: 4 }, { x: 17, y: 8, w: 4, h: 4 }, { x: 2, y: 11, w: 4, h: 4 }, { x: 7, y: 13, w: 4, h: 4 }], texts: [{ x: 12, y: 11, w: 10, h: 6 }] },
    // 6 avec 2 Récits (3 avec 2 zones)
    { id: "g6-t2-1", name: "Block 6 & Doubles Notes", slots: [{ x: 2, y: 2, w: 5, h: 4 }, { x: 8, y: 2, w: 5, h: 4 }, { x: 15, y: 2, w: 5, h: 4 }, { x: 2, y: 11, w: 5, h: 4 }, { x: 8, y: 11, w: 5, h: 4 }, { x: 15, y: 11, w: 5, h: 4 }], texts: [{ x: 2, y: 7, w: 18, h: 3 }, { x: 2, y: 16, w: 18, h: 1 }] },
    { id: "g6-t2-2", name: "Pellicules & Notes G/D", slots: [{ x: 6, y: 2, w: 4, h: 4 }, { x: 11, y: 2, w: 4, h: 4 }, { x: 6, y: 7, w: 4, h: 4 }, { x: 11, y: 7, w: 4, h: 4 }, { x: 6, y: 13, w: 4, h: 4 }, { x: 11, y: 13, w: 4, h: 4 }], texts: [{ x: 2, y: 2, w: 3, h: 15 }, { x: 17, y: 2, w: 5, h: 15 }] },
    { id: "g6-t2-3", name: "6 Coins Notes Centrales", slots: [{ x: 2, y: 2, w: 4, h: 4 }, { x: 2, y: 7, w: 4, h: 4 }, { x: 2, y: 13, w: 4, h: 4 }, { x: 18, y: 2, w: 4, h: 4 }, { x: 18, y: 7, w: 4, h: 4 }, { x: 18, y: 13, w: 4, h: 4 }], texts: [{ x: 7, y: 3, w: 9, h: 4 }, { x: 7, y: 10, w: 9, h: 4 }] },
    { id: "g6-t2-4", name: "Symphonie Asymétrique", slots: [{ x: 2, y: 2, w: 6, h: 4 }, { x: 9, y: 2, w: 6, h: 4 }, { x: 16, y: 2, w: 6, h: 4 }, { x: 2, y: 12, w: 6, h: 4 }, { x: 9, y: 12, w: 6, h: 4 }, { x: 16, y: 12, w: 6, h: 4 }], texts: [{ x: 2, y: 7, w: 10, h: 4 }, { x: 13, y: 7, w: 9, h: 4 }] },
    { id: "g6-t2-5", name: "Lignes Alternées Notes", slots: [{ x: 2, y: 2, w: 9, h: 4 }, { x: 2, y: 7, w: 9, h: 4 }, { x: 2, y: 12, w: 9, h: 4 }, { x: 13, y: 4, w: 9, h: 4 }, { x: 13, y: 9, w: 9, h: 4 }, { x: 13, y: 14, w: 9, h: 3 }], texts: [{ x: 13, y: 1, w: 9, h: 2 }, { x: 2, y: 16, w: 9, h: 2 }] },
    { id: "g6-t2-6", name: "Mosaïque en Roue", slots: [{ x: 2, y: 2, w: 4, h: 4 }, { x: 8, y: 2, w: 8, h: 4 }, { x: 18, y: 2, w: 4, h: 4 }, { x: 2, y: 12, w: 4, h: 4 }, { x: 8, y: 12, w: 8, h: 4 }, { x: 18, y: 12, w: 4, h: 4 }], texts: [{ x: 2, y: 7, w: 5, h: 4 }, { x: 17, y: 7, w: 5, h: 4 }] }
  ]
};
