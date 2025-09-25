// Next.js expects PostCSS config to be either an array of plugin functions
// or an object mapping plugin names to options. For Tailwind v4, use the
// official '@tailwindcss/postcss' plugin via name mapping.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
