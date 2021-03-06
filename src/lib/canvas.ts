import { rgb2css } from './colors';
import type { Coordinates } from './geometry';
import type { RGB } from './colors';
// TODO write a .d.ts for this
// @ts-ignore
import { line as rasterLine, ellipse as rasterEllipse } from 'bresenham-zingl';

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
  rasterLine(
    start.x,
    start.y,
    end.x,
    end.y,
    (x: number, y: number) => drawPoint({ canvas, coordinates: { x, y }, rgb })
  );
};

const drawBox = ({ canvas, start, end, rgb }: LineProps) => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.fillStyle = rgb2css(rgb);
  drawLine({ canvas, start: { x: start.x, y: start.y }, end: { x: end.x, y: start.y }, rgb });
  drawLine({ canvas, start: { x: end.x, y: start.y }, end: { x: end.x, y: end.y }, rgb });
  drawLine({ canvas, start: { x: end.x, y: end.y }, end: { x: start.x, y: end.y }, rgb });
  drawLine({ canvas, start: { x: start.x, y: end.y }, end: { x: start.x, y: start.y }, rgb });
};

const drawRect = ({ canvas, start, end, rgb }: LineProps) => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.fillStyle = rgb2css(rgb);
  context.fillRect(start.x, start.y, end.x - start.x + 1, end.y - start.y + 1);
};

const drawEllipse = ({ canvas, start, end, rgb }: LineProps) => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.strokeStyle = rgb2css(rgb);
  const centerX = (start.x + end.x) / 2;
  const centerY = (start.y + end.y) / 2;
  const radiusX = Math.abs(end.x - start.x) / 2;
  const radiusY = Math.abs(end.y - start.y) / 2;
  
  rasterEllipse(
    centerX,
    centerY,
    radiusX,
    radiusY,
    (x: number, y: number) => drawPoint({ canvas, coordinates: { x, y }, rgb })
  );
};

/**
 * Note - this is really slow.  Consider replacing the `visitedCoordinates` array with some sort of hash set.
 */
const fill = ({ canvas, coordinates: { x, y }, rgb }: DrawProps) => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
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
  
  while (true) {
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
  for (const { x, y } of toFill.values()) {
    drawPoint({ canvas, coordinates: { x, y }, rgb }); 
  }
};

const getColor = (imageData: ImageData, { x, y }: Coordinates): RGB => {
  const index = (y * imageData.width + x) * 4;
  const [r, g, b] = imageData.data.slice(index, index + 4);
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
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const fillCanvas = (canvas: HTMLCanvasElement, color: RGB) => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.fillStyle = rgb2css(color);
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
  drawBox,
  drawEllipse,
  drawLine,
  drawRect,
  drawPoint,
  fill,
  fillCanvas,
  loadImage,
  saveImage
};
