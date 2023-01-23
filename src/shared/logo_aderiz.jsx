import React, { Fragment } from 'react'
import logo_aderiz from '../assets/images/logo_aderiz.png'

const LogoAderiz = ({height, width}) => {
  return (
    <Fragment>
        <img src={logo_aderiz} alt="logo" height={height} width={width} />
    </Fragment>
  )
}

export default LogoAderiz;