import React, {useEffect, useContext} from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
// import { feathersClient } from '../../../shared/restClient'; 
import { client , authenticated} from '../../../shared/feathersjs';
import FormDialog from '../../../shared/FormDialog';
import { Context } from '../../../shared/Store';
import RolesList from './RolesList';
import RoleForm from './RoleForm';

const Roles = () => {

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

  const getProfiles = async () => {
    setState({...state, progression: true})
    if (authenticated()) {
      await client.service('profil').find({}).then(resp => {
        setState({...state, Profilelist: [
          ...resp.data.map(item => {
            const {__v, updatedAt, profil_menus, menus, ...rest} = item
            return rest
          })
        ]})
  
      }).catch(err => setState({...state, progression: false}))

    } else {
      setState({...state, progression: false})
    }
    
  }

  useEffect(() => {
    getProfiles()
  }, [])
  


  return (
    <React.Fragment>
      <RoleForm handleClose={handleClose} open={openForm} dataToUpdate={updateData} />
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
              <Typography variant="h6">Liste des profiles utilisateurs</Typography> 
            </Grid>
          </Grid>
          {/* End List head */}
   
          <Box sx={{height: '90%'}}>
            <RolesList List={state.Profilelist} handleClickOpen={handleClickOpen} /> 
          </Box>

        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Roles;