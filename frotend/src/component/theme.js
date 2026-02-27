/**
 * Design Tokens / Theme Configuration
 * Centralized color palette and typography for consistent UI
 */

export const colors = {
  // Primary brand color - used for CTAs, highlights
  primary: {
    main: '#E30605',
    dark: '#B80504',
    light: '#FF2A29',
  },
  
  // Secondary/accent colors
  secondary: {
    main: '#1A1A2E',
    dark: '#0F0F1A',
    light: '#2D2D4A',
  },
  
  // Neutral palette for backgrounds, text, borders
  neutral: {
    white: '#FFFFFF',
    offWhite: '#F8F9FA',
    lightGray: '#F1F1F1',
    gray: '#6C757D',
    darkGray: '#4B4242',
    charcoal: '#252525',
    black: '#121212',
  },
  
  // Status colors
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  
  // Gradients
  gradients: {
    hero: 'linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(227, 6, 5, 0.8) 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%)',
    card: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  },
};

export const typography = {
  fontFamily: {
    primary: "'Archivo', sans-serif",
    secondary: "'Roboto', sans-serif",
  },
  
  // Font weights
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
  },
  
  // Font sizes
  size: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem',   // 48px
  '4xl': '4rem',   // 64px
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  card: '0 4px 20px rgba(0, 0, 0, 0.08)',
  cardHover: '0 8px 30px rgba(0, 0, 0, 0.12)',
};

export const borderRadius = {
  sm: '0.25rem',   // 4px
  base: '0.5rem',  // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  full: '9999px',
};

export const transitions = {
  fast: '0.15s ease',
  base: '0.3s ease',
  slow: '0.5s ease',
  smooth: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
};

// Animation variants for Framer Motion
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  buttonHover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  buttonTap: {
    scale: 0.98,
  },
  cardHover: {
    y: -8,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// Export as default theme object
const theme = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  transitions,
  animations,
};

export default theme;
