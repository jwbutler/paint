import { ChangeEvent } from 'react';
import { Dimensions } from '../lib/geometry';
import styles from './DimensionsSelector.module.css';

type Props = {
  dimensions: Dimensions,
  setDimensions: (dimensions: Dimensions) => void
};

const DimensionsSelector = ({ dimensions: { width, height }, setDimensions }: Props) => {
  const handleChangeWidth = (e: ChangeEvent<HTMLInputElement>) => {
    setDimensions({
      width: e.target.valueAsNumber,
      height
    });
  };
  
  const handleChangeHeight = (e: ChangeEvent<HTMLInputElement>) => {
    setDimensions({
      width,
      height: e.target.valueAsNumber
    });
  };
  
  return (
    <div className={styles.dimensionsSelector}>
      <div>Dimensions:</div>
      <div className={styles.dimensions}>
        <input
          className={styles.input}
          type="number"
          value={width}
          onChange={handleChangeWidth}
        />
        <div className={styles.x}>
          x
        </div>
        <input
          className={styles.input}
          type="number"
          value={height}
          onChange={handleChangeHeight}
        />
      </div>
    </div>
  );
};

export default DimensionsSelector;
