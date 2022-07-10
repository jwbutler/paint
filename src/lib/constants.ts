import { Colors, type RGB } from './colors';
import { Dimensions, Tool } from './types';

const initialDimensions: Dimensions = { width: 80, height: 80 };
const initialTool: Tool = 'draw';
const initialForegroundColor: RGB = Colors.BLACK;
const initialBackgroundColor: RGB = Colors.WHITE;
const initialZoomLevel = 2;

export {
  initialBackgroundColor,
  initialDimensions,
  initialForegroundColor,
  initialTool,
  initialZoomLevel
};
