import React, { Fragment, useContext } from 'react'
import LogoAderiz from '../../shared/logo_aderiz'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, InputAdornment } from '@mui/material';
import PasswordInput from '../../shared/formik/material-ui-inputs/passwordInput';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Context } from '../../shared/Store';
import { useNavigate } from 'react-router-dom';
import { client } from '../../shared/feathersjs';


const PwdRenew = ({change_component, resetValues}) => {

    const [state, setState] = useContext(Context)

    let navigate = useNavigate();

    const initialValues = {
        password: "",
        passwordConfirm: ""
    }

    
    const ValidationSchema = Yup.object({
        password:  Yup.string().min(8, '8 caracteres minimum requis').required('valeur obligatoire'),
        passwordConfirm: Yup.string().required('Confirmation obligatoire !').oneOf([Yup.ref('password'), null], 'La confirmation est incorrect'),
    })

    const OnSubmit = (values) => {
        const data = {password: values.password, resetToken: resetValues.token}
        client.service('reset-password').create(data).then(backdata => {
            console.log('backdata : ', backdata)
            if (backdata.status == "error") {
                setState({...state, alertProps: {...state.alertProps, open: true, severity: 'error',  message: backdata.msg }})
            } else if (backdata.status == "success") {
                setState({...state, alertProps: {...state.alertProps, open: true, severity: 'success',  message: backdata.msg }})
                navigate('/authenticate')
            }
        })
    }

  return (
    <Fragment>
        <div className="auth-full-page-content p-md-5">
            <div className="w-100">
                <div className="d-flex flex-column h-100">
                    <div className="mb-2 mb-2 md-5 d-flex justify-content-center">
                        <LogoAderiz />
                    </div>
                    <div className="my-auto">
                        <div className='d-flex justify-content-center'>
                            <h3 className="text-primary"> Nouveau mot de passe  </h3>
                        </div>
                        <div className="mt-4">
                            <div className="alert alert-success text-center mb-4" role="alert">
                                Définition et confirmation votre nouveau mot de passe.
                            </div>
                            <Formik
                                    initialValues={initialValues}
                                    validationSchema={ValidationSchema}
                                    onSubmit= {(values) => OnSubmit(values)  }
                                >
                                    {
                                        (formik) => {
                                            return (
                                                <Form>
                                                    <PasswordInput 
                                                        label="Votre mot de passe"
                                                        name="password"
                                                        startAdornment={
                                                        <InputAdornment position="start"> 
                                                            <VpnKeyIcon fontSize="small" color="primary"/> 
                                                        </InputAdornment>
                                                        }
                                                    />
                                                    <PasswordInput 
                                                        label="Confirmer votre mot de passe"
                                                        name="passwordConfirm"
                                                        startAdornment={
                                                        <InputAdornment position="start"> 
                                                            <VpnKeyIcon fontSize="small" color="primary"/> 
                                                        </InputAdornment>
                                                        }
                                                    />
                                                     <Button type="submit" variant="contained" disabled={ !(formik.isValid) } style={{textTransform: 'none', marginTop: '20px', backgroundColor: 'green'}} >
                                                        Valider
                                                    </Button>
                                                </Form>
                                            )
                                        }
                                    }
                            </Formik>
                            <div className="mt-5 text-center">
                                <p>
                                    Vous souvenez-vous ? &nbsp;&nbsp;
                                    <a href="javascript::void()" onClick={() => change_component('login')} className="fw-medium text-primary"> Authentifier-vous </a> 
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

export default PwdRenew

// <form>
// <div className="mb-3">
//     <label for="password" className="form-label">Email</label>

//     <div className="input-group auth-pass-inputgroup">
//         <input  type={showPwd ? 'text' : 'password'} id="password" name="password" onChange={(e) => {}} className="form-control" placeholder="Entrez votre nouveau mot de passe" aria-label="Password" aria-describedby="password-addon"/>
//         <button className="btn btn-light " type="button" id="password-addon" onClick={() => handleClickShowPassword()}>
//             {showPwd ? (<i className="mdi mdi-eye"></i>) : (<i className="mdi mdi-eye-off"></i>)}
//         </button>
//     </div>
    
// </div>
// <div className="mb-3">
//     <label for="ConfirmPwd" className="form-label">Email</label>
//     <div className="input-group auth-pass-inputgroup">
//         <input  type={showPwd ? 'text' : 'password'} id="ConfirmPwd" name="ConfirmPwd" onChange={(e) => {}} className="form-control" placeholder="Confirmez votre nouveau mot de passe" aria-label="Password" aria-describedby="password-addon"/>
//         <button className="btn btn-light " type="button" id="password-addon" onClick={() => handleClickShowPassword()}>
//             {showPwd ? (<i className="mdi mdi-eye"></i>) : (<i className="mdi mdi-eye-off"></i>)}
//         </button>
//     </div>
// </div>

// <div className="text-end">
//     <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Valider</button>
// </div>

// </form>
