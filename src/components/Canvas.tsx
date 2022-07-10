import { createRef, type MouseEvent, useEffect, useState } from 'react';
import { clearCanvas } from '../lib/canvas';
import { getEventCoordinates } from '../lib/events';
import { type Coordinates } from '../lib/geometry';
import { ZoomLevel, zoomLevelAsNumber } from '../lib/zoom';
import styles from './Canvas.module.css';

type CallbackProps = {
  event: MouseEvent,
  coordinates: Coordinates,
  canvas: HTMLCanvasElement
};

type MouseEventHandler = ({ event, coordinates, canvas }: CallbackProps) => void; 

type Props = {
  width: number,
  height: number,
  zoomLevel: ZoomLevel,
  onMouseDown?: MouseEventHandler,
  onMouseUp?: MouseEventHandler,
  onMouseMove?: MouseEventHandler,
  onMouseEnter?: MouseEventHandler,
  onMouseLeave?: MouseEventHandler
};

const Canvas = ({
  width,
  height,
  zoomLevel,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onMouseEnter,
  onMouseLeave
}: Props) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const ref = createRef<HTMLCanvasElement>();

  const handleMouseEvent = (event: MouseEvent, handler?: MouseEventHandler) => {
    const canvas = ref.current;
    
    if (!canvas || !handler) {
      return;
    }

    handler({
      event,
      coordinates: getEventCoordinates(event, zoomLevel),
      canvas
    });
  };
  
  const handleMouseDown = (event: MouseEvent) => handleMouseEvent(event, onMouseDown);
  const handleMouseUp = (event: MouseEvent) => {
    handleMouseEvent(event, onMouseUp);
    const canvas = ref.current;
    if (canvas) {
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      setImageData(context.getImageData(0, 0, canvas.width, canvas.height));
    }
  };
  const handleMouseMove = (event: MouseEvent) => handleMouseEvent(event, onMouseMove);
  const handleMouseEnter = (event: MouseEvent) => handleMouseEvent(event, onMouseEnter);
  const handleMouseLeave = (event: MouseEvent) => handleMouseEvent(event, onMouseLeave);
  
  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      context.imageSmoothingEnabled = false;
      context.lineWidth = 1;
      clearCanvas(canvas);
    }
  // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    const canvas = ref.current;
    if (canvas && imageData) {
      clearCanvas(canvas);
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      context.putImageData(imageData, 0, 0);
    }
  // eslint-disable-next-line
  }, [width, height, ref.current]);
  
  const multiplier = zoomLevelAsNumber(zoomLevel);

  return (
    <canvas
      id="canvas"
      ref={ref}
      className={styles.canvas}
      width={width}
      height={height}
      style={{
        width: `${width * multiplier}px`,
        height: `${height * multiplier}px`
    }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default Canvas;
export type { CallbackProps };
