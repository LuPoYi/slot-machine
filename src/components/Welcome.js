import React from 'react'
import Button from '@material-ui/core/Button'

const Welcome = ({ nextStepEvent }) => {
  return (
    <div>
      <h1>Welcome!</h1>
      <Button variant="contained" color="primary" onClick={nextStepEvent}>
        Start
      </Button>
    </div>
  )
}

export default Welcome
