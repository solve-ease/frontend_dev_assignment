import tailwind from '@tailwindcss/postcss'

// Use explicit plugin import so PostCSS receives a valid plugin function
export default {
  plugins: [tailwind()],
}
