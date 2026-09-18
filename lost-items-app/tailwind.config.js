/** @type {import('tailwindcss').Config} */
// Palette/type tokens mirror DESIGN.md §2–3. New hex values are banned (§9),
// so every colour a screen needs must be named here.
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: '#F2F2F0',
        surface: '#fff',
        ink: { DEFAULT: '#16181F', muted: '#6B7280', soft: '#8b8f95', faint: '#9a9ea4', faintest: '#a8acb2' },
        divider: '#DEDDD8',
        panel: '#101319',
        primary: '#0B6BCB',
        success: '#0F7B3D',
        warning: '#C98A00',
        danger: '#B42318',
        'accent-dark': '#00E39B',
      },
      // One family per weight: NativeWind's font-weight utilities do not swap the
      // loaded font file, so DESIGN.md sec.3's 400-800 range needs explicit names.
      // Avoids `font-medium`/`font-bold`, which collide with fontWeight utilities.
      fontFamily: {
        sans: ['PublicSans'],
        'sans-md': ['PublicSans-Medium'],
        'sans-sb': ['PublicSans-SemiBold'],
        'sans-bold': ['PublicSans-Bold'],
        'sans-xb': ['PublicSans-ExtraBold'],
        mono: ['IBMPlexMono'],
      },
      borderRadius: { bezel: '46px', panel: '26px', well: '36px', card: '22px', row: '18px', btn: '20px', chip: '12px' },
    },
  },
  plugins: [],
};
