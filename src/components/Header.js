import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Header = () => {
  const classes = useStyles()

  const refreshPage = () => {
    window.location.reload()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            抽一下 1.2
          </Typography>
          <IconButton
            aria-label="refresh page"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={refreshPage}
            color="inherit">
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
