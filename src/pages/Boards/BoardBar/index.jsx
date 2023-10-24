import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        display: 'flex',
        height: (theme) => theme.trello.boardBarHeight,
        alignItems: 'center'
      }}
    >
      Board board
    </Box>
  )
}

export default BoardBar
