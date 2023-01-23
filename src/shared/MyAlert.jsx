import React, {useContext} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Context } from './Store';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyAlert = ({open, severity="success", message }) => {

  const [state, setState] = useContext(Context)

  const handleClose = () => {
    setState({ ...state, alertProps: {...state.alertProps, open: false, message: '' } });
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={handleClose} >
        <Alert severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
    </Snackbar>
  )
}

export default MyAlert