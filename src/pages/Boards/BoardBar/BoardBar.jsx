import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  padding: '5px',
  border: 'none',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        height: (theme) => theme.trello.boardBarHeight,
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
      }}
    >
      <Box sx={{ display: 'flex', alignContent: 'center', gap: 2 }}>
        <Chip sx={MENU_STYLES} icon={<DashboardIcon />} label={board?.title} clickable />
        <Chip sx={MENU_STYLES} icon={<VpnLockIcon />} label={capitalizeFirstLetter(board.type)} clickable />
        <Chip sx={MENU_STYLES} icon={<AddToDriveIcon />} label="Add To Google Drive" clickable />
        <Chip sx={MENU_STYLES} icon={<FlashOnIcon />} label="Automation" clickable />
        <Chip sx={MENU_STYLES} icon={<FilterListIcon />} label="Filters" clickable />
      </Box>
      <Box sx={{ display: 'flex', alignContent: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddAlt1Icon />}
          sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' } }}
        >
          Invite
        </Button>

        <AvatarGroup
          max={4}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: '16px',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0de' }
            }
          }}
        >
          <Tooltip title="Mt">
            <Avatar
              alt="Remy Sharp"
              src="https://cdn.dribbble.com/userupload/3828718/file/original-fe81a0231432c19ee76c834ed7d81ca7.png?resize=752x"
            />
          </Tooltip>
          <Tooltip title="Mt">
            <Avatar
              alt="Remy Sharp"
              src="https://cdn.dribbble.com/userupload/3828718/file/original-fe81a0231432c19ee76c834ed7d81ca7.png?resize=752x"
            />
          </Tooltip>
          <Tooltip title="Mt">
            <Avatar
              alt="Remy Sharp"
              src="https://cdn.dribbble.com/userupload/3828718/file/original-fe81a0231432c19ee76c834ed7d81ca7.png?resize=752x"
            />
          </Tooltip>
          <Tooltip title="Mt">
            <Avatar
              alt="Remy Sharp"
              src="https://cdn.dribbble.com/userupload/3828718/file/original-fe81a0231432c19ee76c834ed7d81ca7.png?resize=752x"
            />
          </Tooltip>
          <Tooltip title="Mt">
            <Avatar
              alt="Remy Sharp"
              src="https://cdn.dribbble.com/userupload/3828718/file/original-fe81a0231432c19ee76c834ed7d81ca7.png?resize=752x"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
