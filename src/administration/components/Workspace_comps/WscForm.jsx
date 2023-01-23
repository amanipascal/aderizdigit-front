import React, {useContext} from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Button} from '@mui/material';
import TextInput from '../../../shared/formik/material-ui-inputs/Textinput'
import MySelectInput from '../../../shared/formik/material-ui-inputs/selectInput'
import { client , authenticated} from '../../../shared/feathersjs';
import { Context } from '../../../shared/Store';
import FormDialog from '../../../shared/FormDialog';



const WscForm = ({handleClose, open, dataToUpdate }) => {
    const [state, setState] = useContext(Context)

    let initialValues = {
        lib: dataToUpdate ? dataToUpdate.lib : '',
        api: dataToUpdate ? dataToUpdate.api : '',
        origin_tool: dataToUpdate ? dataToUpdate.origin_tool : '',
        width: dataToUpdate ? dataToUpdate.width : '',
        height: dataToUpdate ? dataToUpdate.height : '',
    }
    const ValidationSchema = Yup.object({
        lib: Yup.string().required('Valeur obligatoire !'),
        api: Yup.string().required('Valeur obligatoire !'),
        origin_tool: Yup.string().required('Valeur obligatoire !'),
    })

    const OnSubmit = (values) => {
        setState({...state, progression: true})
        if (authenticated()) {
            if (!dataToUpdate) {
                client.service("wscomps").create(values).then(wsc => {
                    const {__v, updatedAt, ...rest} = wsc
                    setState({
                        ...state, 
                        wsclist: [...state.wsclist, rest], 
                        progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Composant créé avec success !' }
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
                client.service("wscomps").patch(dataToUpdate._id, values).then(wsc => {
                    setState({ ...state, wsclist: [...state.wsclist.map(p => p._id == wsc._id ? wsc : p)],  progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Composant modifié avec success !' }
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
    <FormDialog open={open} title={"Gestion des Composants de travail"}>
    <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit= {(values) =>  OnSubmit(values) }
    >
         {
            (formik) => {
                return (
                    <Form>
                        <TextInput label="Libelle composant" name="lib" type="text" placeholder="Libelle composant"/>
                        <TextInput label="Api" name="api" type="text" placeholder="Url du composant"/>
                        {/* <TextInput label="Plateforme d'origine" name="origin_tool" type="text" placeholder="Plateforme d'origine"/> */}
                        <MySelectInput
                            options={[
                                {value: 'monday', label: 'monday'},
                                {value: 'tableau', label: 'tableau'},
                                {value: 'jotform', label: 'jotform'}
                            ]} 
                          label="Plateforme d'origine" name="origin_tool" 
                          />
                        
                        <TextInput label="Largeur" name="width" type="text" placeholder="Largeur"/>
                        <TextInput label="Hauteur d'origine" name="height" type="text" placeholder="Hauteur"/>
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

export default WscForm