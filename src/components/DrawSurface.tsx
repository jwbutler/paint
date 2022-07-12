import { Colors, RGB } from '../lib/colors';
import { mainCanvasId, scratchCanvasId } from '../lib/constants';
import { getMouseButtons, MouseButton } from '../lib/events';
import { type Dimensions } from '../lib/geometry';
import { HistoryEvent } from '../lib/history';
import { type Tool, type ToolType } from '../lib/tools';
import BoxTool from '../lib/tools/BoxTool';
import DrawTool from '../lib/tools/DrawTool';
import EllipseTool from '../lib/tools/EllipseTool';
import FillTool from '../lib/tools/FillTool';
import LineTool from '../lib/tools/LineTool';
import RectTool from '../lib/tools/RectTool';
import { ZoomLevel, zoomLevelAsNumber } from '../lib/zoom';
import Canvas from './Canvas';
import MouseEventSurface, { EventHandlerProps } from './MouseEventSurface';
import styles from './DrawSurface.module.css';

const drawTool = new DrawTool();
const lineTool = new LineTool();
const boxTool = new BoxTool();
const rectTool = new RectTool();
const ellipseTool = new EllipseTool();
const fillTool = new FillTool();

const getTool = (tool: ToolType): Tool => {
  switch (tool) {
    case 'draw':    return drawTool;
    case 'line':    return lineTool;
    case 'box':     return boxTool;
    case 'rect':    return rectTool;
    case 'ellipse': return ellipseTool;
    case 'fill':    return fillTool;
  }
};

type Props = {
  buttons: MouseButton[],
  setButtons: (buttons: MouseButton[]) => void;
  dimensions: Dimensions,
  foregroundColor: RGB,
  backgroundColor: RGB,
  tool: ToolType,
  zoomLevel: ZoomLevel,
  addHistoryEvent: (event: HistoryEvent) => void
};

const DrawSurface = ({
  buttons,
  setButtons,
  dimensions,
  foregroundColor,
  backgroundColor,
  tool,
  zoomLevel,
  addHistoryEvent
}: Props) => {
  const handleMouseDown = ({ event, coordinates, mainCanvas, scratchCanvas }: EventHandlerProps) => {
    const buttons = getMouseButtons(event);
    setButtons(buttons);

    const context = mainCanvas.getContext('2d') as CanvasRenderingContext2D;
    const imageData = context.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
    addHistoryEvent({ imageData });
    getTool(tool).handleMouseDown({ coordinates, mainCanvas, scratchCanvas, buttons, foregroundColor, backgroundColor });
  };

  const handleMouseUp = ({ event, mainCanvas, scratchCanvas, coordinates }: EventHandlerProps) => {
    getTool(tool).handleMouseUp({ coordinates, mainCanvas, scratchCanvas, buttons, foregroundColor, backgroundColor });
    setButtons(getMouseButtons(event));
  };

  const handleMouseMove = ({ event, mainCanvas, scratchCanvas, coordinates }: EventHandlerProps) => {
    const buttons = getMouseButtons(event);
    getTool(tool).handleMouseMove({ coordinates, mainCanvas, scratchCanvas, buttons, foregroundColor, backgroundColor });
  };
  
  const handleMouseEnter = ({ event, mainCanvas, scratchCanvas, coordinates }: EventHandlerProps) => {
    const buttons = getMouseButtons(event);
    getTool(tool).handleMouseEnter({ coordinates, mainCanvas, scratchCanvas, buttons, foregroundColor, backgroundColor });
  };
  
  const handleMouseLeave = ({ event, mainCanvas, scratchCanvas, coordinates }: EventHandlerProps) => {
    const buttons = getMouseButtons(event);
    getTool(tool).handleMouseLeave({ coordinates, mainCanvas, scratchCanvas, buttons, foregroundColor, backgroundColor });
  };
  
  const multiplier = zoomLevelAsNumber(zoomLevel);
  
  return (
    <div
      className={styles.drawSurface}
      style={{
        width: `${dimensions.width * multiplier}px`,
        height: `${dimensions.height * multiplier}px`
      }}
    >
      <Canvas
        id={mainCanvasId}
        width={dimensions.width}
        height={dimensions.height}
        zoomLevel={zoomLevel}
        backgroundColor={Colors.WHITE}
      />
      <Canvas
        id={scratchCanvasId}
        width={dimensions.width}
        height={dimensions.height}
        zoomLevel={zoomLevel}
      />
      <MouseEventSurface
        width={dimensions.width}
        height={dimensions.height}
        zoomLevel={zoomLevel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default DrawSurface;
