import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCard from './ListCards/ListCard'

function Column() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
        ml: 2,
        borderRadius: '8px',
        height: 'fit-content',
        maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
      }}
    >
      {/* Column title */}
      <Box
        sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          Column Titile
        </Typography>
        <Box>
          <Tooltip title="More options">
            <Button
              sx={{ color: 'text.primary', padding: 0, minWidth: '100%' }}
              id="basic-button-workspaces"
              aria-controls={open ? 'basic-menu-workspaces' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
          </Tooltip>
          <Menu
            id="basic-menu-workspaces"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button-workspaces'
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <AddCardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add new card</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Paste</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Archire this column</ListItemText>
            </MenuItem>{' '}
            <MenuItem>
              <ListItemIcon>
                <DeleteForeverIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Column content */}
      <ListCard />

      {/* Column footer */}
      <Box
        sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2,
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Button startIcon={<AddCardIcon />}> Add new card</Button>
        <Tooltip title="Drag to remove">
          <DragHandleIcon sx={{ cursor: 'pointer' }}></DragHandleIcon>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Column
