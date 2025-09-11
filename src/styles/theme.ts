import { tokens } from '@/styles/tokens';

export const theme = {
  ...tokens,

  colors: {
    ...tokens.colors,
    background: {
      ...tokens.colors.background,
      default: '#FFFFFF',
    },
  },
};
