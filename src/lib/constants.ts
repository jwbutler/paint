import { Colors, type RGB } from './colors';
import { type Dimensions } from './geometry';
import { type ToolType } from './tools';
import { ZoomLevel } from './zoom';

const initialDimensions: Dimensions = { width: 80, height: 80 };
const initialTool: ToolType = 'draw';
const initialForegroundColor: RGB = Colors.BLACK;
const initialBackgroundColor: RGB = Colors.WHITE;
const initialZoomLevel: ZoomLevel = '400%';

const mainCanvasId = 'main-canvas';
const scratchCanvasId = 'scratch-canvas';

export {
  initialBackgroundColor,
  initialDimensions,
  initialForegroundColor,
  initialTool,
  initialZoomLevel,
  mainCanvasId,
  scratchCanvasId
};
