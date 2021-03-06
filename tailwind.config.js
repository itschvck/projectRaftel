module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'lg': '1140px',
      'xl': '1140px',
      '2xl': '1140px'
    },
    extend: {
      colors: {
        'darkMidnightBlue' : '#2c3e50',
        'lightMidnightBlue': '#34495e',
        'darkConcrete'     : '#7f8c8d',
        'lightConcrete'    : '#95a5a6',
        'darkClour'        : '#bdc3c7',
        'lightCloud'       : '#ecf0f1',
        'darkPomegranate'  : '#c0392b',
        'lightPomegranate' : '#e74c3c',
        'darkCarrot'       : '#d35400',
        'normalCarrot'     : '#e67e22',
        'lightCarrot'      : '#f39c12',
        'normalSunflower'  : '#f1c40f',
        'darkAqua'         : '#16a085',
        'lightAqua'        : '#1abc9c',
        'darkGrass'        : '#27ae60',
        'lightGrass'       : '#2ecc71',
        'darkSky'          : '#2980b9',
        'lightSky'         : '#3498db',
        'darkMina'         : '#8e44ad',
        'lightMina'        : '#9b59b6'
      },
      fontSize: {
        '15xl': '10rem'
      },
      dropShadow: {
        '15xl': '-0.14em 0.1em 0.8em rgb(149 173 193 / 46%)'
      }
    }
  },
  plugins: [
    require("daisyui")
  ],
}
