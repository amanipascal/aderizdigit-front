import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
// import AuthLayout from './Authentication/AuthLayout'
// import Verification from './Authentication/verification'
import './NotFound.css'

const NotFound = () => {

  const navigate = useNavigate()


  // const href = window.location.href;

  // const hrefParamString = href.substring(href.lastIndexOf('/') + 1)

  // React.useEffect(() => {
  //   console.log('hrefParamString : ', hrefParamString)
  // }, [hrefParamString])
  


  return (
    <React.Fragment>
      {/* {
        hrefParamString.includes('?token') ? (<Verification hrefParamString={hrefParamString} />) :
        // hrefParamString.includes('?token') ? (<AuthLayout resetString={hrefParamString} />) :
        ( */}
          <div id="notfound">
            <div className="notfound">
              <div className="notfound-404">
                <h1>404</h1>
                <h2>Désolé, page inconnu</h2>
              </div>
              <Button variant="outlined" style={{textTransform: 'none'}} onClick={() => navigate("/authenticate", { replace: true })}>
                Retour à la page d'authentification
              </Button>
            </div>
          </div>
        {/* )
      }
       */}
  </React.Fragment>
  )
}

export default NotFound