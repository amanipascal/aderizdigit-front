import React, {useContext}  from 'react';

import { Outlet } from 'react-router-dom';
import '../../assets/css/app.css'
import Main_header from '../../workspace/components/main_header';
import { Row } from 'simple-flexbox';
import Box from '@mui/material/Box';
import GlobalProgress from '../../shared/GlobalProgress';
import { Context } from '../../shared/Store';
import MyAlert from '../../shared/MyAlert';
import '../../workspace/components/workspace.css'

const AdminMain = ({ handleCollapseChange }) => {
  const [state] = useContext(Context)
  return (
      <main style={{width: '100%'}} >
        <Main_header handleCollapseChange={handleCollapseChange} />
        <Box  sx={{width: '100%', marginLeft: '5px'}}>
          <GlobalProgress progression={state.progression}/>
        </Box>
        <Row className='adminContainer workspace' horizontal='center' style={{paddingTop: '15px'}} >
          <MyAlert {...state.alertProps} />
          <Outlet/>
        </Row>
      </main>
  );
};

export default AdminMain;