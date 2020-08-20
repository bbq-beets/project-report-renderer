/* eslint-env node */

module.exports = {
  purge: [
    './components/**/*.tsx',
    './lib/**/*.tsx',
    './pages/**/*.tsx',
    './styles/**/*.css'
  ],
  theme: {
    extend: {}
  },
  variants: {
    backgroundColor: ['even']
  },
  plugins: []
}
