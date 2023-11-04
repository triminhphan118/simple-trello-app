import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        display: 'flex',
        height: (theme) => `calc(100vh - (${theme.trello.appBarHeight} + ${theme.trello.boardBarHeight}))`,
        alignItems: 'center',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
      }}
    >
      Content
    </Box>
  )
}

export default BoardContent
