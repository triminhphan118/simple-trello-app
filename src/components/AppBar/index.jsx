import Box from '@mui/material/Box'
import ModeSelect from '../ModeSelect'

function AppBar() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        display: 'flex',
        height: (theme) => theme.trello.appBarHeight,
        alignItems: 'center'
      }}
    >
      <ModeSelect />
    </Box>
  )
}

export default AppBar
