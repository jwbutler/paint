import { type MouseEvent } from 'react';
import { type Coordinates } from './geometry';
import { type ZoomLevel, zoomLevelAsNumber } from './zoom';

type MouseButton = 'left' | 'middle' | 'right';

const getEventCoordinates = (e: MouseEvent, zoomLevel: ZoomLevel): Coordinates => {
  const container = e.target as HTMLElement;
  const multiplier = 1 / zoomLevelAsNumber(zoomLevel);
  const x = Math.floor((e.clientX - container.getBoundingClientRect().left) * multiplier); // TODO scrollLeft?
  const y = Math.floor((e.clientY - container.getBoundingClientRect().top) * multiplier); // TODO scrollTop?
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
