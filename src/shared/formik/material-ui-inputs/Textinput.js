import React from 'react'
import { FormControl, Input, InputLabel } from '@mui/material';
import { useField  } from 'formik';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

const Theme = createTheme();

const useStyles = makeStyles(theme => ({
    margin: {
        margin: Theme.spacing(2,0,0,0),
    }
}))

const TextInput = ({ label, ...props }) => {
    const classes = useStyles()

    const [field, meta] = useField(props);

    return (
        <FormControl className={classes.margin} fullWidth>
            <InputLabel htmlFor={props.id || props.name}>{label}</InputLabel>
            <Input {...field} {...props} className={classes.margin} />
            {meta.touched && meta.error ? (<div style={{color: 'red'}}>{meta.error}</div>) : null}
        </FormControl>
    )
}

export default TextInput
