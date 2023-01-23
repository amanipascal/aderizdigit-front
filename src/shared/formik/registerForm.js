import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, InputAdornment } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import TextInput from './inputs/Textinput';
import PasswordInput from './inputs/passwordInput';
import RadioGroupInput from './inputs/radioGroupInput';
import SelectInput from './inputs/selectInput';
import CheckBox from './inputs/checkBox';
import TextField from '@material-ui/core/TextField';
import LocalizedDatePicker from './inputs/localizedDatePicker';


// user_name: '',
// user_numcell: '',
// user_secteur: '',
// user_password: '',
// confirm_password: '',


const InitialValues = {
    user_email: '',
    user_password: '',
    genre: '',
    secteur: '',
    accepte: '',
    dateAnniv: new Date()
}

const ValidationSchema = Yup.object({
    user_email: Yup.string()
    .email('Email invalid')
    .min(15, 'minimum 30 caracteres')
    .max(40, 'Maximum 40 caracteres')
    .required('Donnée requise'),
    user_password: Yup.string('Mot de passe requis')
    .min(8, 'Minimum 8 caracteres requis').required('valeur obligatoire'),
    genre: Yup.string().required('Genre requis'),
    secteur: Yup.string().required('valeur requise !!'),
    accepte: Yup.boolean(),
    dateAnniv: Yup.date(), 
})

const RegisterForm = () => {
    
    return (
        <>
            <Formik
                initialValues={InitialValues}
                validationSchema={ValidationSchema}
                onSubmit= {(values) => {
                    alert(JSON.stringify(values, null, 2));
                }}
            >
               
                <Form>
                    <TextInput  
                        label="Votre email"
                        name="user_email"
                        type="text"
                        placeholder="Email"
                        startAdornment={
                            <InputAdornment position="start">
                            <AccountCircle />
                            </InputAdornment>
                        }
                    />
                    <PasswordInput 
                        label="Mot de passe"
                        name="user_password"
                        placeholder="Mot de passe"
                    />
                    <RadioGroupInput
                        label="Genre"
                        name='genre'
                        options={[
                            {value: 'female', label: 'Female'},
                            {value: 'male', label: 'Male'},
                            {value: 'other', label: 'Other'}
                        ]}
                    />
                    <SelectInput
                        label="Secteur d'activité"
                        name='secteur'
                        options={[
                            {value: 'AGRO', label: 'Agro-alimentaire'},
                            {value: 'IT', label: 'Informatique/Telecom'},
                            {value: 'FIN', label: 'Banque/ Finance'}
                        ]}
                    />
                    <CheckBox
                        name="accepte"
                        label="accepte"
                    />
                   
                    <div style={{width:'100%', marginTop:'20px', paddingLeft:'10px'}}>
                        <Button type="submit" variant="contained" color="secondary" style={{textTransform: 'none'}}> Submit </Button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default RegisterForm
 {/* <MyDatepicker  
    id="dateAnniv"
    name="dateAnniv"
    format="MM/dd/yyyy"
/> */}