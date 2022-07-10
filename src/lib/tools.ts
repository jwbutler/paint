import { drawBox, drawLine, drawPoint, drawRect, fill } from './canvas';
import { RGB } from './colors';
import { MouseButton } from './events';
import { Coordinates } from './geometry';

type ToolType = 'draw' | 'line' | 'fill' | 'box' | 'rect';

type HandlerProps = {
  buttons: MouseButton[],
  coordinates: Coordinates,
  canvas: HTMLCanvasElement,
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
  handleMouseUp = ({ buttons, coordinates, canvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (buttons.includes('left')) {
      drawPoint({ canvas, coordinates, rgb: foregroundColor });
    } else if (buttons.includes('right')) {
      drawPoint({ canvas, coordinates, rgb: backgroundColor });
    }
    this.lastCoordinates = null;
  };
  
  /** @override */
  handleMouseMove = ({ buttons, coordinates, canvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (buttons.includes('left')) {
      if (this.lastCoordinates) {
        drawLine({ canvas, start: this.lastCoordinates, end: coordinates, rgb: foregroundColor });
      } else {
        drawPoint({ canvas, coordinates, rgb: foregroundColor });
      }
    } else if (buttons.includes('right')) {
      if (this.lastCoordinates) {
        drawLine({ canvas, start: this.lastCoordinates, end: coordinates, rgb: backgroundColor });
      } else {
        drawPoint({ canvas, coordinates, rgb: backgroundColor });
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
  handleMouseUp = ({ buttons, coordinates, canvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (this.startCoordinates !== null) {
      if (buttons.includes('left')) {
        drawLine({ canvas, start: this.startCoordinates, end: coordinates, rgb: foregroundColor });
      } else if (buttons.includes('right')) {
        drawLine({ canvas, start: this.startCoordinates, end: coordinates, rgb: backgroundColor });
      }
    }
    this.startCoordinates = null;
  };
  
  /** @override */
  handleMouseMove = (props: HandlerProps) => {};
  
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
  handleMouseUp = ({ buttons, coordinates, canvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (this.startCoordinates !== null) {
      if (buttons.includes('left')) {
        drawBox({ canvas, start: this.startCoordinates, end: coordinates, rgb: foregroundColor });
      } else if (buttons.includes('right')) {
        drawBox({ canvas, start: this.startCoordinates, end: coordinates, rgb: backgroundColor });
      }
    }
    this.startCoordinates = null;
  };
  
  /** @override */
  handleMouseMove = (props: HandlerProps) => {};
  
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
  handleMouseUp = ({ buttons, coordinates, canvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (this.startCoordinates !== null) {
      if (buttons.includes('left')) {
        drawRect({ canvas, start: this.startCoordinates, end: coordinates, rgb: foregroundColor });
      } else if (buttons.includes('right')) {
        drawRect({ canvas, start: this.startCoordinates, end: coordinates, rgb: backgroundColor });
      }
    }
    this.startCoordinates = null;
  };
  
  /** @override */
  handleMouseMove = (props: HandlerProps) => {};
  
  /** @override */
  handleMouseEnter = (props: HandlerProps) => {};
  
  /** @override */
  handleMouseLeave = (props: HandlerProps) => {};
}

class FillTool implements Tool {
  /** @override */
  handleMouseDown = (props: HandlerProps) => {};

  /** @override */
  handleMouseUp = ({ buttons, coordinates, canvas, foregroundColor, backgroundColor }: HandlerProps) => {
    if (buttons.includes('left')) {
      fill({ canvas, coordinates, rgb: foregroundColor });
    } else if (buttons.includes('right')) {
      fill({ canvas, coordinates, rgb: backgroundColor });
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
