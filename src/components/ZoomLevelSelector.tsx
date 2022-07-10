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
    <label className={styles.zoomLevelSelector}>
      Zoom level: <br />
      <select
        className={styles.select}
        onChange={handleSelect}
        onSelect={handleSelect}
      >
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
  );
};

export default ZoomLevelSelector;
