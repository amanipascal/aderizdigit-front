import React, { useState, useEffect, useRef, useContext } from 'react'
import "../../assets/css/bootstrap.min.css"
import "../../assets/css/icons.min.css"
import "../../assets/css/app.min.css";
import LogoAderiz from '../../shared/logo_aderiz';
import SocialAuth from './SocialAuth';
import {client} from '../../shared/feathersjs';

import { useNavigate } from "react-router-dom";
import { Context } from '../../shared/Store';
import GlobalProgress from '../../shared/GlobalProgress';
import { Box, Button, Checkbox, FormControlLabel, Link, Typography } from '@mui/material';
import MyAlert from '../../shared/MyAlert';


const Login = ({change_component}) => {
    
    const [state, setState] = useContext(Context)

    const userRef = useRef()

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({email: '', password:''}) 

    const [remember, setRemember] = React.useState({checked: false, creds: null})
    const [authProgress, setAuthProgress] = React.useState(false)
    

    const handleChange = (event) => {
        setRemember({checked: event.target.checked, creds: credentials});
    };
    
    const [showPwd, setshowPwd] = useState(false) 

    const handleClickShowPassword = () => {
        setshowPwd(!showPwd);
    };

    const setCred = (key, val) => {
        setCredentials({...credentials, [key]: val})
    }

    const saveCredentials = () => {
        if (remember.checked) {
            localStorage.setItem("credentials", JSON.stringify(credentials))
        } 
    }

    
    useEffect(() => {
        //userRef.current.focus();
        const LSCred = JSON.parse(localStorage.getItem('credentials'))
        if (LSCred) {
            setCredentials(LSCred)
        }
    }, [])
    

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
        //setState({...state, progression: true})
        setAuthProgress(true)
        await client.authenticate({strategy: 'local', ...credentials});
        const {user, accessToken} = await client.get('authentication');
       
         localStorage.setItem('username', user.username) // Nom à afficher en tooltip de Account
         localStorage.setItem('user_service', user.service ? user.service.designation : "")
         saveCredentials() // mise en localstorage si rememberMe est coché
         const profilNames = user.user_profils.map(p => p.name)
        
        if ( (profilNames.includes('superadmin')) ) {
            setState({...state, progression: false, isAdmin: true })
            setAuthProgress(false)
            navigate("/administration", { replace: true })
        } else {
            setState({...state, progression: false, isAdmin: false })
            setAuthProgress(false)
            navigate("/workspace", { replace: true })
        }
    } catch (error) {
        console.log('ERROR: ', error)
        setAuthProgress(false)
        setState({...state, alertProps: {...state.alertProps, open: true, message: 'Echec connection' }})
    }
    
  }

  const getAuth = async () => {
    const authData = await client.get('authentication');
    console.log('authData Auth :', authData);
  }

  return (
    <div className="auth-full-page-content p-md-5 p-4">
        <div className="w-100">
            <div className="d-flex flex-column h-100">
                <div className="mb-4 mb-md-5 d-flex justify-content-center">
                    <a href="/" className="d-block auth-logo">
                        <LogoAderiz />
                    </a>
                </div>
                <div className="my-auto">
                    <Box  sx={{width: '100%', marginLeft: '5px'}}>
                        {/* <GlobalProgress progression={state.progression}/> */}
                        <GlobalProgress progression={authProgress}/>
                    </Box>
                    <MyAlert {...state.alertProps} severity="error" />
                    <div className='d-flex justify-content-center'>
                        {/* <h3 className="text-primary">Authentification</h3> */}
                        <Typography variant="h6" style={{color: 'green'}} gutterBottom component="div">
                            Authentification
                        </Typography>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <p className="text-muted">Veuillez entrer vos parametres d'authentification </p>
                    </div>

                    <div className="mt-4">
                        
                        <form noValidate>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email (code utilisateur)</label>
                                <input  type="text" onChange={(e) => setCred('email', e.target.value)} value={credentials.email} className="form-control" id="email" placeholder="Entrer votre email"/>
                            </div>
                            <div className="mb-3">
                                {/* ------------------------------------ */}
                                {/* <div className="float-end">
                                    <Link component="button" variant="body2"
                                      onClick={() => change_component('reset')} 
                                      className="text-muted"
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                </div> */}
                                {/* ------------------------------------------ */}
                                <label className="form-label">Mot de passe</label>
                                <div className="input-group auth-pass-inputgroup">
                                    <input  type={showPwd ? 'text' : 'password'} onChange={(e) => setCred('password', e.target.value)} value={credentials.password} className="form-control" placeholder="Entrer votre password" aria-label="Password" aria-describedby="password-addon"/>
                                    <button className="btn btn-light " type="button" id="password-addon" onClick={() => handleClickShowPassword()}>
                                        {showPwd ? (<i className="mdi mdi-eye"></i>) : (<i className="mdi mdi-eye-off"></i>)}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="float-start">
                                {/* <button type="button" onClick={() => change_component('reset')} >  Mot de passe oublié ? </button> */}
                                    <Link component="button" variant="body2" onClick={() => change_component('reset')} 
                                      className="text-muted">
                                         Mot de passe oublié ?  
                                    </Link>
                                </div>
                            </div>
                            <br/>

                            <div className="form-check float-start w-100">
                                <FormControlLabel 
                                    control={
                                        <Checkbox
                                        disabled={!credentials.email || !credentials.password}
                                        checked={remember.checked}
                                        color='success'
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Souvenez-vous de moi" 
                                />
                            </div>
                            <br/>
                        <div className="mt-3">
                                <button onClick={(e) => onSubmit(e)} className="btn btn-success waves-effect waves-light w-100" type="button"> Connection </button>
                        </div>
                        <SocialAuth/>
                        </form>

                        <div className="mt-5 text-center" style={{display: 'none'}}>
                            <p>
                                Vous n'avez pas de compte ? &nbsp;&nbsp;
                                <a href="#!" onClick={() => change_component('register')} className="fw-medium text-primary"> Créer votre compte </a>
                            </p>
                        </div>
                    </div>
                </div>
            
            </div>
            
        </div>
    </div>
  )
}

export default Login


