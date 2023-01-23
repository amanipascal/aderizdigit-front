import React from 'react'
import Iframe from 'react-iframe'

const MondayEmbeded = ({url, width, height}) => {
  return  <Iframe 
        src={url}
        width={width}
        height={height}
        allowTransparency="true"
        display="initial"
        position="relative"
        styles={{
            border: 0, 
            background:'none transparent',
            boxShadow: '5px 5px 56px 0px rgba(0,0,0,0.25)'
        }}
    />
}

export default MondayEmbeded