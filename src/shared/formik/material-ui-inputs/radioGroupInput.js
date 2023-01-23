import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useField  } from 'formik';

function RadioGroupInput({ label,options, ...props }) {
    const [field, meta] = useField(props);
    return (
        <FormControl component="fieldset" disabled={props.disabled? props.disabled : false} >
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup row aria-label={label} name={label} {...props} {...field}>
                {
                    options.length > 0 && options.map((item, index) => (<FormControlLabel key={index} value={item.value} control={<Radio />} label={item.label} />))  
                }
            </RadioGroup>
            {meta.touched && meta.error ? (<div style={{color: 'red'}}>{meta.error}</div>) : null}
        </FormControl>
    )
}

export default RadioGroupInput