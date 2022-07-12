import { clearCanvas, drawLine } from '../canvas';
import { Coordinates } from '../geometry';
import { HandlerProps, Tool } from '../tools';

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

export default LineTool;
