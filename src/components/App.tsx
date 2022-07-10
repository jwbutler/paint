import React, { useState } from 'react';
import { clearCanvas, loadImage, saveImage } from '../lib/canvas';
import { Colors, type RGB, rgb2css } from '../lib/colors';
import {
  initialTool,
  initialDimensions,
  initialForegroundColor,
  initialBackgroundColor,
  initialZoomLevel
} from '../lib/constants';
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
  const [zoomLevel, setZoomLevel] = useState<number>(initialZoomLevel);
  const [tool, setTool] = useState<Tool>(initialTool);
  const [foregroundColor, setForegroundColor] = useState<RGB>(initialForegroundColor);
  const [backgroundColor, setBackgroundColor] = useState<RGB>(initialBackgroundColor);
  const [buttons, setButtons] = useState<MouseButton[]>([]);
  
  const handleClearCanvas = () => {
    // I'm sure there is a fancy React-y way to do this.  But React sux
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    clearCanvas(canvas);
  };
  
  const handleSaveImage = () => {
    // I'm sure there is a fancy React-y way to do this.  But React sux
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    saveImage(canvas);
  };
  
  const handleLoadImage = async () => {
    // I'm sure there is a fancy React-y way to do this.  But React sux
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    await loadImage(canvas);
  };
  
  return (
    <div className={styles.app}>
      <MenuController
        clearCanvas={handleClearCanvas}
        saveImage={handleSaveImage}
        loadImage={handleLoadImage}
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
          zoomLevel={zoomLevel}
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
