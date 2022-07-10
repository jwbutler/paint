import { Colors, type RGB } from './colors';
import { type Dimensions } from './geometry';
import { type ToolType } from './tools';

const initialDimensions: Dimensions = { width: 80, height: 80 };
const initialTool: ToolType = 'draw';
const initialForegroundColor: RGB = Colors.BLACK;
const initialBackgroundColor: RGB = Colors.WHITE;
const initialZoomLevel = 4;

export {
  initialBackgroundColor,
  initialDimensions,
  initialForegroundColor,
  initialTool,
  initialZoomLevel
};
