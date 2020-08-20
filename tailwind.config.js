/* eslint-env node */

module.exports = {
  purge: [
    './components/**/*.tsx',
    './lib/**/*.tsx',
    './pages/**/*.tsx',
    './styles/**/*.css'
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1792px'
    },
    extend: {
      gridTemplateColumns: {
        'sidebar-content': '200px minmax(0, 1fr)'
      },
      width: {
        '1/2': '50%'
      },
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%'
      }
    }
  },
  variants: {
    backgroundColor: ['even'],
    borderWidth: ['last', 'responsive']
  },
  plugins: []
}
