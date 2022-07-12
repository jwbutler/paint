import { useCallback, useEffect, useState } from 'react';
import { fillCanvas, loadImage, saveImage } from '../lib/canvas';
import { Colors, type RGB } from '../lib/colors';
import {
  initialTool,
  initialDimensions,
  initialForegroundColor,
  initialBackgroundColor,
  initialZoomLevel, mainCanvasId
} from '../lib/constants';
import { type MouseButton } from '../lib/events';
import { type Dimensions} from '../lib/geometry';
import { HistoryEvent } from '../lib/history';
import { type ToolType } from '../lib/tools';
import { ZoomLevel } from '../lib/zoom';
import styles from './App.module.css';
import DimensionsSelector from './DimensionsSelector';
import DrawSurface from './DrawSurface';
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
  const [undoHistory, setUndoHistory] = useState<HistoryEvent[]>([]);
  
  const undo = useCallback(() => {
    const [lastEvent] = undoHistory.splice(undoHistory.length - 1);
    if (lastEvent) {
      setUndoHistory([...undoHistory]);
      const mainCanvas = document.getElementById(mainCanvasId) as HTMLCanvasElement;
      const context = mainCanvas.getContext('2d') as CanvasRenderingContext2D;
      context.putImageData(lastEvent.imageData, 0, 0);
    }
  }, [undoHistory]);
  
  const addHistoryEvent = (event: HistoryEvent) => {
    setUndoHistory([...undoHistory, event]);
  };

  const handleClearCanvas = () => {
    // I'm sure there is a fancy React-y way to do this.  But React sux
    const canvas = document.getElementById(mainCanvasId) as HTMLCanvasElement;
    fillCanvas(canvas, Colors.WHITE);
  };
  
  const handleSaveImage = () => {
    // I'm sure there is a fancy React-y way to do this.  But React sux
    const canvas = document.getElementById(mainCanvasId) as HTMLCanvasElement;
    saveImage(canvas);
  };
  
  const handleLoadImage = async () => {
    // I'm sure there is a fancy React-y way to do this.  But React sux
    const canvas = document.getElementById(mainCanvasId) as HTMLCanvasElement;
    await loadImage(canvas);
  };
  
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        undo();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [undo]);

  return (
    <div className={styles.app}>
      <MenuController
        clearCanvas={handleClearCanvas}
        saveImage={handleSaveImage}
        loadImage={handleLoadImage}
        undo={undo}
      />
      <div className={styles.main}>
        <div className={styles.left}>
          <Toolbox
            tool={tool}
            setTool={setTool}
          />
          <DimensionsSelector
            dimensions={dimensions}
            setDimensions={setDimensions}
          />
          <ZoomLevelSelector
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
          />
        </div>
        <DrawSurface
          buttons={buttons}
          setButtons={setButtons}
          dimensions={dimensions}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          tool={tool}
          zoomLevel={zoomLevel}
          addHistoryEvent={addHistoryEvent}
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
