import React, {useContext, useState} from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Button} from '@mui/material';
import TextInput from '../../../shared/formik/material-ui-inputs/Textinput'
// import { feathersClient } from '../../../shared/restClient';
import { client , authenticated} from '../../../shared/feathersjs';
import { Context } from '../../../shared/Store';
import FormDialog from '../../../shared/FormDialog';



const ServiceForm = ({handleClose, open, dataToUpdate }) => {
    const [state, setState] = useContext(Context)

    


    let initialValues = {
        designation: dataToUpdate ? dataToUpdate.designation : '',
        abreviation: dataToUpdate ? dataToUpdate.abreviation : '',
    }
    const ValidationSchema = Yup.object({
        designation: Yup.string().required('Valeur obligatoire !')
    })

    

    const OnSubmit = (values) => {
        setState({...state, progression: true})
        if (authenticated()) {
            if (!dataToUpdate) {
                client.service("user-service").create(values).then(service => {
                    const {__v, updatedAt, ...rest} = service
                    setState({
                        ...state, 
                        Servicelist: [...state.Servicelist, rest], 
                        progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Service créé avec success !' }
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
                client.service("user-service").patch(dataToUpdate._id, values).then(service => {
                    setState({ ...state, Servicelist: [...state.Servicelist.map(p => p._id == service._id ? service : p)],  progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Service modifié avec success !' }
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
                        <TextInput label="Designation" name="designation" type="text" placeholder="Designation du service"/>
                        <TextInput label="Abreviation" name="abreviation" type="text" placeholder="Abreviation du nom"/>
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

export default ServiceForm