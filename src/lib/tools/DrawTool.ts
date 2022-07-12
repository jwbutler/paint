import { drawLine, drawPoint } from '../canvas';
import { Coordinates } from '../geometry';
import { HandlerProps, Tool } from '../tools';

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

export default DrawTool;
