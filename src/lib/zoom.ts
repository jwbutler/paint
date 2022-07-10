type ZoomLevel = '25%' | '50%' | '75%' | '100%' | '200%' | '400%' | '800%';

const zoomLevelValues: ZoomLevel[] = ['25%', '50%', '75%', '100%', '200%', '400%', '800%'];

const zoomLevelAsNumber = (zoomLevel: ZoomLevel): number => {
  return parseInt(zoomLevel) * 0.01;
};

export {
  type ZoomLevel,
  zoomLevelAsNumber,
  zoomLevelValues
};
