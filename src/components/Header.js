import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh';

const Header = () => {
  const refreshPage = () => {
    window.location.reload()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4">Slot Machine 1.1</Typography>
      
      <div>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={refreshPage}
          color="inherit"
          >
          <RefreshIcon />
          </IconButton>
      </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
