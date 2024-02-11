import { extend, type Colord } from "colord";
import a11yPlugin from "colord/plugins/a11y";

extend([a11yPlugin]);

export const createContrast = (color: Colord) => {
  const isLight = color.isLight();
  let opposite = color;

  let i = 0;
  while (opposite.contrast(color) < 6) {
    opposite = isLight ? opposite.darken(0.2) : opposite.lighten(0.2);
    if (i++ > 10) break;
  }
  return opposite;
};
