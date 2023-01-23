import React, { useEffect  } from 'react';
import './App.css';
import AuthLayout from './Authentication/AuthLayout';
import NotFound from './NotFound';
import {
  Routes,
  Route,
  HashRouter,
  Navigate
} from "react-router-dom"
import WorkSpace from './workspace/WorkSpace';

import AdminWs from './administration/AdminWs';
import Users from './administration/components/users/Users'
import Roles from './administration/components/Roles/Roles';
import Menus from './administration/components/menus/Menus';
import Permissions from './administration/components/Permissions/Permissions';
import importScript from './shared/importscript';
import Ws from './administration/components/Workspace/Ws';
import Wsc from './administration/components/Workspace_comps/Wsc';
import Ws_default from './workspace/components/ws_default';

import { css } from "@emotion/react";
import {ClipLoader, CircleLoader, DotLoader } from 'react-spinners';

import { Avatar, Box, Grid } from '@mui/material';
// import { Audio, Circles} from  'react-loader-spinner'
import RouterProvider from './shared/RouterContext';
import LogoAderiz from './shared/logo_aderiz';
import Services from './administration/components/users_service/Service';

const override = css`
  display: block;
  margin: 0 auto;
  borderColor: red;
`;


function App() {


  const [loadingInProgress, setLoading] = React.useState(false);

  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  };

  importScript("./assets/libs/jquery/jquery.min.js");
  importScript("./assets/libs/bootstrap/js/bootstrap.bundle.min.js");
  importScript("./assets/libs/metismenu/metisMenu.min.js");
  importScript("./assets/libs/simplebar/simplebar.min.js");
  importScript("./assets/libs/node-waves/waves.min.js");
  importScript("./assets/js/app.js");
  
 
  useEffect(() => {
    clearCacheData()
  }, [])

  useEffect(() => {
    clearCacheData()
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  
//   function yourHandler(previousRoute, nextRoute) {
//     console.log('previousRoute : ', previousRoute)
//     console.log('nextRoute : ', nextRoute)
//  }

  return (
    <React.Fragment>
      {
        loadingInProgress ? 
        (
            <Box sx={{
              height: '100vh', 
              width: '100vw', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#10ac84',
              // backgroundImage: 'linear-gradient(#55efc4, #ecf0f1, #b8e994, #1dd1a1)' //'#f7f1e3'
              // backgroundImage: 'linear-gradient(#079992, #079992, #b8e994, white)' //'#f7f1e3'
              // backgroundImage: 'linear-gradient(#079992, #b8e994, #b8e994, white)' //'#f7f1e3'
              }}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                  >
                  <Grid item xs={12}>
                    <Avatar  sx={{ width: 70, height: 70 }}  >   
                      <LogoAderiz width={70} height={70} />
                    </Avatar>
                  </Grid>
                  <Grid item xs={12}>
                    <DotLoader color={'#f9ca24'} loading={loadingInProgress} css={override} size={70} />
                  </Grid>
                  <Grid item xs={12}>
                    <h4 style={{color: 'white'}}>Loading ...</h4>
                  </Grid>
                </Grid>
            </Box>
        ) 
        : (
          
            <HashRouter>
              <RouterProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/authenticate" />}/>
                <Route path="/authenticate" element={<AuthLayout/>}/>
                <Route path="/administration" element={<AdminWs/>}>
                  <Route path="service" element={<Services/>} />
                  <Route path="users" element={<Users/>} />
                  <Route path="profils" element={<Roles/>} />
                  <Route path="menus" element={<Menus/>} />
                  <Route path="ws" element={<Ws/>} />
                  <Route path="wsc" element={<Wsc/>} />
                  <Route path="permissions" element={<Permissions/>} />
                </Route>
                <Route path="/workspace" element={<WorkSpace/>}>
                  <Route path="espace/:menu_id/:user_id" element={<Ws_default/>} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
              </RouterProvider> 
            </HashRouter>
          
        )
      }
    
    </React.Fragment>
  );
}

export default App;
