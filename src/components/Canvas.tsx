import { createRef, type MouseEvent, useEffect } from 'react';
import { getEventCoordinates } from '../lib/events';
import { Coordinates } from '../lib/types';
import styles from './Canvas.module.css';

type CallbackProps = {
  event: MouseEvent,
  coordinates: Coordinates,
  canvas: HTMLCanvasElement
};

type Props = {
  width: number,
  height: number,
  onMouseDown: ({ coordinates, canvas }: CallbackProps) => void,
  onMouseUp: ({ coordinates, canvas }: CallbackProps) => void,
  onMouseMove: ({ coordinates, canvas }: CallbackProps) => void,
};

const Canvas = ({
  width,
  height,
  onMouseDown,
  onMouseUp,
  onMouseMove
}: Props) => {
  const ref = createRef<HTMLCanvasElement>();

  const handleMouseEvent = (event: MouseEvent, handler: (props: CallbackProps) => void) => {
    if (!ref.current) {
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
  
  useEffect(() => {
    console.log('fill');
    if (ref.current) {
      const context = ref.current.getContext('2d') as CanvasRenderingContext2D;
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
    />
  );
};

export default Canvas;
export type { CallbackProps };
