import React from 'react';
// import Switch from 'react-switch';
// import { FaHeart, FaBars } from 'react-icons/fa';
// import TopHeader from './Top_header';
import MainHeader from './main_header';

import { Outlet } from 'react-router-dom';
// import Header from '../components/Header'
import '../../assets/css/app.css'
import { Row } from 'simple-flexbox';
import './workspace.css'

const Main = ({ handleCollapseChange }) => {
  
  return (
      <main style={{width: '100%'}}  >
        <MainHeader handleCollapseChange={handleCollapseChange} />
        <div style={{width: '100%', height:'92vh'}} className="workspace" >
         <Outlet/>
        </div>
      </main>
  );
};

export default Main;