import React, { useState } from 'react';
import { drawLine, drawPoint, fill } from '../lib/canvas';
import { RGB } from '../lib/colors';
import { getMouseButtons, MouseButton } from '../lib/events';
import { Coordinates, Dimensions, Tool } from '../lib/types';
import Canvas, { CallbackProps, CallbackProps as CanvasCallbackProps } from './Canvas';

type Props = {
  buttons: MouseButton[],
  setButtons: (buttons: MouseButton[]) => void;
  dimensions: Dimensions,
  foregroundColor: RGB,
  backgroundColor: RGB,
  tool: Tool,
  zoomLevel: number
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
  const [lastCoordinates, setLastCoordinates] = useState<Coordinates | null>(null);
  const [lineStart, setLineStart] = useState<Coordinates | null>(null);

  const handleMouseDown = ({ event, coordinates }: CanvasCallbackProps) => {
    const buttons = getMouseButtons(event);
    setButtons(buttons);
    switch (tool) {
      case 'line':
        setLineStart(coordinates);
    }
  };

  const handleMouseUp = ({ event, canvas, coordinates }: CanvasCallbackProps) => {
    switch (tool) {
      case 'draw':
        if (buttons.includes('left')) {
          drawPoint({ canvas, coordinates, rgb: foregroundColor });
        } else if (buttons.includes('right')) {
          drawPoint({ canvas, coordinates, rgb: backgroundColor });
        }
        break;
      case 'line':
        if (lineStart !== null) {
          if (buttons.includes('left')) {
            drawLine({ canvas, start: lineStart, end: coordinates, rgb: foregroundColor });
          } else if (buttons.includes('right')) {
            drawLine({ canvas, start: lineStart, end: coordinates, rgb: backgroundColor });
          }
        }
        setLineStart(null);
        break;
      case 'fill':
        if (buttons.includes('left')) {
          fill({ canvas, coordinates, rgb: foregroundColor });
        } else if (buttons.includes('right')) {
          fill({ canvas, coordinates, rgb: backgroundColor });
        }
        break;
    }
    setButtons(getMouseButtons(event));
    setLastCoordinates(null);
  };

  const handleMouseMove = ({ event, canvas, coordinates }: CanvasCallbackProps) => {
    const buttons = getMouseButtons(event);
    switch (tool) {
      case 'draw':
        if (buttons.includes('left')) {
          if (lastCoordinates) {
            drawLine({ canvas, start: lastCoordinates, end: coordinates, rgb: foregroundColor });
          } else {
            drawPoint({ canvas, coordinates, rgb: foregroundColor });
          }
        } else if (buttons.includes('right')) {
          if (lastCoordinates) {
            drawLine({ canvas, start: lastCoordinates, end: coordinates, rgb: backgroundColor });
          } else {
            drawPoint({ canvas, coordinates, rgb: backgroundColor });
          }
        }
        setLastCoordinates(coordinates);
    }
  };
  
  const handleMouseEnter = ({ coordinates }: CallbackProps) => {
    setLastCoordinates(coordinates);
  };
  
  const handleMouseLeave = () => {
    setLastCoordinates(null);
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
