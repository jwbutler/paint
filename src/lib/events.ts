import { type MouseEvent } from 'react';
import { Coordinates } from './types';

type MouseButton = 'left' | 'middle' | 'right';

const getEventCoordinates = (e: MouseEvent): Coordinates => {
  const canvas = e.target as HTMLElement;
  const x = e.clientX - canvas.offsetLeft; // TODO scrollLeft?
  const y = e.clientY - canvas.offsetTop; // TODO scrollTop?
  return { x, y };
};

const getMouseButtons = (e: MouseEvent): MouseButton[] => {
  const buttons: MouseButton[] = [];
  if ((e.buttons & 1) > 0) {
    if (e.metaKey) {
      buttons.push('right');
    } else {
      buttons.push('left');
    }
  }
  if ((e.buttons & 2) > 0) {
    buttons.push('right');
  }
  if ((e.buttons & 4) > 0) {
    buttons.push('middle');
  }
  return buttons;
};

export {
  getEventCoordinates,
  getMouseButtons,
  type MouseButton
};
