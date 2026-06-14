export function getDefaultPhotoSlot(order: number) {
  if (order === 0) return { x: 2, y: 2, w: 10, h: 8 };
  if (order === 1) return { x: 13, y: 2, w: 10, h: 8 };
  if (order === 2) return { x: 2, y: 11, w: 10, h: 8 };
  if (order === 3) return { x: 13, y: 11, w: 10, h: 8 };
  return { x: 2 + (order % 4) * 4, y: 2 + Math.floor(order / 4) * 4, w: 8, h: 8 };
}
