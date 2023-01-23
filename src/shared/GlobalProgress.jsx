import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';

const GlobalProgress = ({progression}) => {
  return (
    <React.Fragment>
        {
            progression && <LinearProgress color="success" />
        }
    </React.Fragment>
  )
}

export default GlobalProgress