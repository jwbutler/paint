import { type MouseEvent, useState } from 'react';
import { colorValues, RGB, rgb2css } from '../lib/colors';
import { getMouseButtons, MouseButton } from '../lib/events';
import styles from './ColorPicker.module.css';

type Props = {
  setForegroundColor: (color: RGB) => void;
  setBackgroundColor: (color: RGB) => void;
};

const ColorPicker = ({ setForegroundColor, setBackgroundColor }: Props) => {
  const [buttons, setButtons] = useState<MouseButton[]>([]);

  type ColorProps = {
    color: RGB
  };

  const Color = ({ color }: ColorProps) => {
    const handleMouseDown = (e: MouseEvent) => {
      setButtons(getMouseButtons(e));
    };
    const handleMouseUp = (e: MouseEvent) => {
      if (buttons.includes('left')) {
        setForegroundColor(color);
      }
      if (buttons.includes('right')) {
        setBackgroundColor(color);
      }
      setButtons(getMouseButtons(e));
    };

    return (
      <div
        className={styles.color}
        style={{ backgroundColor: rgb2css(color) }}
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    );
  };
  
  return (
    <div className={styles.colorPicker}>
      {colorValues().map(color => (
        <Color color={color} key={rgb2css(color)} />
      ))}
    </div>
  );
};

export default ColorPicker;
