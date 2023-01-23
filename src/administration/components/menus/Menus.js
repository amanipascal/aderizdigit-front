import React, {useEffect, useState, useContext} from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { client , authenticated} from '../../../shared/feathersjs';
import { Context } from '../../../shared/Store';
import MenuForm from './MenuForm';
import MenuList from './MenuList';


const Menus = () => {

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

  const getMenus = async () => {
      setState({...state, progression: true})
      if (authenticated()) {
        await client.service('menu').find({}).then(async resp => {
          setState({...state, progression: false, menulist: [
            ...resp.data.map(item => {
              const {__v, updatedAt, wsdescription, nested, wscontent, order, ...rest} = item
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
    getMenus()
  }, [])

  useEffect(() => {
    // console.log('updateData : ', updateData)
  }, [updateData])
  


  return (
    <React.Fragment>
      {/* <FormDialog open={openForm} title={"Gestion des menus"}> */}
        <MenuForm handleClose={handleClose} open={openForm} dataToUpdate={updateData} />
      {/* </FormDialog> */}
      <CssBaseline />
      <Container>
        <Box sx={{ bgcolor: '#f5f6fa',  borderRadius: '10px', padding: '10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <IconButton aria-label="add" size="large" onClick={() => handleClickOpen(null)}>
                <AddCircleOutlineIcon color='secondary'/>
              </IconButton>
            </Grid>
            <Grid item xs={11} container  alignItems="center">
              <Typography variant="h6">Liste des menus</Typography> 
            </Grid>
          </Grid>
          {/* End List head */}
   
          <Box sx={{height: '90%', backgroundColor: 'yellowgreen'}}>
            <MenuList List={state.menulist} handleClickOpen={handleClickOpen} /> 
          </Box>

        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Menus;