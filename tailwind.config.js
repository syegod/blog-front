module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Work Sans']
    }
  },
  
  plugins: [
    require('@tailwindcss/typography')
  ],
}