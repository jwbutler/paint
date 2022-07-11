import { useEffect } from 'react';
import { fillCanvas } from '../lib/canvas';
import { type RGB } from '../lib/colors';
import { type ZoomLevel, zoomLevelAsNumber } from '../lib/zoom';
import styles from './Canvas.module.css';

type Props = {
  id: string, // fuck it
  width: number,
  height: number,
  zoomLevel: ZoomLevel,
  backgroundColor?: RGB
};

const Canvas = ({ id, width, height, zoomLevel, backgroundColor }: Props) => {
  useEffect(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    if (canvas) {
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      context.imageSmoothingEnabled = false;
      context.lineWidth = 1;
      if (backgroundColor) {
        fillCanvas(canvas, backgroundColor);
      }
    }
  // eslint-disable-next-line
  }, []);
  
  const multiplier = zoomLevelAsNumber(zoomLevel);

  return (
    <canvas
      id={id}
      className={styles.canvas}
      width={width}
      height={height}
      style={{
        width: `${width * multiplier}px`,
        height: `${height * multiplier}px`
      }}
    />
  );
};

export default Canvas;
