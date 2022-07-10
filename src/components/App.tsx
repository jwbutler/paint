import React, { useState } from 'react';
import { draw, fill } from '../lib/canvas';
import { RGB } from '../lib/colors';
import { initialTool, initialDimensions, initialForegroundColor, initialBackgroundColor } from '../lib/constants';
import { getMouseButtons, MouseButton } from '../lib/events';
import { Dimensions, Tool } from '../lib/types';
import styles from './App.module.css';
import Canvas, { type CallbackProps as CanvasCallbackProps } from './Canvas';
import ColorPicker from './ColorPicker';
import Menu from './Menu';
import SelectedColors from './SelectedColors';
import Toolbox from './Toolbox';

const App = () => {
  const [dimensions, setDimensions] = useState<Dimensions>(initialDimensions);
  const [tool, setTool] = useState<Tool>(initialTool);
  const [foregroundColor, setForegroundColor] = useState<RGB>(initialForegroundColor);
  const [backgroundColor, setBackgroundColor] = useState<RGB>(initialBackgroundColor);
  const [buttons, setButtons] = useState<MouseButton[]>([]);
  
  const handleMouseDown = ({ event, canvas, coordinates }: CanvasCallbackProps) => {
    const buttons = getMouseButtons(event);
    setButtons(buttons);
  };
  const handleMouseUp = ({ event, canvas, coordinates }: CanvasCallbackProps) => {
    switch (tool) {
      case 'draw':
        if (buttons.includes('left')) {
          draw({ canvas, coordinates, rgb: foregroundColor });
        } else if (buttons.includes('right')) {
          draw({ canvas, coordinates, rgb: backgroundColor });
        }
        break;
      case 'fill':
        console.log(buttons);
        if (buttons.includes('left')) {
          fill({ canvas, coordinates, rgb: foregroundColor });
        } else if (buttons.includes('right')) {
          fill({ canvas, coordinates, rgb: backgroundColor });
        }
        break;
    }
    setButtons(getMouseButtons(event));
  };
  const handleMouseMove = ({ event, canvas, coordinates }: CanvasCallbackProps) => {
    const buttons = getMouseButtons(event);
    switch (tool) {
      case 'draw':
        if (buttons.includes('left')) {
          draw({ canvas, coordinates, rgb: foregroundColor });
        } else if (buttons.includes('right')) {
          draw({ canvas, coordinates, rgb: backgroundColor });
        }
    }
  };
  
  return (
    <div className={styles.app}>
      <Menu />
      <div className={styles.main}>
        <Toolbox
          tool={tool}
          setTool={setTool}
        />
        <Canvas
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
      </div>
      <div className={styles.bottom}>
        <SelectedColors
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
        />
        <ColorPicker
          setForegroundColor={setForegroundColor}
          setBackgroundColor={setBackgroundColor}
        />
      </div>
    </div>
  );
};

export default App;
