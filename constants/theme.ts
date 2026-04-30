// Powered by OnSpace.AI
export const Colors = {
  // Base palette
  background: '#0E0E0E',
  surface: '#1A1A1A',
  surfaceElevated: '#222222',
  surfaceCard: '#1E1E1E',
  border: '#2A2A2A',
  borderLight: '#333333',

  // Brand
  primary: '#C9A84C',
  primaryLight: '#E2C06A',
  primaryDark: '#A0812E',
  primaryMuted: 'rgba(201,168,76,0.15)',

  // Text
  textPrimary: '#F5F0E8',
  textSecondary: '#A0998A',
  textMuted: '#5A5248',
  textInverse: '#0E0E0E',

  // Semantic
  success: '#4CAF82',
  error: '#E05252',
  warning: '#E09A52',

  // Overlay
  overlay: 'rgba(0,0,0,0.6)',
  overlayLight: 'rgba(0,0,0,0.3)',
};

export const Typography = {
  sizes: {
    xs: 11,
    sm: 13,
    base: 16,
    md: 18,
    lg: 20,
    xl: 24,
    xxl: 28,
    hero: 34,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const Radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 999,
};

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gold: {
    shadowColor: '#C9A84C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
};
