import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import '../../admin.css';
import ClassementComposMetier from './ClassementComposMetier';
import ProfilMenus from './ProfilMenus';
import UserMenus from './UserMenus';
import UserProfils from './UserProfils';
import VisibComposMetier from './VisibComposMetier';

const Permissions = () => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: '#f5f6fa',  borderRadius: '10px', padding: '10px', margin: '10px', width: '100%' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable">
                <Tab  label={"User permissions"} value={'1'}  style={{textTransform: 'none'}} />
                <Tab  label={"Profil permissions"} value={'2'} style={{textTransform: 'none'}}/>
                <Tab  label={"Visibilité composants metiers"} value={'3'} style={{textTransform: 'none'}}/>
                <Tab  label={"Classement des composants"} value={'4'} style={{textTransform: 'none'}}/>
            </TabList>
          </Box>
            <TabPanel  value={'1'}>
              {/* <CssBaseline /> */}
              <Container fluid>
                  <Grid container spacing={2} >
                      <Grid item xs={12} md={6} style={{border: '1px #bdc3c7 solid', borderRadius: '10px', padding: '5px'}} >
                        <UserProfils/>
                      </Grid>
                      <Grid item xs={12} md={6} style={{border: '1px #bdc3c7 solid', borderRadius: '10px', padding: '5px'}}>
                        <UserMenus/>
                      </Grid>
                  </Grid>
              </Container>
              
            </TabPanel>
            <TabPanel  value={'2'}>
              <ProfilMenus/>
            </TabPanel>
            <TabPanel  value={'3'}>
              <VisibComposMetier/>
            </TabPanel>
            <TabPanel  value={'4'}>
              <ClassementComposMetier/>
            </TabPanel>
        </TabContext>
    </Box>
  )
}

export default Permissions;