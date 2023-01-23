import React from 'react'
import { createTheme, FormControl, InputLabel, Select } from '@mui/material';
import { useField  } from 'formik';
import { makeStyles } from '@mui/styles';

const Theme = createTheme();

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: Theme.spacing(1),
      minWidth: '200px',
    },
    selectEmpty: {
      margin: Theme.spacing(2,0,0,0),
    },
    errormsg: {
        color: 'red'
    }
  }));

function MySelectInput({label, options, ...props}) {

    const classes = useStyles();

    const [field, meta] = useField(props);

    return (
        <FormControl className={classes.formControl} variant="filled" fullWidth>
            <InputLabel id={props.id || props.name}> {label} </InputLabel>
            <Select native {...field} {...props} >
                <option aria-label="None" value={null} />
                {
                    options.length > 0 && options.map((item, index) => (
                      <option key={index} value={item.value}>{item.label}</option>
                    ))
                }
            </Select>
            {meta.touched && meta.error ? ( <div className={classes.errormsg}>{meta.error}</div>) : null}
      </FormControl>
    )
}

export default MySelectInput
