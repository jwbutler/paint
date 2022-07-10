import { createRef, type MouseEvent, useEffect } from 'react';
import { getEventCoordinates } from '../lib/events';
import { Coordinates } from '../lib/types';
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
  onMouseDown?: MouseEventHandler,
  onMouseUp?: MouseEventHandler,
  onMouseMove?: MouseEventHandler,
  onMouseEnter?: MouseEventHandler,
  onMouseLeave?: MouseEventHandler
};

const Canvas = ({
  width,
  height,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onMouseEnter,
  onMouseLeave
}: Props) => {
  const ref = createRef<HTMLCanvasElement>();

  const handleMouseEvent = (event: MouseEvent, handler?: MouseEventHandler) => {
    if (!ref.current || !handler) {
      return;
    }

    handler({
      event,
      coordinates: getEventCoordinates(event),
      canvas: ref.current
    });
  };
  
  const handleMouseDown = (event: MouseEvent) => handleMouseEvent(event, onMouseDown);
  const handleMouseUp = (event: MouseEvent) => handleMouseEvent(event, onMouseUp);
  const handleMouseMove = (event: MouseEvent) => handleMouseEvent(event, onMouseMove);
  const handleMouseEnter = (event: MouseEvent) => handleMouseEvent(event, onMouseEnter);
  const handleMouseLeave = (event: MouseEvent) => handleMouseEvent(event, onMouseLeave);
  
  useEffect(() => {
    if (ref.current) {
      const context = ref.current.getContext('2d') as CanvasRenderingContext2D;
      context.imageSmoothingEnabled = false;
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, width, height);
    }
  }, []);
  
  return (
    <canvas
      ref={ref}
      className={styles.canvas}
      width={width}
      height={height}
      style={{ width: `${width}px`, height: `${height}px` }}
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
