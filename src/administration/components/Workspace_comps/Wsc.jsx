import React, {useEffect, useContext} from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { client , authenticated} from '../../../shared/feathersjs';
import { Context } from '../../../shared/Store';
import WscList from './WscList';
import WscForm from './WscForm';

const Wsc = () => {

  const [state, setState] = useContext(Context)

  const [openForm, setOpenForm] = React.useState(false);

  const [updateData, setUpdateData] = React.useState(null);

  const handleClickOpen = (data = null) => {
    if (data) {
      setUpdateData(data)
    }
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setUpdateData(null)
  };

  const getWsc = async () => {
    setState({...state, progression: true})
    if (authenticated()) {
      await client.service('wscomps').find({}).then(resp => {
        setState({...state, wsclist: [
          ...resp.data.map(item => {
            const {__v, updatedAt, createdAt, ...rest} = item
            return rest
          })
        ]})
  
      }).catch(err => setState({...state, progression: false}))

    } else {
      setState({...state, progression: false})
    }
    
  }

  useEffect(() => {
    getWsc()
  }, [])
  


  return (
    <React.Fragment>
      <WscForm handleClose={handleClose} open={openForm} dataToUpdate={updateData} />
      <CssBaseline />
      <Container style={{width: '99% !important'}}>
        <Box sx={{ bgcolor: '#f5f6fa',  borderRadius: '10px', padding: '10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <IconButton aria-label="add" size="large" onClick={() => handleClickOpen(null)}>
                <AddCircleOutlineIcon color='secondary'/>
              </IconButton>
            </Grid>
            <Grid item xs={11} container  alignItems="center">
              <Typography variant="h6">Liste des composants metiers </Typography> 
            </Grid>
          </Grid>
          {/* End List head */}
   
          <Box sx={{height: '90%'}}>
            <WscList List={state.wsclist} handleClickOpen={handleClickOpen} /> 
          </Box>

        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Wsc;