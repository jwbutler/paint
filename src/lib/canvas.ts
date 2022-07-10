import { Colors, rgb2css } from './colors';
import type { Coordinates } from './types';
import type { RGB } from './colors';
// TODO write a .d.ts for this
// @ts-ignore
import bresenham from 'bresenham';

type DrawProps = {
  canvas: HTMLCanvasElement,
  coordinates: Coordinates,
  rgb: RGB
};

class CoordinatesHashSet {
  private readonly _set: Set<string>;
  
  constructor(...coordinates: Coordinates[]) {
    this._set = new Set<string>();
    this.add(...coordinates);
  }
  
  private encode = ({ x, y }: Coordinates): string => `${x},${y}`;
  private decode = (encoded: string) => ({
    x: parseInt(encoded.split(',')[0]),
    y: parseInt(encoded.split(',')[1]),
  });
  
  add = (...coordinates: Coordinates[]) => {
    for (const { x, y } of coordinates) {
      this._set.add(this.encode({ x, y }));
    }
  };

  contains = ({ x, y }: Coordinates) => this._set.has(this.encode({ x, y }));
  clear = () => this._set.clear();
  values = (): Coordinates[] => [...this._set.values()].map(encoded => this.decode(encoded));
  size = () => this._set.size;
}

const drawPoint = ({ canvas, coordinates: { x, y }, rgb }: DrawProps) => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.fillStyle = rgb2css(rgb);
  context.fillRect(Math.floor(x), Math.floor(y), 1, 1);
};

type LineProps = {
  canvas: HTMLCanvasElement,
  start: Coordinates,
  end: Coordinates,
  rgb: RGB
};

const drawLine = ({ canvas, start, end, rgb }: LineProps) => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.fillStyle = rgb2css(rgb);
  const line = bresenham(start.x, start.y, end.x, end.y);
  for (const point of line) {
    const coordinates = {
      x: Math.floor(point.x),
      y: Math.floor(point.y)
    };
    drawPoint({ canvas, coordinates, rgb });
  }
};

/**
 * Note - this is really slow.  Consider replacing the `visitedCoordinates` array with some sort of hash set.
 */
const fill = ({ canvas, coordinates: { x, y }, rgb }: DrawProps) => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const imageData = context.getImageData(x, y, 1, 1);
  const startColor: RGB = getColor(imageData, { x, y });
  const toFill = new CoordinatesHashSet({ x, y });
  const current = new CoordinatesHashSet({ x, y });
  context.fillStyle = rgb2css(rgb);
  
  const findFillableNeighbors = ({ x, y }: Coordinates): Coordinates[] => {
    return [{ x, y: y - 1 }, { x: x - 1, y }, { x: x + 1, y }, { x, y: y + 1 }]
      .filter(({ x, y }) => x >= 0 && y >= 0 && x < canvas.width && y < canvas.height)
      .filter(({ x, y }) => rgbEquals(getColor(imageData, { x, y }), startColor))
      .filter(({ x, y }) => !toFill.contains({ x, y }));
  };
  
  const t1 = new Date().getTime();
  let iterations = 0;
  let pointsProcessed = 0;
  for (true; true; iterations++) {
    pointsProcessed += current.size();
    const newNeighbors: Coordinates[] = [];
    for (const { x, y } of current.values()) {
      newNeighbors.push(...findFillableNeighbors({ x, y }));
    }
    if (newNeighbors.length === 0) {
      break;
    }
    current.clear();
    current.add(...newNeighbors);
    toFill.add(...newNeighbors);
  }
  console.log(`iterations: ${iterations}`);
  console.log(`points: ${pointsProcessed}`);
  const t2 = new Date().getTime();
  for (const { x, y } of toFill.values()) {
    drawPoint({ canvas, coordinates: { x, y }, rgb }); 
  }
  const t3 = new Date().getTime();
  console.log(`fill: ${t2 - t1} ${t3 - t2}`);
};

const getColor = (imageData: ImageData, { x, y }: Coordinates): RGB => {
  const [r, g, b] = imageData.data;
  return {
    red: r,
    green: g,
    blue: b
  };
};

const rgbEquals = (first: RGB, second: RGB): boolean =>
  first.red === second.red
  && first.green === second.green
  && first.blue === second.blue;

const clearCanvas = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.fillStyle = rgb2css(Colors.WHITE);
  context.fillRect(0, 0, canvas.width, canvas.height);
};

const saveImage = (canvas: HTMLCanvasElement) => {
  let filename: string | null = null;
  do {
    filename = prompt('Enter a filename');
  } while (!filename);
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL();
  link.click();
};

const loadImage = async (canvas: HTMLCanvasElement) => {
  const input = document.createElement('input') as HTMLInputElement;
  input.type = 'file';
  input.accept = 'image/png';
  input.onchange = () => {
    if (input.files) {
      const file = input.files[0];
      const url = window.URL.createObjectURL(file);
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      const img = document.createElement('img');
      img.src = url;
      img.addEventListener('load', () => {
        context.drawImage(img, 0, 0);
      });
    }
  };
  input.style.display = 'none';
  console.log(input);
  input.click();
};

export {
  clearCanvas,
  drawPoint,
  drawLine,
  fill,
  loadImage,
  saveImage
};
