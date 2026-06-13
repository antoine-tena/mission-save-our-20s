import { rgbToHsl, hslToHex } from './colorConverters';
import type { HSL } from './colorConverters';

/**
 * Loads an image from a URL and extracts its pixel HSL colors.
 */
export function extractImagePixels(url: string): Promise<HSL[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    // Bypass browser CORS cache issues by appending a cache bust parameter.
    const cacheBustUrl = url + (url.includes('?') ? '&' : '?') + 'cb=' + Date.now();
    img.src = cacheBustUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        // 16x16 is the perfect compromise between fast pixel reading and accurate color representation
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve([]);
          return;
        }

        ctx.drawImage(img, 0, 0, 16, 16);
        const imgData = ctx.getImageData(0, 0, 16, 16).data;

        const pixels: HSL[] = [];
        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];
          
          if (a >= 200) { // Only analyze fully opaque pixels
            pixels.push(rgbToHsl(r, g, b));
          }
        }
        resolve(pixels);
      } catch (err) {
        console.error('Error drawing image for color extraction:', err);
        resolve([]);
      }
    };

    img.onerror = (err) => {
      console.warn('Could not load image for color extraction:', url, err);
      resolve([]);
    };
  });
}

/**
 * Calculates the best aesthetic background color (pastel) for a list of image URLs.
 * Uses a dominant hue histogram clustering algorithm over all pixels of all images on the spread.
 */
export async function getBestBackgroundForImages(urls: string[]): Promise<string> {
  if (urls.length === 0) {
    return '#FFFFFF';
  }

  try {
    const allImagesPixels = await Promise.all(urls.map(url => extractImagePixels(url)));
    const flatPixels = allImagesPixels.flat();

    if (flatPixels.length === 0) {
      return '#FFFFFF';
    }

    // Build a histogram of hues (36 bins of 10 degrees each)
    const binsCount = 36;
    const hueHistogram = new Array(binsCount).fill(0);
    const hueValues = new Array(binsCount).fill(0).map(() => [] as number[]);
    
    let sumS = 0;
    let sumL = 0;

    for (const px of flatPixels) {
      sumS += px.s;
      sumL += px.l;

      // No pixel-level filtering: bin all pixels directly
      const binIndex = Math.floor(px.h / 10) % binsCount;
      hueHistogram[binIndex]++;
      hueValues[binIndex].push(px.h);
    }

    // If the images are mostly neutral or grayscale (very low saturation), return pure white (#FFFFFF)
    const avgS = sumS / flatPixels.length;
    if (avgS < 0.15) {
      return '#FFFFFF';
    }

    // Find the most dominant hue bin
    let maxBinIndex = -1;
    let maxBinCount = 0;
    for (let i = 0; i < binsCount; i++) {
      if (hueHistogram[i] > maxBinCount) {
        maxBinCount = hueHistogram[i];
        maxBinIndex = i;
      }
    }

    let finalH = 0;
    const pastelS = 0.28;
    const pastelL = 0.88;

    if (maxBinIndex !== -1 && maxBinCount > 0) {
      // Calculate the average hue in the winning bin to avoid binned/rounding offsets
      const winningHues = hueValues[maxBinIndex];
      const sumH = winningHues.reduce((acc, val) => acc + val, 0);
      finalH = sumH / winningHues.length;
    } else {
      return '#FFFFFF';
    }

    return hslToHex(finalH, pastelS, pastelL);
  } catch (err) {
    console.error('Failed to calculate best background color:', err);
    return '#FFFFFF';
  }
}
