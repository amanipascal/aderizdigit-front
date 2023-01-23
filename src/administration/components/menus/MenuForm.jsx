import React, {useContext, useState, useEffect} from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Button, InputAdornment} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextInput from '../../../shared/formik/material-ui-inputs/Textinput'
import {client, authenticated} from '../../../shared/feathersjs';
import { Context } from '../../../shared/Store';
import SelectInput from '../../../shared/formik/material-ui-inputs/selectInput';
import Textarea_input  from '../../../shared/formik/material-ui-inputs/Textarea_input';
import FormDialog from '../../../shared/FormDialog';



const MenuForm = ({handleClose, open, dataToUpdate }) => {

    const [state, setState] = useContext(Context)
    const [oldMenus, setOldMenus] = useState([])



    let initialValues = {
        lib: dataToUpdate ? dataToUpdate.lib : '',
        parentId: dataToUpdate ? dataToUpdate.parentId : '',
        ordre: dataToUpdate ? dataToUpdate.ordre : '',
        wsdesignation: dataToUpdate ? dataToUpdate.wsdesignation : '',
        wsdescription: dataToUpdate ? dataToUpdate.wsdescription : '',
    }
    
    const ValidationSchema = Yup.object({
        lib: Yup.string().required('Libelle menu requis'),
        ordre: Yup.number().required('l\'ordre est obligatoire'),
        wsdesignation: Yup.string().required('Designation obligatoire'),
    })

   

    useEffect(() => {
        if (authenticated()) {
            client.service("menu").find({}).then(resp => {
                if (resp.data.length) {
                    setOldMenus([
                        ...resp.data.map(item => {
                            return {
                                value:item._id,
                                label: item.lib
                            }
                        })
                    ])
                }
            })
            
        }
    }, [])



    const OnSubmit = async (values) => {
        setState({...state, progression: true})
        if (authenticated()) {
            if (!dataToUpdate) {
                client.service("menu").create(values).then(menu => {
                    const {__v, updatedAt, wsdescription, ...rest} = menu
                    setState({ ...state, menulist: [...state.menulist, rest],  progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Menu créé avec success !' }
                    })
                    handleClose()
                }).catch(err => {
                    setState({ ...state, progression: false, alertProps: {...state.alertProps, open: true, message: 'Echec de création !' }
                    })
                })
            } else {
                client.service("menu").patch(values._id, values).then(async item => {
                    const {__v, updatedAt,  wsdescription, ...menu} = item
                    setState({ ...state, menulist: [...state.menulist.map(m => m._id == menu._id ? menu : m)],  progression: false,
                        alertProps: {...state.alertProps, open: true, message: 'Menu modifié avec success !' }
                    })
                    handleClose()
                }).catch(err => {
                    console.log('ERR: ', err)
                })
            }

        } else {
            setState({...state, progression: false})
        }
        
    }

    
  return (
    <FormDialog open={open} title={"Gestion des menus"}>
    <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit= {(values) => {
            const Vals = dataToUpdate ? {...dataToUpdate, ...values} : values
            OnSubmit(Vals) 
        }  }
    >
         {
            (formik) => {
                return (
                    <Form>
                        <TextInput label="Libelle" name="lib" type="text" placeholder="Libelle du menu"
                            startAdornment={<InputAdornment position="start"> <AccountCircleIcon /> </InputAdornment>
                            }
                        />
                        
                        <SelectInput label="Est sous-menu de:" name="parentId" options={oldMenus} />
                        <br/>
                        
                        <TextInput label="Designation espace" name="wsdesignation" type="text" placeholder="Designation du workspace"/>
                        
                        <Textarea_input label="Description espace" name="wsdescription" type="text" placeholder="Description du workspace"/>
                        
                        <TextInput label="Ordre du menu" name="ordre" type="number" placeholder="Spécifier l'ordre du menu"/>

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

export default MenuForm
