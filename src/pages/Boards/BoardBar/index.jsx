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

const MENU_STYLES = {
  color: 'primary.main',
  bgcolor: 'white',
  padding: '5px',
  border: 'none',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
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
        overflowX: 'auto'
      }}
    >
      <Box sx={{ display: 'flex', alignContent: 'center', gap: 2 }}>
        <Chip sx={MENU_STYLES} icon={<DashboardIcon />} label="With Icon Pmt UI" clickable />
        <Chip sx={MENU_STYLES} icon={<VpnLockIcon />} label="Public/Private Workspace" clickable />
        <Chip sx={MENU_STYLES} icon={<AddToDriveIcon />} label="Add To Google Drive" clickable />
        <Chip sx={MENU_STYLES} icon={<FlashOnIcon />} label="Automation" clickable />
        <Chip sx={MENU_STYLES} icon={<FilterListIcon />} label="Filters" clickable />
      </Box>
      <Box sx={{ display: 'flex', alignContent: 'center', gap: 2 }}>
        <Button variant="outlined" startIcon={<PersonAddAlt1Icon />}>
          Invite
        </Button>

        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: '16px'
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
