// Metro-only module: require() of binary assets does not resolve under plain
// Node, and scripts/ imports mockData directly. Keeping the asset handles here
// leaves src/data/mockData.ts pure data and node-importable.
export const LOGO = require('../assets/images/logo.png');

/** Indexed to match SLIDES in src/data/mockData.ts. */
export const SLIDE_IMAGES = [
  require('../assets/images/HomePage1.webp'),
  require('../assets/images/illustration-exchange-item.webp'),
  require('../assets/images/illustration-treasure-chest.webp'),
];
