import React, { Fragment } from 'react'
import LogoAderiz from '../../shared/logo_aderiz'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Alert, Button, InputAdornment, Typography } from '@mui/material';
import TextInput from '../../shared/formik/material-ui-inputs/Textinput';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { client } from '../../shared/feathersjs';

const Pwdreset = ({change_component}) => {

    const [showAlert, setShowAlert] = React.useState({show:false, severity: null, message: ""})

    const initialValues = {
        email: ""
    }

    
    const ValidationSchema = Yup.object({
        email:  Yup.string().email('email non convenable').required('Valeur obligatoire'),
    })

    const OnSubmit = (values) => {
        client.service('forgot-password').create(values).then(backdata => {
            if (backdata.status == "success") {
                setShowAlert({show: true, severity: "success", message: `Un lien de re-initialisation a été envoyé a votre email ${values.email}.  Veuillez vous y rendre pour continuer le processus de re-initialisation de votre mot de passe. Merci!`})
            } else if (backdata.status == "error")  {
                setShowAlert({show: true, severity: "error", message: `Le processus de re-initialisation a echoué. Votre email ${values.email} n'existe peut-être pas ou ne correspond à aucun utilisateur.`})
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
                            {/* <h3 className="text-primary"> Re-initialisation  </h3> */}
                            <Typography variant="h6" style={{color: 'green'}} gutterBottom component="div">
                                Re-initialisation 
                            </Typography>
                        </div>
                        <div className="mt-4">
                            {
                               !showAlert.show ? (
                                <Alert icon={false} severity="info" >
                                    Entrez votre email pour recevoir les instructions de re-initialisation de votre mot de passe.
                                </Alert>
                               ) : (<Alert severity={showAlert.severity} variant="filled" onClose={() => setShowAlert({show:false, severity: null, message: ""})}>
                                    {showAlert.message}
                                </Alert>)
                            }
                            <Formik
                                    initialValues={initialValues}
                                    validationSchema={ValidationSchema}
                                    onSubmit= {(values) => OnSubmit(values)  }
                                >
                                    {
                                        (formik) => {
                                            return (
                                                <Form>
                                                    <TextInput label="Votre email" name="email" type="text" placeholder="Email (code utilisateur)"
                                                        startAdornment={<InputAdornment position="start"> <AccountCircleIcon /> </InputAdornment>}
                                                    />
                                                    
                                                     <Button type="submit" variant="contained" disabled={ !(formik.isValid) }  style={{textTransform: 'none', marginTop: '20px', backgroundColor: 'green'}} >
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

export default Pwdreset
