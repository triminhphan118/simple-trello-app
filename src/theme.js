import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          light: '#757ce8',
          main: '#3f50b5',
          dark: '#002884'
        },
        secondary: {
          light: '#ff7961',
          main: '#f44336',
          dark: '#ba000d',
          contrastText: '#000'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#19857b'
        }
      }
    }
  }
})

export default theme
