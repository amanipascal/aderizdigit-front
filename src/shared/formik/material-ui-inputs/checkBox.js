import React from 'react'
import {useField} from 'formik'
import { Checkbox, FormControlLabel } from '@mui/material';

const CheckBox = ({label, ...props }) => {

    const [field, meta] = useField({ ...props, type: 'checkbox' });

    return (
        <>
            <FormControlLabel
                control={<Checkbox {...field} {...props}  name={label} />}
                label={label}
            />
            {meta.touched && meta.error ? (<div style={{color: 'red'}}>{meta.error}</div>) : null}
        </>
    )
}

export default CheckBox
