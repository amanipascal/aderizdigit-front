import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const CustomTooltip = ({text, children, placement}) => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {text}
        </Tooltip>
      );
  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      {children}
    </OverlayTrigger>
  )
}

export default CustomTooltip