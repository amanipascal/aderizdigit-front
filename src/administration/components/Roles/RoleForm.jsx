import React, {useContext} from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Button} from '@mui/material';
import TextInput from '../../../shared/formik/material-ui-inputs/Textinput'
// import { feathersClient } from '../../../shared/restClient';
import { client , authenticated} from '../../../shared/feathersjs';
import { Context } from '../../../shared/Store';
import FormDialog from '../../../shared/FormDialog';


const RoleForm = ({handleClose, open, dataToUpdate }) => {
    const [state, setState] = useContext(Context)


    let initialValues = {
        name: dataToUpdate ? dataToUpdate.name : '',
    }
    const ValidationSchema = Yup.object({
        name: Yup.string().required('Valeur obligatoire !')
    })

    const OnSubmit = (values) => {
        setState({...state, progression: true})
        if (authenticated()) {
            if (!dataToUpdate) {
                client.service("profil").create(values).then(profil => {
                    const {__v, updatedAt, ...rest} = profil
                    setState({
                        ...state, 
                        Profilelist: [...state.Profilelist, rest], 
                        progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Profile créé avec success !' }
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
                client.service("profil").patch(dataToUpdate._id, values).then(profil => {
                    setState({ ...state, Profilelist: [...state.Profilelist.map(p => p._id == profil._id ? profil : p)],  progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Profil modifié avec success !' }
                    })
                    handleClose()
                }).catch(err => {
                    setState({
                        ...state, 
                        progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Echec de modification !' }
                    })
                })
            }
      
        } else {
            setState({...state, progression: false})
        }
    }

  return (
    <FormDialog open={open} title={"Gestion des profils"}>
    <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit= {(values) =>  OnSubmit(values) }
    >
         {
            (formik) => {
                return (
                    <Form>
                        <TextInput label="Profil" name="name" type="text" placeholder="Profil / Role"/>
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

export default RoleForm