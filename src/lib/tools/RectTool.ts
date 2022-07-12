import { clearCanvas, drawRect } from '../canvas';
import { Coordinates } from '../geometry';
import { HandlerProps, Tool } from '../tools';

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

export default RectTool;
