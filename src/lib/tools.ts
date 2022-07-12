import { RGB } from './colors';
import { MouseButton } from './events';
import { Coordinates } from './geometry';
import BoxTool from './tools/BoxTool';
import DrawTool from './tools/DrawTool';
import FillTool from './tools/FillTool';
import LineTool from './tools/LineTool';
import RectTool from './tools/RectTool';

type ToolType = 'box' | 'draw' | 'ellipse' | 'fill' | 'line' | 'rect';

type HandlerProps = {
  buttons: MouseButton[],
  coordinates: Coordinates,
  mainCanvas: HTMLCanvasElement,
  scratchCanvas: HTMLCanvasElement,
  foregroundColor: RGB,
  backgroundColor: RGB
};

type Handler = (props: HandlerProps) => void;

interface Tool {
  handleMouseDown: Handler;
  handleMouseUp: Handler;
  handleMouseMove: Handler;
  handleMouseEnter: Handler;
  handleMouseLeave: Handler;
}

export {
  type ToolType,
  type Tool,
  type HandlerProps,
  BoxTool,
  DrawTool,
  FillTool,
  LineTool,
  RectTool
};
