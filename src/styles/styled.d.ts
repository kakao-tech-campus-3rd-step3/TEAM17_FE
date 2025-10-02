import 'styled-components';
import { theme } from '@/styles/theme';

type AppTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
