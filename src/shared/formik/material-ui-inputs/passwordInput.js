import React, { useState } from 'react'
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import { useField  } from 'formik';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { makeStyles } from '@mui/styles';

import { createTheme } from '@mui/material/styles';

const Theme = createTheme();

const useStyles = makeStyles(theme => ({
    margin: {
        margin: Theme.spacing(2,0,0,0),
    }
}))


const PasswordInput = ({ label, ...props }) => {
    
    const classes = useStyles()

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [field, meta] = useField(props);

    return (
        <FormControl className={classes.margin} fullWidth>
            <InputLabel htmlFor={props.id || props.name}>{label}</InputLabel>
            <Input
             {...field} 
             {...props}
             className={classes.margin}
             type={showPassword ? 'text' : 'password'}
             endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
            }
             />
            {meta.touched && meta.error ? (<div style={{color: 'red'}}>{meta.error}</div>) : null}
        </FormControl>
    )
}

export default PasswordInput
