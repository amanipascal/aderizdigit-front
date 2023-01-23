import React, {useEffect, useState, useContext} from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import UserList from './UserList';
import Grid from '@mui/material/Grid';
import { client , authenticated} from '../../../shared/feathersjs';
import UserForm from './UserForm';
import FormDialog from '../../../shared/FormDialog';
import { Context } from '../../../shared/Store';


const Users = () => {

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

  const getUsers = async () => {
      setState({...state, progression: true})
      if (authenticated()) {
        await client.service('users').find({}).then(async resp => {
          // console.log('User with service: ', resp.data)
          setState({...state, progression: false, userlist: [
            ...resp.data.map(item => {
              const {__v, updatedAt, user_profils, user_menus, service_id, menus, resetExpires, resetToken, ...rest} = item
              return rest
            })
          ]})
        }).catch(() => {
          setState({...state, progression: false})
        })
      } else {
          setState({...state, progression: false})
      }


  }

  useEffect(() => {
    getUsers()
  }, [])
  


  return (
    <React.Fragment>
      {/* <FormDialog open={openForm} title={"Gestion des utilisateurs"}> */}
        <UserForm handleClose={handleClose}  open={openForm} dataToUpdate={updateData} />
      {/* </FormDialog> */}
      <CssBaseline />
      <Container sx={{ maxHeight: 300 }}>
        <Box sx={{ bgcolor: '#f5f6fa',  borderRadius: '10px', padding: '10px' }}>
          {/* List head */}
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <IconButton aria-label="add" size="large" onClick={() => handleClickOpen(null)}>
                <AddCircleOutlineIcon color='secondary'/>
              </IconButton>
            </Grid>
            <Grid item xs={11} container  alignItems="center">
              <Typography variant="h6">Liste des utilisateurs</Typography> 
            </Grid>
          </Grid>
          {/* End List head */}
   
          <Box sx={{height: '90%'}}>
            <UserList List={state.userlist} handleClickOpen={handleClickOpen}  /> 
          </Box>

        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Users;