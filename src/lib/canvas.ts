import type { Coordinates } from './types';
import type { RGB } from './colors';

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
  
  add = (...coordinates: Coordinates[]) => {
    for (const { x, y } of coordinates) {
      this._set.add(JSON.stringify({ x, y }));
    }
  };

  contains = (coordinates: Coordinates) => this._set.has(JSON.stringify(coordinates));
  clear = () => this._set.clear();
  values = (): Coordinates[] => [...this._set.values()].map(json => JSON.parse(json));
}

const draw = ({ canvas, coordinates: { x, y }, rgb: { red, green, blue } }: DrawProps) => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
  context.fillRect(x, y, 1, 1);
};

/**
 * Note - this is really slow.  Consider replacing the `visitedCoordinates` array with some sort of hash set.
 */
const fill = ({ canvas, coordinates: { x, y }, rgb }: DrawProps) => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const { red, green, blue } = rgb;
  context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
  const startColor: RGB = getColor(canvas, { x, y });
  const visitedCoordinates = new CoordinatesHashSet({ x, y });
  const current = new CoordinatesHashSet({ x, y });
  
  const findFillableNeighbors = ({ x, y }: Coordinates): Coordinates[] => {
    return [{ x, y: y - 1 }, { x: x - 1, y }, { x: x + 1, y }, { x, y: y + 1 }]
      .filter(({ x, y }) => x >= 0 && y >= 0 && x < canvas.width && y < canvas.height)
      .filter(({ x, y }) => rgbEquals(getColor(canvas, { x, y }), startColor))
      .filter(({ x, y }) => !visitedCoordinates.contains({ x, y }));
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
    visitedCoordinates.add(...newNeighbors);
  }
  
  for (const { x, y } of visitedCoordinates.values()) {
    draw({ canvas, coordinates: { x, y }, rgb }); 
  }
};

const getColor = (canvas: HTMLCanvasElement, { x, y }: Coordinates): RGB => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const imageData = context.getImageData(x, y, 1, 1);
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

export {
  draw,
  fill
};
