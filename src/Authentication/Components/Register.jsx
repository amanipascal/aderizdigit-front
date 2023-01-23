import React, { Fragment } from 'react'
import LogoAderiz from '../../shared/logo_aderiz'
import SocialAuth from './SocialAuth'

const Register = ({change_component}) => {
  return (
    <Fragment>
        <div className="auth-full-page-content p-md-5 p-4">
            <div className="w-100">
                <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5 d-flex justify-content-center" style={{border: '1px red solid'}}>
                        <LogoAderiz />
                    </div>
                    <div className="my-auto">
                        <div>
                            <h5 className="text-primary">Créer votre compte</h5>
                        </div>

                        <div className="mt-2">
                            <form className="needs-validation" novalidate>
                                <div className="mb-3">
                                    <label for="useremail" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="useremail" placeholder="Enter email" required />  
                                    <div className="invalid-feedback">
                                    Veuillez Entrez votre Email
                                    </div>        
                                </div>
        
                                <div className="mb-3">
                                    <label for="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" placeholder="Enter username" required />
                                    <div className="invalid-feedback">
                                       Veuillez Entrez votre nom utilisateur
                                    </div>  
                                </div>
        
                                <div className="mb-3">
                                    <label for="userpassword" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="userpassword" placeholder="Enter password" required />
                                    <div className="invalid-feedback">
                                    Veuillez Entrez votre mot de passe
                                    </div>       
                                </div>
                                
                                <div className="mt-2 mb-3 d-grid">
                                    <button className="btn btn-primary waves-effect waves-light" type="submit">Register</button>
                                </div>
    
                                <SocialAuth/>
                            </form>

                            <div className="mt-3 text-center">
                                <p>J'ai déjà un compte. 
                                    <a href="javascript::void()" onClick={() => change_component('login')} classNameName="fw-medium text-primary">Login</a> 
                                </p>
                            </div>

                        </div>
                    </div>

                    
                </div>
                
                
            </div>
        </div>
    </Fragment>
    
  )
}

export default Register

{/* <a href="javascript::void()" onClick={() => change_component('login')} classNameName="fw-medium text-primary">Login</a> */}