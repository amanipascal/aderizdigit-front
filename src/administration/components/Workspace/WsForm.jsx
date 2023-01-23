import React, {useContext} from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Button} from '@mui/material';
import TextInput from '../../../shared/formik/material-ui-inputs/Textinput'
import { client , authenticated} from '../../../shared/feathersjs';
import { Context } from '../../../shared/Store';
import FormDialog from '../../../shared/FormDialog';


const WsForm = ({handleClose, open, dataToUpdate }) => {
    const [state, setState] = useContext(Context)


    let initialValues = {
        path: dataToUpdate ? dataToUpdate.path : '',
        designation: dataToUpdate ? dataToUpdate.designation : '',
        description: dataToUpdate ? dataToUpdate.description : '',
    }
    const ValidationSchema = Yup.object({
        path: Yup.string().required('Valeur obligatoire !'),
        designation: Yup.string().required('Valeur obligatoire !'),
    })

    const OnSubmit = (values) => {
        setState({...state, progression: true})
        if (authenticated()) {
            if (!dataToUpdate) {
                client.service("ws").create(values).then(ws => {
                    const {__v, updatedAt, ...rest} = ws
                    setState({
                        ...state, 
                        wslist: [...state.wslist, rest], 
                        progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Espace de travail créé avec success !' }
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
                client.service("ws").patch(dataToUpdate._id, values).then(ws => {
                    setState({ ...state, wslist: [...state.wslist.map(p => p._id == ws._id ? ws : p)],  progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Espace modifié avec success !' }
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
    <FormDialog open={open} title={"Gestion des Espaces de travail"}>
    <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit= {(values) =>  OnSubmit(values) }
    >
         {
            (formik) => {
                return (
                    <Form>
                        <TextInput label="Path" name="path" type="text" placeholder="Path routage"/>
                        <TextInput label="Designation" name="designation" type="text" placeholder="designation"/>
                        <TextInput label="Description" name="description" type="text" placeholder="Description"/>
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

export default WsForm