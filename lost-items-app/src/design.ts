/**
 * The DESIGN.md §4 shadow ladder, verbatim. "Never invent a new one."
 * React Native 0.86 supports the CSS `boxShadow` prop on all three platforms,
 * so the negative-spread values survive intact instead of being approximated
 * with shadowRadius/elevation.
 */
export const SHADOW = {
  resting: '0 1px 2px rgba(22,24,31,.05), 0 10px 24px -20px rgba(22,24,31,.4)',
  raised: '0 1px 2px rgba(22,24,31,.05), 0 12px 28px -22px rgba(22,24,31,.4)',
  prominent: '0 1px 2px rgba(22,24,31,.05), 0 16px 34px -24px rgba(22,24,31,.45)',
  floating: '0 1px 2px rgba(22,24,31,.06), 0 6px 16px -8px rgba(22,24,31,.24)',
  hero: '0 24px 50px -28px rgba(22,24,31,.5)',
  primaryButton: '0 14px 30px -12px rgba(11,107,203,.45)',
  darkPanel: '0 20px 40px -24px rgba(16,19,25,.8)',
} as const;

/** Shadows the Registry screen uses that the ladder does not name. */
export const SHADOW_SEARCH = '0 1px 2px rgba(22,24,31,.05), 0 10px 24px -18px rgba(22,24,31,.35)';
export const SHADOW_PILL_ON = '0 8px 18px -8px rgba(22,24,31,.7)';
export const SHADOW_PILL_OFF = '0 1px 2px rgba(22,24,31,.06)';
export const SHADOW_SEG_ON = '0 1px 3px rgba(22,24,31,.14)';

/** DESIGN.md §2 status hues, and the 1A (10%) tint the prototype's chip() applies. */
export const STATUS_HEX = {
  Active: '#6B7280',
  Resolved: '#0F7B3D',
  Reunited: '#0F7B3D',
  Flagged: '#B42318',
} as const;
