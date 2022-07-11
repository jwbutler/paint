import type { RGB } from './colors';
import type { MouseButton } from './events';
import type { Coordinates } from './geometry';

type ToolType = 'draw' | 'line' | 'box' | 'rect' | 'ellipse' | 'fill';

type HandlerProps = {
  buttons: MouseButton[],
  coordinates: Coordinates,
  mainCanvas: HTMLCanvasElement,
  scratchCanvas: HTMLCanvasElement,
  foregroundColor: RGB,
  backgroundColor: RGB
};

type MouseEventHandler = (props: HandlerProps) => void;

interface Tool {
  handleMouseDown: MouseEventHandler;
  handleMouseUp: MouseEventHandler;
  handleMouseMove: MouseEventHandler;
  handleMouseEnter: MouseEventHandler;
  handleMouseLeave: MouseEventHandler;
}

export {
  type MouseEventHandler,
  type HandlerProps,
  type ToolType,
  type Tool
};
