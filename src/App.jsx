import { Button } from '@mui/material'
import { pink } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'
import { useColorScheme } from '@mui/material/styles'

import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import Brightness2Icon from '@mui/icons-material/Brightness2'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function BasicSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <FormControl>
      <InputLabel id="select-mode-label">Age</InputLabel>
      <Select labelId="select-mode-label" id="select-mode" value={mode} label="Mode" onChange={handleChange}>
        <MenuItem value={'dark'}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <LightModeIcon fontSize="small" /> Dark
          </Box>
        </MenuItem>
        <MenuItem value={'system'}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <SettingsBrightnessIcon fontSize="small" /> System
          </Box>
        </MenuItem>
        <MenuItem value={'light'}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Brightness2Icon fontSize="small" />
            Light
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function App() {
  return (
    <>
      <div
        style={{
          margin: '20px'
        }}
      >
        <BasicSelect />
      </div>
      <span>TEST</span>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
    </>
  )
}

export default App
