type RGB = {
  red: number,
  green: number,
  blue: number
};

type RGBA = {
  red: number,
  green: number,
  blue: number,
  alpha: number
};

const rgb = (red: number, green: number, blue: number): RGB => ({ red, green, blue });

const rgb2css = ({ red, green, blue }: RGB): string => `rgb(${red}, ${green}, ${blue})`;

// in MSPaint order, left-to-right
const Colors: Record<string, RGB> = {
  BLACK: rgb(0, 0, 0),
  DARK_GRAY: rgb(128, 128, 128),
  DARK_RED: rgb(128, 0, 0),
  DARK_YELLOW: rgb(128, 128, 0),
  DARK_GREEN: rgb(0, 128, 0),
  DARK_CYAN: rgb(0, 128, 128),
  DARK_BLUE: rgb(0, 0, 128),
  DARK_PURPLE: rgb(128, 0, 128),
  // skipping a bunch that I never use...
  DARK_BROWN: rgb(128, 64, 0),
  
  // 2nd row
  WHITE: rgb(255, 255, 255),
  LIGHT_GRAY: rgb(192, 192, 192),
  RED: rgb(255, 0, 0),
  YELLOW: rgb(255, 255, 0),
  GREEN: rgb(0, 255, 0),
  CYAN: rgb(0, 255, 255),
  BLUE: rgb(0, 0, 255),
  MAGENTA: rgb(255, 0, 255),
  // skipping a bunch that I never use...
  ORANGE: rgb(255, 128, 64)
};

const colorValues = (): RGB[] => ([
  Colors.BLACK,
  Colors.DARK_GRAY,
  Colors.DARK_RED,
  Colors.DARK_YELLOW,
  Colors.DARK_GREEN,
  Colors.DARK_CYAN,
  Colors.DARK_BLUE,
  Colors.DARK_PURPLE,
  Colors.DARK_BROWN,
  Colors.WHITE,
  Colors.LIGHT_GRAY,
  Colors.RED,
  Colors.YELLOW,
  Colors.GREEN,
  Colors.CYAN,
  Colors.BLUE,
  Colors.MAGENTA,
  Colors.ORANGE
]);

export {
  Colors,
  colorValues,
  rgb2css,
  type RGB,
  type RGBA
};
