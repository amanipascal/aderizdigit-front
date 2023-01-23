import React from 'react'
// import { makeStyles } from '@mui/material/styles';
import {useField} from 'formik'
import Grid from '@mui/material/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,  KeyboardDatePicker} from '@mui/material/pickers';

// const useStyles = makeStyles((theme) => ({
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
// }));
function MyDatepicker(props) {
    // const classes = useStyles();
    const [field, meta] = useField(props);
    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        {...field}
                        {...props}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            {meta.touched && meta.error ? (<div style={{color: 'red'}}>{meta.error}</div>) : null}
        </>
    )   
}

export default MyDatepicker
// format="MM/dd/yyyy"
// value={selectedDate}
// onChange={handleDateChange}