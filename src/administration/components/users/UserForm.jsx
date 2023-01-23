import React, {useContext} from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Button, InputAdornment} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import TextInput from '../../../shared/formik/material-ui-inputs/Textinput'
import PasswordInput from '../../../shared/formik/material-ui-inputs/passwordInput'
import {client, authenticated} from '../../../shared/feathersjs';
import { Context } from '../../../shared/Store';
import FormDialog from '../../../shared/FormDialog';
import SelectInput from '../../../shared/formik/material-ui-inputs/selectInput';

const UserForm = ({handleClose, open, dataToUpdate}) => {

    const [state, setState] = useContext(Context)

    const [services, setServices] = React.useState([])

    const initialValues = !dataToUpdate ? {
        email: '',
        username: '',
        service_id: '',
        password: '',
        passwordConfirm: ''
    } : {
        email: dataToUpdate.email,
        username: dataToUpdate.username,
        service_id: dataToUpdate.service_id,
    }

    const ValidationSchema = Yup.object({
        email: Yup.string().email('Email invalid').required('Donnée requise'),
        username: Yup.string().required('username requis'),
        password: dataToUpdate ? "" : Yup.string('Mot de passe requis').min(8, 'Minimum 8 caracteres requis').required('valeur obligatoire'),
        passwordConfirm: dataToUpdate ? "" : Yup.string().required('Valeur obligatoire !').oneOf([Yup.ref('password'), null], 'Les passwords doivent correspondre'),
    })

    
    React.useEffect(() => {
        if (authenticated()) {
            client.service("user-service").find({}).then(resp => {
                if (resp.data.length) {
                    setServices([
                        ...resp.data.map(item => {
                            return {
                                value:item._id,
                                label: item.designation
                            }
                        })
                    ])
                }
            })
            
        }
    }, [])


    const OnSubmit = (values) => {
        const {passwordConfirm, ...data} = values
        setState({...state, progression: true})
        if (authenticated()) {
            if (!dataToUpdate) {
                client.service("users").create(data).then(user => {
                    // const {__v, updatedAt, menus, ...rest} = user
                    const {__v, updatedAt, user_profils, user_menus, service_id, menus, resetExpires, resetToken, ...rest} = user
                    setState({
                        ...state, 
                        userlist: [...state.userlist, rest], 
                        progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Utilisateur créé avec success !' }
                    })
                    handleClose()
                }).catch(err => {
                    setState({
                        ...state, 
                        progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Echec de création !' }
                    })
                })
            } else {
                client.service("users").patch(dataToUpdate._id, values).then(user => {
                    // const {__v, updatedAt, menus, service_id, ...rest} = user
                    const {__v, updatedAt, user_profils, user_menus, service_id, menus, resetExpires, resetToken, ...rest} = user
                    setState({
                        ...state, 
                        userlist: [...state.userlist.map(u => u._id == user._id ? user : u)], 
                        progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Utilisateur modifié avec success !' }
                    })
                    handleClose()
                }).catch(err => {
                    setState({
                        ...state, 
                        progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Echec de la modification !' }
                    })
                })
            }
            
        } else {
            setState({...state, progression: false})
        }
        
    }

  return (
    <FormDialog open={open} title={"Gestion des utilisateurs"}>
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
                            startAdornment={<InputAdornment position="start"> <AccountCircleIcon /> </InputAdornment>
                            }
                        />
                        <TextInput label="Votre Nom" name="username" type="text" placeholder="Nom utilisateur"/>
                        
                        <SelectInput label="Service d'appartenance:" name="service_id" options={services} />
                        {
                            !dataToUpdate && (
                                <React.Fragment>
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
                                </React.Fragment>
                            )
                        }
                        
                        <Button type="submit" variant="contained" disabled={ !(formik.isValid) } color="secondary" style={{textTransform: 'none', marginTop: '20px'}} >
                            Valider
                        </Button>
                        <Button type="button" onClick={() => handleClose()} variant="contained"  color="error" style={{textTransform: 'none', marginTop: '20px',  marginLeft: '20px'}} >
                            Fermer
                        </Button>
                    </Form>
                )
            }
        }
        
    </Formik>
    </FormDialog>
  )
}

export default UserForm