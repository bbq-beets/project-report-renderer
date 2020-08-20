/* eslint-env node */

module.exports = {
  purge: [
    './components/**/*.tsx',
    './lib/**/*.tsx',
    './pages/**/*.tsx',
    './styles/**/*.css'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'sidebar-content': '200px minmax(0, 1fr)'
      }
    }
  },
  variants: {
    backgroundColor: ['even'],
    borderWidth: ['last', 'responsive']
  },
  plugins: []
}
