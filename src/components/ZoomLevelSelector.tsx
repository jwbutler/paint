import { type SyntheticEvent } from 'react';
import { ZoomLevel, zoomLevelAsNumber, zoomLevelValues } from '../lib/zoom';
import styles from './ZoomLevelSelector.module.css';

type Props = {
  zoomLevel: ZoomLevel,
  setZoomLevel: (zoomLevel: ZoomLevel) => void;
};

const ZoomLevelSelector = ({ zoomLevel, setZoomLevel }: Props) => {
  const _zoomLevel = zoomLevel;

  const handleSelect = (e: SyntheticEvent) => {
    console.log(e);
    const select = e.target as HTMLSelectElement;
    setZoomLevel(select.value as ZoomLevel);
  };

  return (
    <div className={styles.zoomLevelSelector}>
      <label>
        Zoom level:
        <select onChange={handleSelect} onSelect={handleSelect}>
          {zoomLevelValues.map(zoomLevel => (
            <option
              value={zoomLevel}
              key={zoomLevel}
              selected={zoomLevel === _zoomLevel}
            >
              {zoomLevel}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default ZoomLevelSelector;
