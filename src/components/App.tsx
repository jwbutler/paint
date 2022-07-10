import React, { useState } from 'react';
import { type RGB } from '../lib/colors';
import { initialTool, initialDimensions, initialForegroundColor, initialBackgroundColor } from '../lib/constants';
import { type MouseButton } from '../lib/events';
import { Dimensions, Tool } from '../lib/types';
import styles from './App.module.css';
import CanvasController from './CanvasController';
import ColorPicker from './ColorPicker';
import MenuController from './MenuController';
import SelectedColors from './SelectedColors';
import Toolbox from './Toolbox';

const App = () => {
  const [dimensions, setDimensions] = useState<Dimensions>(initialDimensions);
  const [tool, setTool] = useState<Tool>(initialTool);
  const [foregroundColor, setForegroundColor] = useState<RGB>(initialForegroundColor);
  const [backgroundColor, setBackgroundColor] = useState<RGB>(initialBackgroundColor);
  const [buttons, setButtons] = useState<MouseButton[]>([]);
  
  return (
    <div className={styles.app}>
      <MenuController
        clearCanvas={() => {}}
        saveCanvas={() => {}}
        loadCanvas={() => {}}
      />
      <div className={styles.main}>
        <Toolbox
          tool={tool}
          setTool={setTool}
        />
        <CanvasController
          buttons={buttons}
          setButtons={setButtons}
          dimensions={dimensions}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          tool={tool}
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
