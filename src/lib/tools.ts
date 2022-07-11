import { clearCanvas, drawBox, drawLine, drawPoint, drawRect, fill } from './canvas';
import { RGB } from './colors';
import { MouseButton } from './events';
import { Coordinates } from './geometry';

type ToolType = 'draw' | 'line' | 'fill' | 'box' | 'rect';

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

class DrawTool implements Tool {
  private lastCoordinates: Coordinates | null = null;

  /** @override */
  handleMouseDown = (props: HandlerProps): void => {};
  
  /** @override */
  handleMouseUp = ({ buttons, coordinates, mainCanvas, scratchCanvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (buttons.includes('left')) {
      drawPoint({ canvas: mainCanvas, coordinates, rgb: foregroundColor });
    } else if (buttons.includes('right')) {
      drawPoint({ canvas: mainCanvas, coordinates, rgb: backgroundColor });
    }
    this.lastCoordinates = null;
  };
  
  /** @override */
  handleMouseMove = ({ buttons, coordinates, mainCanvas, scratchCanvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (buttons.includes('left')) {
      if (this.lastCoordinates) {
        drawLine({ canvas: mainCanvas, start: this.lastCoordinates, end: coordinates, rgb: foregroundColor });
      } else {
        drawPoint({ canvas: mainCanvas, coordinates, rgb: foregroundColor });
      }
    } else if (buttons.includes('right')) {
      if (this.lastCoordinates) {
        drawLine({ canvas: mainCanvas, start: this.lastCoordinates, end: coordinates, rgb: backgroundColor });
      } else {
        drawPoint({ canvas: mainCanvas, coordinates, rgb: backgroundColor });
      }
    }
    this.lastCoordinates = coordinates;
  };
  
  /** @override */
  handleMouseEnter = ({ coordinates }: HandlerProps) => {
    this.lastCoordinates = coordinates;
  };
  
  /** @override */
  handleMouseLeave = (props: HandlerProps) => {
    this.lastCoordinates = null;
  };
}

class LineTool implements Tool {
  private startCoordinates: Coordinates | null = null;
  
  /** @override */
  handleMouseDown = ({ coordinates }: HandlerProps) => {
    this.startCoordinates = coordinates;
  };

  /** @override */
  handleMouseUp = ({ buttons, coordinates, mainCanvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (this.startCoordinates !== null) {
      if (buttons.includes('left')) {
        drawLine({ canvas: mainCanvas, start: this.startCoordinates, end: coordinates, rgb: foregroundColor });
      } else if (buttons.includes('right')) {
        drawLine({ canvas: mainCanvas, start: this.startCoordinates, end: coordinates, rgb: backgroundColor });
      }
    }
    this.startCoordinates = null;
  };
  
  /** @override */
  handleMouseMove = ({ buttons, coordinates, scratchCanvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (this.startCoordinates !== null) {
      if (buttons.includes('left')) {
        clearCanvas(scratchCanvas);
        drawLine({ canvas: scratchCanvas, start: this.startCoordinates, end: coordinates, rgb: foregroundColor });
      } else if (buttons.includes('right')) {
        clearCanvas(scratchCanvas);
        drawLine({ canvas: scratchCanvas, start: this.startCoordinates, end: coordinates, rgb: backgroundColor });
      }
    }
  };
  
  /** @override */
  handleMouseEnter = (props: HandlerProps) => {};
  
  /** @override */
  handleMouseLeave = (props: HandlerProps) => {};
}

class BoxTool implements Tool {
  private startCoordinates: Coordinates | null = null;
  
  /** @override */
  handleMouseDown = ({ coordinates }: HandlerProps) => {
    this.startCoordinates = coordinates;
  };

  /** @override */
  handleMouseUp = ({ buttons, coordinates, mainCanvas, scratchCanvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (this.startCoordinates !== null) {
      if (buttons.includes('left')) {
        drawBox({ canvas: mainCanvas, start: this.startCoordinates, end: coordinates, rgb: foregroundColor });
      } else if (buttons.includes('right')) {
        drawBox({ canvas: mainCanvas, start: this.startCoordinates, end: coordinates, rgb: backgroundColor });
      }
    }
    this.startCoordinates = null;
  };
  
  /** @override */
  handleMouseMove = ({ buttons, coordinates, scratchCanvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (this.startCoordinates !== null) {
      if (buttons.includes('left')) {
        clearCanvas(scratchCanvas);
        drawBox({ canvas: scratchCanvas, start: this.startCoordinates, end: coordinates, rgb: foregroundColor });
      } else if (buttons.includes('right')) {
        clearCanvas(scratchCanvas);
        drawBox({ canvas: scratchCanvas, start: this.startCoordinates, end: coordinates, rgb: backgroundColor });
      }
    }
  };
  
  /** @override */
  handleMouseEnter = (props: HandlerProps) => {};
  
  /** @override */
  handleMouseLeave = (props: HandlerProps) => {};
}

class RectTool implements Tool {
  private startCoordinates: Coordinates | null = null;
  
  /** @override */
  handleMouseDown = ({ coordinates }: HandlerProps) => {
    this.startCoordinates = coordinates;
  };

  /** @override */
  handleMouseUp = ({ buttons, coordinates, mainCanvas, scratchCanvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (this.startCoordinates !== null) {
      if (buttons.includes('left')) {
        drawRect({ canvas: mainCanvas, start: this.startCoordinates, end: coordinates, rgb: foregroundColor });
      } else if (buttons.includes('right')) {
        drawRect({ canvas: mainCanvas, start: this.startCoordinates, end: coordinates, rgb: backgroundColor });
      }
    }
    this.startCoordinates = null;
  };
  
  /** @override */
  handleMouseMove = ({ buttons, coordinates, scratchCanvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (this.startCoordinates !== null) {
      if (buttons.includes('left')) {
        clearCanvas(scratchCanvas);
        drawRect({ canvas: scratchCanvas, start: this.startCoordinates, end: coordinates, rgb: foregroundColor });
      } else if (buttons.includes('right')) {
        clearCanvas(scratchCanvas);
        drawRect({ canvas: scratchCanvas, start: this.startCoordinates, end: coordinates, rgb: backgroundColor });
      }
    }
  };
  
  /** @override */
  handleMouseEnter = (props: HandlerProps) => {};
  
  /** @override */
  handleMouseLeave = (props: HandlerProps) => {};
}

class FillTool implements Tool {
  /** @override */
  handleMouseDown = (props: HandlerProps) => {};

  /** @override */
  handleMouseUp = ({ buttons, coordinates, mainCanvas, scratchCanvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (buttons.includes('left')) {
      fill({ canvas: mainCanvas, coordinates, rgb: foregroundColor });
    } else if (buttons.includes('right')) {
      fill({ canvas: mainCanvas, coordinates, rgb: backgroundColor });
    }
  };
  
  /** @override */
  handleMouseMove = (props: HandlerProps) => {};
  
  /** @override */
  handleMouseEnter = (props: HandlerProps) => {};
  
  /** @override */
  handleMouseLeave = (props: HandlerProps) => {};
}

export {
  type ToolType,
  type Tool,
  BoxTool,
  DrawTool,
  FillTool,
  LineTool,
  RectTool
};
