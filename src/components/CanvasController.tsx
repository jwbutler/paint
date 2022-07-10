import React from 'react';
import { RGB } from '../lib/colors';
import { getMouseButtons, MouseButton } from '../lib/events';
import { type Dimensions } from '../lib/geometry';
import { BoxTool, DrawTool, FillTool, LineTool, RectTool, Tool, type ToolType } from '../lib/tools';
import { ZoomLevel } from '../lib/zoom';
import Canvas, { CallbackProps as CanvasCallbackProps } from './Canvas';

const drawTool = new DrawTool();
const lineTool = new LineTool();
const boxTool = new BoxTool();
const rectTool = new RectTool();
const fillTool = new FillTool();

const getTool = (tool: ToolType): Tool => {
  switch (tool) {
    case 'draw': return drawTool;
    case 'line': return lineTool;
    case 'box':  return boxTool;
    case 'rect': return rectTool;
    case 'fill': return fillTool;
  }
};

type Props = {
  buttons: MouseButton[],
  setButtons: (buttons: MouseButton[]) => void;
  dimensions: Dimensions,
  foregroundColor: RGB,
  backgroundColor: RGB,
  tool: ToolType,
  zoomLevel: ZoomLevel
}

const CanvasController = ({
  buttons,
  setButtons,
  dimensions,
  foregroundColor,
  backgroundColor,
  tool,
  zoomLevel
}: Props) => {
  const handleMouseDown = ({ event, canvas, coordinates }: CanvasCallbackProps) => {
    const buttons = getMouseButtons(event);
    setButtons(buttons);

    getTool(tool).handleMouseDown({ coordinates, canvas, buttons, foregroundColor, backgroundColor });
  };

  const handleMouseUp = ({ event, canvas, coordinates }: CanvasCallbackProps) => {
    getTool(tool).handleMouseUp({ coordinates, canvas, buttons, foregroundColor, backgroundColor });
    setButtons(getMouseButtons(event));
  };

  const handleMouseMove = ({ event, canvas, coordinates }: CanvasCallbackProps) => {
    const buttons = getMouseButtons(event);
    getTool(tool).handleMouseMove({ buttons, canvas, coordinates, foregroundColor, backgroundColor });
  };
  
  const handleMouseEnter = ({ event, canvas, coordinates }: CanvasCallbackProps) => {
    const buttons = getMouseButtons(event);
    getTool(tool).handleMouseEnter({ buttons, canvas, coordinates, foregroundColor, backgroundColor });
  };
  
  const handleMouseLeave = ({ event, canvas, coordinates }: CanvasCallbackProps) => {
    const buttons = getMouseButtons(event);
    getTool(tool).handleMouseLeave({ buttons, canvas, coordinates, foregroundColor, backgroundColor });
  };
  
  return (
    <Canvas
      width={dimensions.width}
      height={dimensions.height}
      zoomLevel={zoomLevel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default CanvasController;
