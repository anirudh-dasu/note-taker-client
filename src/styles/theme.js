import { createMuiTheme } from 'material-ui/styles'
import { red, black } from 'material-ui/colors/red'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#009688',
      light: '#B2DFDB',
      dark: '#00796B'
    },
    secondary: {
      main: '#00BCD4'
    },
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2
  },
  loading: black,
  typography: {
    fontFamily: 'Lato'
  }
})

export default theme
