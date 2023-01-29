import React, { Fragment, useState, useEffect, useContext } from 'react'


import "../assets/css/bootstrap.min.css"
import "../assets/css/icons.min.css"
import "../assets/css/app.css"
import "../assets/libs/owl.carousel/assets/owl.carousel.min.css"
import "../assets/libs/owl.carousel/assets/owl.theme.default.min.css"

import Login from './Components/Login';
import Register from './Components/Register'
import Pwdreset from './Components/Pwdreset'
import { Row } from 'simple-flexbox';
import MyAlert from '../shared/MyAlert'
import { Context } from '../shared/Store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { client } from '../shared/feathersjs'
import queryString from 'query-string'
import PwdRenew from './Components/PwdReNew'
import { Alert } from 'bootstrap'



const AuthLayout = () => {
//     let location = useLocation();

//     const getAuth = async () => {
//         const authData = await client.get('authentication');
//         console.log('authData auth :', authData);
//       }
//   React.useEffect(() => {
//     console.log('location auth :', location);
//     getAuth()
//   }, [location]);

  
  const [state] = useContext(Context)

  const [authcomp, setAuthcomp] = useState('')
  const [resetValues, setResetValues] = useState(null)

  const { search } = useLocation()
  
  const change_component = (compName) => {
    // alert('OK')
    setAuthcomp(compName)
  }

  
  useEffect(() => {
    setAuthcomp('login')
  }, [])

  React.useEffect(() => {
    const values = queryString.parse(search)
    if (values.action === 'resetPwdLong' && values.token) {
        setResetValues(values)
        setAuthcomp('pwdRenew') 
    }
  }, [search])


  const TheRightAuthComp = () => {
    switch (authcomp) {
      case 'login': return (<Login change_component={change_component} />)
      case 'register': return (<Register change_component={change_component} />)
      case 'reset': return (<Pwdreset change_component={change_component}/>)
      case 'pwdRenew': return (<PwdRenew change_component={change_component} resetValues={resetValues} />)
      default: return (<Login change_component={change_component}/>)
    }
  }

  
  return (
    <Fragment>
      <div className="auth-body-bg">
        <div>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-xl-3">
                        <MyAlert {...state.alertProps} />
                        <TheRightAuthComp/>
                    </div>
                    <div className="col-xl-9">
                        <div className="auth-full-bg pt-lg-5 p-4">
                            <div className="w-100">
                                <Row className="bg-overlay" horizontal='center' vertical='center' style={{ paddingTop: '5px'}}>
                                    <Row horizontal='center'  style={{ width: '100%'}}>
                                        <div style={{fontSize: '50px', color: 'white'}}>LA PLATEFORME DIGITALE </div>
                                    </Row>
                                </Row>
                                <div className="d-flex h-100 flex-column">
                                    <div className="p-4 mt-auto" >

                                        <div className="row justify-content-center">
                                            <div className="col-lg-7">
                                                <div className="text-center">
                                                    <h1 className="mb-3">
                                                        {/* <i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i> */}
                                                        {/* <span className="" style={{color: '#fa8231'}}>LA PLATE-FORME DIGITALE </span> */}
                                                    </h1>
                                                    <div dir="ltr">
                                                        <div className="owl-carousel owl-theme auth-review-carousel" id="auth-review-carousel">
                                                            <div className="item">
                                                                <div className="py-3">
                                                                    <p className="font-size-16 mb-4">" Fantastic theme with a ton of options. If you just want the HTML to integrate with your project, then this is the package. You can find the files in the 'dist' folder...no need to install git and all the other stuff the documentation talks about. "</p>
    
                                                                    <div>
                                                                        <h4 className="font-size-16 text-primary">Abs1981</h4>
                                                                        <p className="font-size-14 mb-0">- Skote User</p>
                                                                    </div>
                                                                </div>
                                                            </div>
    
                                                            <div className="item">
                                                                <div className="py-3">
                                                                    <p className="font-size-16 mb-4">" If Every Vendor on Envato are as supportive as Themesbrand, Development with be a nice experience. You guys are Wonderful. Keep us the good work. "</p>
                                                                    <div>
                                                                        <h4 className="font-size-16 text-primary">nezerious</h4>
                                                                        <p className="font-size-14 mb-0">- Skote User</p>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </Fragment>
  )
}

export default AuthLayout