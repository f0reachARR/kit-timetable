/* eslint-disable @typescript-eslint/no-var-requires */
const { colors, screens, fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    content: ['./src/**/*.tsx'],
  },
  theme: {
    screens: {
      sm: screens.sm,
      md: screens.md,
    },
    colors: {
      gray: colors.gray,
      blue: colors.blue,
    },
    fontFamily: {
      ...fontFamily,
      sans: [
        'Helvetica Neue',
        'Arial',
        'Hiragino Kaku Gothic ProN',
        'Hiragino Sans',
        'Meiryo',
        'sans-serif',
      ],
    },
    backgroundImage: {},
  },
  variants: {
    outline: ['focus'],
  },
};
