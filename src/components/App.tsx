import React, { useState } from 'react';
import { fillCanvas, loadImage, saveImage } from '../lib/canvas';
import { Colors, type RGB } from '../lib/colors';
import {
  initialTool,
  initialDimensions,
  initialForegroundColor,
  initialBackgroundColor,
  initialZoomLevel
} from '../lib/constants';
import { type MouseButton } from '../lib/events';
import { type Dimensions} from '../lib/geometry';
import { type ToolType } from '../lib/tools';
import { ZoomLevel } from '../lib/zoom';
import styles from './App.module.css';
import CanvasController from './CanvasController';
import ColorPicker from './ColorPicker';
import MenuController from './MenuController';
import SelectedColors from './SelectedColors';
import Toolbox from './Toolbox';
import ZoomLevelSelector from './ZoomLevelSelector';

const App = () => {
  const [dimensions, setDimensions] = useState<Dimensions>(initialDimensions);
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(initialZoomLevel);
  const [tool, setTool] = useState<ToolType>(initialTool);
  const [foregroundColor, setForegroundColor] = useState<RGB>(initialForegroundColor);
  const [backgroundColor, setBackgroundColor] = useState<RGB>(initialBackgroundColor);
  const [buttons, setButtons] = useState<MouseButton[]>([]);
  
  const handleClearCanvas = () => {
    // I'm sure there is a fancy React-y way to do this.  But React sux
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    fillCanvas(canvas, Colors.WHITE);
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
  
  const handleResizeCanvas = () => {
    const width = parseInt(prompt('Enter width in pixels') || dimensions.width.toString());
    const height = parseInt(prompt('Enter height in pixels') || dimensions.height.toString());
    setDimensions({ width, height });
  };
  
  return (
    <div className={styles.app}>
      <MenuController
        clearCanvas={handleClearCanvas}
        saveImage={handleSaveImage}
        loadImage={handleLoadImage}
        resizeCanvas={handleResizeCanvas}
      />
      <div className={styles.main}>
        <div className={styles.left}>
          <Toolbox
            tool={tool}
            setTool={setTool}
          />
          <ZoomLevelSelector
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
          />
        </div>
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
