export interface LayoutProposal {
  id: string;
  name: string;
  slots: { x: number; y: number; w: number; h: number }[];
  texts?: { x: number; y: number; w: number; h: number }[];
}

export interface LayoutCategory {
  count: number;
  name: string;
  proposals: LayoutProposal[];
}

export const layoutCategories: LayoutCategory[] = [
  {
    count: 1,
    name: "1 Photo",
    proposals: [
      { id: "grid-1-a", name: "Héros Centré", slots: [{ x: 2, y: 1, w: 20, h: 16 }] },
      { id: "grid-1-b", name: "Carré Gauche", slots: [{ x: 1, y: 2, w: 14, h: 14 }] },
      { id: "grid-1-c", name: "Paysage Wide", slots: [{ x: 1, y: 4, w: 22, h: 10 }] },
      // 3 avec 1 zone de texte
      { id: "grid-1-t1-a", name: "Héros & Récit Bas", slots: [{ x: 2, y: 1, w: 20, h: 9 }], texts: [{ x: 2, y: 11, w: 20, h: 6 }] },
      { id: "grid-1-t1-b", name: "Livre G., Image D.", slots: [{ x: 12, y: 2, w: 11, h: 14 }], texts: [{ x: 2, y: 2, w: 9, h: 14 }] },
      { id: "grid-1-t1-c", name: "Image G., Journal D.", slots: [{ x: 1, y: 2, w: 11, h: 14 }], texts: [{ x: 13, y: 2, w: 10, h: 14 }] },
      // 3 avec 2 zones de texte
      { id: "grid-1-t2-a", name: "Sable de Notes", slots: [{ x: 1, y: 1, w: 13, h: 16 }], texts: [{ x: 15, y: 1, w: 8, h: 7 }, { x: 15, y: 9, w: 8, h: 8 }] },
      { id: "grid-1-t2-b", name: "Édito Double", slots: [{ x: 12, y: 1, w: 11, h: 16 }], texts: [{ x: 1, y: 1, w: 10, h: 7 }, { x: 1, y: 9, w: 10, h: 8 }] },
      { id: "grid-1-t2-c", name: "Triptyque Note", slots: [{ x: 1, y: 6, w: 22, h: 8 }], texts: [{ x: 1, y: 1, w: 22, h: 4 }, { x: 1, y: 15, w: 22, h: 3 }] }
    ]
  },
  {
    count: 2,
    name: "2 Photos",
    proposals: [
      { id: "grid-2-a", name: "Colonnes Symétriques", slots: [{ x: 1, y: 3, w: 10, h: 12 }, { x: 13, y: 3, w: 10, h: 12 }] },
      { id: "grid-2-b", name: "Bandes Horizontales", slots: [{ x: 2, y: 1, w: 20, h: 7 }, { x: 2, y: 10, w: 20, h: 7 }] },
      { id: "grid-2-c", name: "Asymétrique Chic", slots: [{ x: 1, y: 2, w: 13, h: 14 }, { x: 15, y: 5, w: 8, h: 8 }] },
      // 3 avec 1 zone de texte
      { id: "grid-2-t1-a", name: "Duo & Légende Bas", slots: [{ x: 1, y: 1, w: 10, h: 11 }, { x: 13, y: 1, w: 10, h: 11 }], texts: [{ x: 1, y: 13, w: 22, h: 4 }] },
      { id: "grid-2-t1-b", name: "Duo G., Récit D.", slots: [{ x: 1, y: 1, w: 10, h: 7 }, { x: 1, y: 9, w: 10, h: 8 }], texts: [{ x: 13, y: 1, w: 10, h: 16 }] },
      { id: "grid-2-t1-c", name: "Asymétrique & Note", slots: [{ x: 1, y: 2, w: 13, h: 14 }, { x: 15, y: 2, w: 8, h: 7 }], texts: [{ x: 15, y: 10, w: 8, h: 6 }] },
      // 3 avec 2 zones de texte
      { id: "grid-2-t2-a", name: "Carnet Double Colonnes", slots: [{ x: 1, y: 1, w: 10, h: 8 }, { x: 13, y: 1, w: 10, h: 8 }], texts: [{ x: 1, y: 10, w: 10, h: 7 }, { x: 13, y: 10, w: 10, h: 7 }] },
      { id: "grid-2-t2-b", name: "Timeline double", slots: [{ x: 1, y: 5, w: 10, h: 8 }, { x: 13, y: 5, w: 10, h: 8 }], texts: [{ x: 1, y: 1, w: 22, h: 3 }, { x: 1, y: 14, w: 22, h: 3 }] },
      { id: "grid-2-t2-c", name: "Grille Notes Libres", slots: [{ x: 7, y: 1, w: 11, h: 16 }], texts: [{ x: 1, y: 1, w: 5, h: 8 }, { x: 19, y: 1, w: 5, h: 8 }] }
    ]
  },
  {
    count: 3,
    name: "3 Photos",
    proposals: [
      { id: "grid-3-a", name: "1 Grand, 2 Petits", slots: [{ x: 1, y: 3, w: 11, h: 12 }, { x: 13, y: 2, w: 10, h: 7 }, { x: 13, y: 10, w: 10, h: 7 }] },
      { id: "grid-3-b", name: "Triptyque Égal", slots: [{ x: 1, y: 3, w: 7, h: 12 }, { x: 9, y: 3, w: 7, h: 12 }, { x: 17, y: 3, w: 7, h: 12 }] },
      { id: "grid-3-c", name: "Bandeau Haut & Grille", slots: [{ x: 2, y: 1, w: 20, h: 8 }, { x: 2, y: 10, w: 9, h: 7 }, { x: 13, y: 10, w: 9, h: 7 }] },
      // 3 avec 1 zone de texte
      { id: "grid-3-t1-a", name: "Triptyque & Récit Bas", slots: [{ x: 1, y: 1, w: 7, h: 10 }, { x: 9, y: 1, w: 7, h: 10 }, { x: 17, y: 1, w: 7, h: 10 }], texts: [{ x: 1, y: 12, w: 23, h: 5 }] },
      { id: "grid-3-t1-b", name: "Héros G., Duos & Note D.", slots: [{ x: 1, y: 2, w: 11, h: 14 }, { x: 13, y: 1, w: 10, h: 5 }, { x: 13, y: 7, w: 10, h: 5 }], texts: [{ x: 13, y: 13, w: 10, h: 4 }] },
      { id: "grid-3-t1-c", name: "Cascade & Journal", slots: [{ x: 1, y: 1, w: 6, h: 5 }, { x: 8, y: 4, w: 6, h: 5 }, { x: 15, y: 7, w: 6, h: 5 }], texts: [{ x: 1, y: 13, w: 22, h: 4 }] },
      // 3 avec 2 zones de texte
      { id: "grid-3-t2-a", name: "Asymétrie 3 & Double Note", slots: [{ x: 1, y: 3, w: 11, h: 12 }, { x: 13, y: 1, w: 10, h: 4 }, { x: 13, y: 6, w: 10, h: 4 }], texts: [{ x: 13, y: 11, w: 10, h: 3 }, { x: 13, y: 15, w: 10, h: 2 }] },
      { id: "grid-3-t2-b", name: "Triptyque Écarté", slots: [{ x: 1, y: 4, w: 6, h: 10 }, { x: 9, y: 4, w: 6, h: 10 }, { x: 17, y: 4, w: 6, h: 10 }], texts: [{ x: 1, y: 15, w: 22, h: 3 }, { x: 1, y: 1, w: 22, h: 2 }] },
      { id: "grid-3-t2-c", name: "Vignettes Centrales", slots: [{ x: 8, y: 1, w: 8, h: 16 }], texts: [{ x: 1, y: 1, w: 6, h: 8 }, { x: 17, y: 1, w: 6, h: 8 }] }
    ]
  },
  {
    count: 4,
    name: "4 Photos",
    proposals: [
      { id: "grid-4-a", name: "Grille 2x2 Dynamique", slots: [{ x: 1, y: 1, w: 10, h: 7 }, { x: 13, y: 1, w: 10, h: 7 }, { x: 1, y: 10, w: 10, h: 7 }, { x: 13, y: 10, w: 10, h: 7 }] },
      { id: "grid-4-b", name: "Pellicule Gauche", slots: [{ x: 1, y: 1, w: 5, h: 5 }, { x: 1, y: 7, w: 5, h: 5 }, { x: 1, y: 13, w: 5, h: 5 }, { x: 8, y: 2, w: 15, h: 14 }] },
      { id: "grid-4-c", name: "Mosaïque Frise", slots: [{ x: 1, y: 4, w: 5, h: 10 }, { x: 7, y: 4, w: 5, h: 10 }, { x: 13, y: 4, w: 5, h: 10 }, { x: 19, y: 4, w: 5, h: 10 }] },
      // 3 avec 1 zone de texte
      { id: "grid-4-t1-a", name: "Grille 4 & Note Centrale", slots: [{ x: 1, y: 1, w: 7, h: 6 }, { x: 17, y: 1, w: 7, h: 6 }, { x: 1, y: 11, w: 7, h: 6 }, { x: 17, y: 11, w: 7, h: 6 }], texts: [{ x: 9, y: 5, w: 7, h: 8 }] },
      { id: "grid-4-t1-b", name: "Pellicule G. & Récit D.", slots: [{ x: 1, y: 1, w: 5, h: 5 }, { x: 1, y: 7, w: 5, h: 5 }, { x: 1, y: 13, w: 5, h: 5 }, { x: 7, y: 1, w: 8, h: 16 }], texts: [{ x: 16, y: 1, w: 8, h: 16 }] },
      { id: "grid-4-t1-c", name: "Frise & Journal Bas", slots: [{ x: 1, y: 1, w: 5, h: 8 }, { x: 7, y: 1, w: 5, h: 8 }, { x: 13, y: 1, w: 5, h: 8 }, { x: 19, y: 1, w: 5, h: 8 }], texts: [{ x: 1, y: 11, w: 23, h: 6 }] },
      // 3 avec 2 zones de texte
      { id: "grid-4-t2-a", name: "Carré Central & Notes", slots: [{ x: 1, y: 1, w: 8, h: 7 }, { x: 16, y: 1, w: 8, h: 7 }, { x: 1, y: 10, w: 8, h: 7 }, { x: 16, y: 10, w: 8, h: 7 }], texts: [{ x: 10, y: 1, w: 5, h: 7 }, { x: 10, y: 10, w: 5, h: 7 }] },
      { id: "grid-4-t2-b", name: "Timeline Notes Libres", slots: [{ x: 2, y: 4, w: 4, h: 10 }, { x: 7, y: 4, w: 4, h: 10 }, { x: 13, y: 4, w: 4, h: 10 }, { x: 18, y: 4, w: 4, h: 10 }], texts: [{ x: 2, y: 15, w: 20, h: 3 }, { x: 2, y: 1, w: 20, h: 2 }] },
      { id: "grid-4-t2-c", name: "4 Blocs & Double Note", slots: [{ x: 1, y: 1, w: 5, h: 5 }, { x: 1, y: 11, w: 5, h: 5 }, { x: 18, y: 1, w: 5, h: 5 }, { x: 18, y: 11, w: 5, h: 5 }], texts: [{ x: 7, y: 2, w: 10, h: 6 }, { x: 7, y: 10, w: 10, h: 6 }] }
    ]
  },
  {
    count: 5,
    name: "5 Photos",
    proposals: [
      { id: "grid-5-a", name: "Mosaïque Centrale", slots: [{ x: 1, y: 1, w: 10, h: 7 }, { x: 13, y: 1, w: 10, h: 7 }, { x: 1, y: 10, w: 7, h: 7 }, { x: 9, y: 10, w: 7, h: 7 }, { x: 17, y: 10, w: 7, h: 7 }] },
      { id: "grid-5-b", name: "Mosaïque en V", slots: [{ x: 7, y: 5, w: 10, h: 8 }, { x: 1, y: 1, w: 5, h: 5 }, { x: 18, y: 1, w: 5, h: 5 }, { x: 1, y: 12, w: 5, h: 5 }, { x: 18, y: 12, w: 5, h: 5 }] },
      { id: "grid-5-c", name: "Colonnes Décalées", slots: [{ x: 1, y: 3, w: 4, h: 12 }, { x: 5, y: 1, w: 4, h: 12 }, { x: 10, y: 3, w: 4, h: 12 }, { x: 15, y: 1, w: 4, h: 12 }, { x: 19, y: 3, w: 4, h: 12 }] },
      // 3 avec 1 zone de texte
      { id: "grid-5-t1-a", name: "Grille 5 & Note Droite", slots: [{ x: 1, y: 1, w: 5, h: 5 }, { x: 7, y: 1, w: 5, h: 5 }, { x: 1, y: 7, w: 5, h: 5 }, { x: 7, y: 7, w: 5, h: 5 }, { x: 1, y: 13, w: 11, h: 5 }], texts: [{ x: 13, y: 1, w: 11, h: 16 }] },
      { id: "grid-5-t1-b", name: "Cascade 5 & Récit G.", slots: [{ x: 13, y: 1, w: 5, h: 4 }, { x: 19, y: 1, w: 5, h: 4 }, { x: 13, y: 6, w: 5, h: 4 }, { x: 19, y: 6, w: 5, h: 4 }, { x: 13, y: 11, w: 11, h: 6 }], texts: [{ x: 1, y: 1, w: 11, h: 16 }] },
      { id: "grid-5-t1-c", name: "Pellicule T. & Journal", slots: [{ x: 1, y: 1, w: 4, h: 4 }, { x: 6, y: 1, w: 4, h: 4 }, { x: 11, y: 1, w: 4, h: 4 }, { x: 16, y: 1, w: 4, h: 4 }, { x: 21, y: 1, w: 3, h: 4 }], texts: [{ x: 1, y: 7, w: 23, h: 10 }] },
      // 3 avec 2 zones de texte
      { id: "grid-5-t2-a", name: "Mosaic 5 & Doubles Notes", slots: [{ x: 1, y: 1, w: 7, h: 6 }, { x: 9, y: 1, w: 7, h: 6 }, { x: 17, y: 1, w: 7, h: 6 }, { x: 1, y: 11, w: 7, h: 6 }, { x: 9, y: 11, w: 7, h: 6 }], texts: [{ x: 17, y: 8, w: 7, h: 3 }, { x: 17, y: 12, w: 7, h: 5 }] },
      { id: "grid-5-t2-b", name: "Pellicules Latérales Notes", slots: [{ x: 1, y: 1, w: 4, h: 4 }, { x: 1, y: 6, w: 4, h: 4 }, { x: 1, y: 11, w: 4, h: 4 }, { x: 20, y: 1, w: 4, h: 4 }, { x: 20, y: 11, w: 4, h: 4 }], texts: [{ x: 6, y: 2, w: 13, h: 6 }, { x: 6, y: 10, w: 13, h: 6 }] },
      { id: "grid-5-t2-c", name: "Héros Central & Duos Notes", slots: [{ x: 8, y: 4, w: 8, h: 10 }, { x: 1, y: 1, w: 5, h: 5 }, { x: 18, y: 1, w: 5, h: 5 }, { x: 1, y: 12, w: 5, h: 5 }, { x: 18, y: 12, w: 5, h: 5 }], texts: [{ x: 8, y: 1, w: 8, h: 2 }, { x: 8, y: 15, w: 8, h: 2 }] }
    ]
  },
  {
    count: 6,
    name: "6 Photos",
    proposals: [
      { id: "grid-6-a", name: "Grille 3x2 Régulière", slots: [{ x: 1, y: 1, w: 7, h: 7 }, { x: 9, y: 1, w: 7, h: 7 }, { x: 17, y: 1, w: 7, h: 7 }, { x: 1, y: 10, w: 7, h: 7 }, { x: 9, y: 10, w: 7, h: 7 }, { x: 17, y: 10, w: 7, h: 7 }] },
      { id: "grid-6-b", name: "Pellicule Double", slots: [{ x: 1, y: 1, w: 11, h: 5 }, { x: 13, y: 1, w: 11, h: 5 }, { x: 1, y: 7, w: 11, h: 5 }, { x: 13, y: 7, w: 11, h: 5 }, { x: 1, y: 13, w: 11, h: 5 }, { x: 13, y: 13, w: 11, h: 5 }] },
      // 3 avec 1 zone de texte
      { id: "grid-6-t1-a", name: "Grille 6 & Récit G.", slots: [{ x: 11, y: 1, w: 6, h: 5 }, { x: 18, y: 1, w: 6, h: 5 }, { x: 11, y: 7, w: 6, h: 5 }, { x: 18, y: 7, w: 6, h: 5 }, { x: 11, y: 13, w: 6, h: 5 }, { x: 18, y: 13, w: 6, h: 5 }], texts: [{ x: 1, y: 1, w: 9, h: 16 }] },
      { id: "grid-6-t1-b", name: "Frise Double & Note Bas", slots: [{ x: 1, y: 1, w: 5, h: 5 }, { x: 7, y: 1, w: 5, h: 5 }, { x: 13, y: 1, w: 5, h: 5 }, { x: 19, y: 1, w: 5, h: 5 }, { x: 1, y: 7, w: 5, h: 5 }, { x: 7, y: 7, w: 5, h: 5 }], texts: [{ x: 1, y: 13, w: 23, h: 4 }] },
      { id: "grid-6-t1-c", name: "Cascade 6 & Journal", slots: [{ x: 1, y: 1, w: 5, h: 5 }, { x: 7, y: 1, w: 5, h: 5 }, { x: 13, y: 1, w: 5, h: 5 }, { x: 1, y: 7, w: 5, h: 5 }, { x: 7, y: 7, w: 5, h: 5 }, { x: 13, y: 7, w: 5, h: 5 }], texts: [{ x: 19, y: 1, w: 5, h: 16 }] },
      // 3 avec 2 zones de texte
      { id: "grid-6-t2-a", name: "Block 6 & Doubles Notes", slots: [{ x: 1, y: 1, w: 6, h: 5 }, { x: 8, y: 1, w: 6, h: 5 }, { x: 15, y: 1, w: 6, h: 5 }, { x: 1, y: 11, w: 6, h: 5 }, { x: 8, y: 11, w: 6, h: 5 }, { x: 15, y: 11, w: 6, h: 5 }], texts: [{ x: 1, y: 7, w: 20, h: 3 }, { x: 1, y: 17, w: 20, h: 1 }] },
      { id: "grid-6-t2-b", name: "Pellicules & Notes G/D", slots: [{ x: 6, y: 1, w: 5, h: 5 }, { x: 12, y: 1, w: 5, h: 5 }, { x: 6, y: 7, w: 5, h: 5 }, { x: 12, y: 7, w: 5, h: 5 }, { x: 6, y: 13, w: 5, h: 5 }, { x: 12, y: 13, w: 5, h: 5 }], texts: [{ x: 1, y: 1, w: 4, h: 16 }, { x: 18, y: 1, w: 6, h: 16 }] },
      { id: "grid-6-t2-c", name: "6 Coins Notes Centrales", slots: [{ x: 1, y: 1, w: 5, h: 5 }, { x: 1, y: 7, w: 5, h: 5 }, { x: 1, y: 13, w: 5, h: 5 }, { x: 18, y: 1, w: 5, h: 5 }, { x: 18, y: 7, w: 5, h: 5 }, { x: 18, y: 13, w: 5, h: 5 }], texts: [{ x: 7, y: 2, w: 10, h: 6 }, { x: 7, y: 10, w: 10, h: 6 }] }
    ]
  },
  {
    count: 7,
    name: "7 Photos",
    proposals: [
      { id: "grid-7-a", name: "Duo Héros & Bandeau", slots: [{ x: 1, y: 1, w: 11, h: 8 }, { x: 13, y: 1, w: 11, h: 8 }, { x: 1, y: 10, w: 4, h: 5 }, { x: 5, y: 10, w: 4, h: 5 }, { x: 10, y: 10, w: 4, h: 5 }, { x: 15, y: 10, w: 4, h: 5 }, { x: 19, y: 10, w: 4, h: 5 }] },
      { id: "grid-7-b", name: "Mosaïque Étoile", slots: [{ x: 1, y: 1, w: 4, h: 4 }, { x: 1, y: 6, w: 4, h: 4 }, { x: 1, y: 11, w: 4, h: 4 }, { x: 7, y: 1, w: 8, h: 7 }, { x: 16, y: 1, w: 8, h: 7 }, { x: 7, y: 9, w: 8, h: 7 }, { x: 16, y: 9, w: 8, h: 7 }] },
      // 3 avec 1 zone de texte
      { id: "grid-7-t1-a", name: "Grille 7 & Note Droite", slots: [{ x: 1, y: 1, w: 5, h: 5 }, { x: 7, y: 1, w: 5, h: 5 }, { x: 1, y: 7, w: 5, h: 5 }, { x: 7, y: 7, w: 5, h: 5 }, { x: 1, y: 13, w: 5, h: 5 }, { x: 7, y: 13, w: 5, h: 5 }, { x: 13, y: 13, w: 5, h: 5 }], texts: [{ x: 13, y: 1, w: 10, h: 11 }] },
      { id: "grid-7-t1-b", name: "Héros G., 6 & Récit D.", slots: [{ x: 1, y: 1, w: 11, h: 10 }, { x: 13, y: 1, w: 4, h: 4 }, { x: 18, y: 1, w: 4, h: 4 }, { x: 13, y: 6, w: 4, h: 4 }, { x: 18, y: 6, w: 4, h: 4 }, { x: 13, y: 11, w: 4, h: 4 }, { x: 18, y: 11, w: 4, h: 4 }], texts: [{ x: 1, y: 12, w: 11, h: 5 }] },
      { id: "grid-7-t1-c", name: "Frise & Journal Bas", slots: [{ x: 1, y: 1, w: 3, h: 5 }, { x: 5, y: 1, w: 3, h: 5 }, { x: 9, y: 1, w: 3, h: 5 }, { x: 13, y: 1, w: 3, h: 5 }, { x: 17, y: 1, w: 3, h: 5 }, { x: 21, y: 1, w: 3, h: 5 }, { x: 1, y: 7, w: 11, h: 5 }], texts: [{ x: 1, y: 13, w: 23, h: 4 }] },
      // 3 avec 2 zones de texte
      { id: "grid-7-t2-a", name: "Mosaïque & Doubles Notes G.", slots: [{ x: 9, y: 1, w: 7, h: 5 }, { x: 17, y: 1, w: 7, h: 5 }, { x: 9, y: 7, w: 7, h: 5 }, { x: 17, y: 7, w: 7, h: 5 }, { x: 1, y: 13, w: 7, h: 5 }, { x: 9, y: 13, w: 7, h: 5 }, { x: 17, y: 13, w: 7, h: 5 }], texts: [{ x: 1, y: 1, w: 7, h: 5 }, { x: 1, y: 7, w: 7, h: 5 }] },
      { id: "grid-7-t2-b", name: "Mosaïque & Notes Haut/Bas", slots: [{ x: 1, y: 4, w: 5, h: 5 }, { x: 7, y: 4, w: 5, h: 5 }, { x: 13, y: 4, w: 5, h: 5 }, { x: 19, y: 4, w: 5, h: 5 }, { x: 1, y: 10, w: 5, h: 5 }, { x: 7, y: 10, w: 5, h: 5 }, { x: 13, y: 10, w: 5, h: 5 }], texts: [{ x: 1, y: 15, w: 22, h: 3 }, { x: 1, y: 1, w: 22, h: 2 }] },
      { id: "grid-7-t2-c", name: "Cluster central & Notes", slots: [{ x: 7, y: 1, w: 10, h: 16 }, { x: 1, y: 1, w: 5, h: 4 }, { x: 1, y: 6, w: 5, h: 4 }, { x: 1, y: 11, w: 5, h: 4 }, { x: 18, y: 1, w: 5, h: 4 }, { x: 18, y: 6, w: 5, h: 4 }, { x: 18, y: 11, w: 5, h: 4 }], texts: [{ x: 1, y: 15, w: 5, h: 3 }, { x: 18, y: 15, w: 5, h: 3 }] }
    ]
  },
  {
    count: 8,
    name: "8 Photos",
    proposals: [
      { id: "grid-8-a", name: "Grille 4x2 Haute Densité", slots: [{ x: 1, y: 1, w: 5, h: 7 }, { x: 7, y: 1, w: 5, h: 7 }, { x: 13, y: 1, w: 5, h: 7 }, { x: 19, y: 1, w: 5, h: 7 }, { x: 1, y: 10, w: 5, h: 7 }, { x: 7, y: 10, w: 5, h: 7 }, { x: 13, y: 10, w: 5, h: 7 }, { x: 19, y: 10, w: 5, h: 7 }] },
      { id: "grid-8-b", name: "Frise Double Croisée", slots: [{ x: 2, y: 2, w: 6, h: 6 }, { x: 9, y: 2, w: 6, h: 6 }, { x: 16, y: 2, w: 6, h: 6 }, { x: 2, y: 10, w: 6, h: 6 }, { x: 9, y: 10, w: 6, h: 6 }, { x: 16, y: 10, w: 6, h: 6 }, { x: 5, y: 6, w: 14, h: 6 }] },
      // 3 avec 1 zone de texte
      { id: "grid-8-t1-a", name: "Grille 8 & Note Droite", slots: [{ x: 1, y: 1, w: 4, h: 4 }, { x: 6, y: 1, w: 4, h: 4 }, { x: 11, y: 1, w: 4, h: 4 }, { x: 1, y: 6, w: 4, h: 4 }, { x: 6, y: 6, w: 4, h: 4 }, { x: 11, y: 6, w: 4, h: 4 }, { x: 1, y: 11, w: 4, h: 4 }, { x: 6, y: 11, w: 4, h: 4 }], texts: [{ x: 16, y: 1, w: 8, h: 16 }] },
      { id: "grid-8-t1-b", name: "8 Blocs & Récit G.", slots: [{ x: 11, y: 1, w: 4, h: 4 }, { x: 16, y: 1, w: 4, h: 4 }, { x: 21, y: 1, w: 3, h: 4 }, { x: 11, y: 6, w: 4, h: 4 }, { x: 16, y: 6, w: 4, h: 4 }, { x: 21, y: 6, w: 3, h: 4 }, { x: 11, y: 11, w: 4, h: 4 }, { x: 16, y: 11, w: 4, h: 4 }], texts: [{ x: 1, y: 1, w: 9, h: 16 }] },
      { id: "grid-8-t1-c", name: "Double Frise & Note", slots: [{ x: 1, y: 1, w: 4, h: 5 }, { x: 6, y: 1, w: 4, h: 5 }, { x: 11, y: 1, w: 4, h: 5 }, { x: 16, y: 1, w: 4, h: 5 }, { x: 21, y: 1, w: 3, h: 5 }, { x: 1, y: 7, w: 4, h: 5 }, { x: 6, y: 7, w: 4, h: 5 }, { x: 11, y: 7, w: 4, h: 5 }], texts: [{ x: 1, y: 13, w: 23, h: 4 }] },
      // 3 avec 2 zones de texte
      { id: "grid-8-t2-a", name: "Cluster 8 & Doubles Notes G.", slots: [{ x: 9, y: 1, w: 4, h: 4 }, { x: 14, y: 1, w: 4, h: 4 }, { x: 19, y: 1, w: 5, h: 4 }, { x: 9, y: 6, w: 4, h: 4 }, { x: 14, y: 6, w: 4, h: 4 }, { x: 19, y: 6, w: 5, h: 4 }, { x: 9, y: 11, w: 4, h: 4 }, { x: 14, y: 11, w: 4, h: 4 }], texts: [{ x: 1, y: 1, w: 7, h: 8 }, { x: 1, y: 10, w: 7, h: 7 }] },
      { id: "grid-8-t2-b", name: "Frise Double & Notes", slots: [{ x: 1, y: 4, w: 5, h: 5 }, { x: 7, y: 4, w: 5, h: 5 }, { x: 13, y: 4, w: 5, h: 5 }, { x: 19, y: 4, w: 5, h: 5 }, { x: 1, y: 10, w: 5, h: 5 }, { x: 7, y: 10, w: 5, h: 5 }, { x: 13, y: 10, w: 5, h: 5 }, { x: 19, y: 10, w: 5, h: 5 }], texts: [{ x: 1, y: 1, w: 22, h: 2 }, { x: 1, y: 16, w: 22, h: 2 }] },
      { id: "grid-8-t2-c", name: "Grille 8 & Notes Latérales", slots: [{ x: 5, y: 1, w: 4, h: 4 }, { x: 10, y: 1, w: 4, h: 4 }, { x: 15, y: 1, w: 4, h: 4 }, { x: 5, y: 6, w: 4, h: 4 }, { x: 10, y: 6, w: 4, h: 4 }, { x: 15, y: 6, w: 4, h: 4 }, { x: 5, y: 11, w: 4, h: 4 }, { x: 10, y: 11, w: 4, h: 4 }], texts: [{ x: 1, y: 1, w: 3, h: 16 }, { x: 20, y: 1, w: 4, h: 16 }] }
    ]
  }
];
