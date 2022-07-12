import { type SyntheticEvent } from 'react';
import { ZoomLevel, zoomLevelValues } from '../lib/zoom';
import styles from './ZoomLevelSelector.module.css';

type Props = {
  zoomLevel: ZoomLevel,
  setZoomLevel: (zoomLevel: ZoomLevel) => void;
};

const ZoomLevelSelector = ({ zoomLevel, setZoomLevel }: Props) => {
  const handleSelect = (e: SyntheticEvent) => {
    const select = e.target as HTMLSelectElement;
    setZoomLevel(select.value as ZoomLevel);
  };

  return (
    <div className={styles.zoomLevelSelector}>
      <div>Zoom level:</div>
      <select
        className={styles.select}
        onChange={handleSelect}
        onSelect={handleSelect}
        value={zoomLevel}
      >
        {zoomLevelValues.map(zoomLevel => (
          <option
            value={zoomLevel}
            key={zoomLevel}
          >
            {zoomLevel}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ZoomLevelSelector;
