import { type MouseEvent, useEffect, useState } from 'react';
import { fillCanvas } from '../lib/canvas';
import { Colors } from '../lib/colors';
import { getEventCoordinates } from '../lib/events';
import { Coordinates } from '../lib/geometry';
import { ZoomLevel, zoomLevelAsNumber } from '../lib/zoom';
import styles from './MouseEventSurface.module.css';

type EventHandlerProps = {
  event: MouseEvent,
  coordinates: Coordinates,
  mainCanvas: HTMLCanvasElement,
  scratchCanvas: HTMLCanvasElement
};

type MouseEventHandler = ({ event, coordinates, mainCanvas, scratchCanvas }: EventHandlerProps) => void; 

type Props = {
  width: number,
  height: number,
  zoomLevel: ZoomLevel,
  onMouseDown: MouseEventHandler,
  onMouseUp: MouseEventHandler,
  onMouseMove: MouseEventHandler,
  onMouseEnter: MouseEventHandler,
  onMouseLeave: MouseEventHandler
};

const MouseEventSurface = ({
  width,
  height,
  zoomLevel,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onMouseEnter,
  onMouseLeave
}: Props) => {
  const [mainCanvasData, setMainCanvasData] = useState<ImageData | null>(null);
  
  const handleMouseEvent = (event: MouseEvent, handler: MouseEventHandler) => {
    const coordinates = getEventCoordinates(event, zoomLevel);
    const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    const scratchCanvas = document.getElementById('scratch-canvas') as HTMLCanvasElement;

    handler({
      event,
      coordinates,
      mainCanvas,
      scratchCanvas
    });
  };
  
  const handleMouseDown = (event: MouseEvent) => handleMouseEvent(event, onMouseDown);
  const handleMouseUp = (event: MouseEvent) => {
    handleMouseEvent(event, onMouseUp);
    
    const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    const context = mainCanvas.getContext('2d') as CanvasRenderingContext2D;
    setMainCanvasData(context.getImageData(0, 0, mainCanvas.width, mainCanvas.height));
  };
  const handleMouseMove = (event: MouseEvent) => handleMouseEvent(event, onMouseMove);
  const handleMouseEnter = (event: MouseEvent) => handleMouseEvent(event, onMouseEnter);
  const handleMouseLeave = (event: MouseEvent) => handleMouseEvent(event, onMouseLeave);
  
  useEffect(() => {
    if (mainCanvasData) {
      const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
      fillCanvas(mainCanvas, Colors.WHITE);
      const context = mainCanvas.getContext('2d') as CanvasRenderingContext2D;
      context.putImageData(mainCanvasData, 0, 0);
    }
  // eslint-disable-next-line
  }, [width, height]);
  
  const multiplier = zoomLevelAsNumber(zoomLevel);
  
  return (
    <div
      className={styles.mouseEventSurface}
      style={{
        width: `${width * multiplier}px`,
        height: `${height * multiplier}px`
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={e => e.preventDefault()}
    />
  );
};

export default MouseEventSurface;
export { type EventHandlerProps };
