export interface TextBox {
  id: string;
  text: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export function parseTextBoxes(description: string | null): TextBox[] {
  if (!description) return [];
  const trimmed = description.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      console.error('Failed to parse text boxes JSON, falling back to legacy single text box', e);
    }
  }
  // Fallback: If it's a legacy HTML description, convert to a single default movable text box
  if (trimmed) {
    return [{
      id: 'legacy',
      text: trimmed,
      x: 2,
      y: 2,
      w: 16,
      h: 6
    }];
  }
  return [];
}

export function serializeTextBoxes(boxes: TextBox[]): string {
  return JSON.stringify(boxes);
}
