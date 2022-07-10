import { rgb2css, type RGB } from '../lib/colors';
import styles from './SelectedColors.module.css';

type Props = {
  foregroundColor: RGB,
  backgroundColor: RGB
};

const SelectedColors = ({ foregroundColor, backgroundColor }: Props) => {
  return (
    <div className={styles.selectedColors}>
      <div
        className={`${styles.color} ${styles.background}`}
        style={{ backgroundColor: rgb2css(backgroundColor) }}
      />
      <div
        className={`${styles.color} ${styles.foreground}`}
        style={{ backgroundColor: rgb2css(foregroundColor) }}
      />
    </div>
  );
};

export default SelectedColors;
