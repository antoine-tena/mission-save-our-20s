/**
 * Utility to extract dominant/average colors from images and transform them into gorgeous pastel backgrounds.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

export function hslToHex(h: number, s: number, l: number): string {
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}

/**
 * Loads an image from a URL and extracts its average color.
 */
export function extractAverageColor(url: string): Promise<RGB> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ r: 255, g: 255, b: 255 });
          return;
        }

        ctx.drawImage(img, 0, 0, 16, 16);
        const imgData = ctx.getImageData(0, 0, 16, 16).data;

        let rSum = 0, gSum = 0, bSum = 0, count = 0;
        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];
          
          if (a >= 200) { // Only analyze fully opaque pixels
            rSum += r;
            gSum += g;
            bSum += b;
            count++;
          }
        }

        if (count > 0) {
          resolve({
            r: Math.round(rSum / count),
            g: Math.round(gSum / count),
            b: Math.round(bSum / count)
          });
        } else {
          resolve({ r: 255, g: 255, b: 255 });
        }
      } catch (err) {
        console.error('Error drawing image for color analysis:', err);
        resolve({ r: 255, g: 255, b: 255 });
      }
    };

    img.onerror = (err) => {
      console.warn('Could not load image for color analysis (CORS or network error):', url, err);
      // Fallback to white gracefully
      resolve({ r: 255, g: 255, b: 255 });
    };
  });
}

/**
 * Calculates the best aesthetic background color (pastel) for a list of image URLs.
 */
export async function getBestBackgroundForImages(urls: string[]): Promise<string> {
  if (urls.length === 0) {
    return '#FFFFFF';
  }

  try {
    const rgbColors = await Promise.all(urls.map(url => extractAverageColor(url)));
    
    // Average the colors of all images
    let rSum = 0, gSum = 0, bSum = 0;
    for (const color of rgbColors) {
      rSum += color.r;
      gSum += color.g;
      bSum += color.b;
    }
    
    const finalR = Math.round(rSum / rgbColors.length);
    const finalG = Math.round(gSum / rgbColors.length);
    const finalB = Math.round(bSum / rgbColors.length);

    // Convert to HSL
    const { h, s, l } = rgbToHsl(finalR, finalG, finalB);

    // Make it a beautiful soft pastel color
    // Saturation around 12% - 18% is ideal for subtle background
    // Lightness around 95% is perfect for clean, high-end look
    const pastelS = 0.15; 
    const pastelL = 0.95;

    return hslToHex(h, pastelS, pastelL);
  } catch (err) {
    console.error('Failed to calculate best background color:', err);
    return '#FFFFFF';
  }
}
