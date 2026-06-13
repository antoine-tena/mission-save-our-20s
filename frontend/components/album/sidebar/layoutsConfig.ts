export const layoutOptions = [
  { id: 'text-only', name: 'Mode Récit / Texte', desc: 'Une page sans photos dédiée à l\'écriture de vos souvenirs.', icon: 'lucide:align-left' },
  { id: 'grid-1', name: '1 Grande Photo', desc: 'Une seule photo plein format pour mettre en valeur un moment unique.', icon: 'lucide:image' },
  { id: 'grid-2', name: '2 Photos', desc: 'Deux photos disposées pour un équilibre parfait.', icon: 'lucide:grid' },
  { id: 'grid-3', name: '3 Photos', desc: 'Une photo principale et deux photos d\'accompagnement.', icon: 'lucide:layout-grid' },
  { id: 'grid-4', name: '4 Photos Grid', desc: 'Quatre photos présentées dans une grille dynamique.', icon: 'lucide:layout-grid' },
  { id: 'grid-5', name: '5 Photos Collage', desc: 'Une belle mosaïque pour capturer toutes les facettes d\'un événement.', icon: 'lucide:layout-grid' },
  { id: 'grid-6', name: '6 Photos Mosaic', desc: 'Mise en page haute densité pour raconter une histoire complète.', icon: 'lucide:layout-grid' }
];

export const layoutPresetsConfig: Record<string, { x: number; y: number; w: number; h: number }[]> = {
  'grid-1': [{ x: 2, y: 1, w: 20, h: 16 }],
  'grid-2': [{ x: 1, y: 3, w: 10, h: 12 }, { x: 13, y: 3, w: 10, h: 12 }],
  'grid-3': [{ x: 1, y: 3, w: 11, h: 12 }, { x: 13, y: 2, w: 10, h: 7 }, { x: 13, y: 10, w: 10, h: 7 }],
  'grid-4': [{ x: 1, y: 1, w: 10, h: 7 }, { x: 13, y: 1, w: 10, h: 7 }, { x: 1, y: 10, w: 10, h: 7 }, { x: 13, y: 10, w: 10, h: 7 }],
  'grid-5': [{ x: 1, y: 1, w: 10, h: 7 }, { x: 13, y: 1, w: 10, h: 7 }, { x: 1, y: 10, w: 7, h: 7 }, { x: 9, y: 10, w: 7, h: 7 }, { x: 17, y: 10, w: 7, h: 7 }],
  'grid-6': [{ x: 1, y: 1, w: 7, h: 7 }, { x: 9, y: 1, w: 7, h: 7 }, { x: 17, y: 1, w: 7, h: 7 }, { x: 1, y: 10, w: 7, h: 7 }, { x: 9, y: 10, w: 7, h: 7 }, { x: 17, y: 10, w: 7, h: 7 }]
};
