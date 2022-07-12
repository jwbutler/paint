import { fill } from '../canvas';
import { HandlerProps, Tool } from '../tools';

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

export default FillTool;
