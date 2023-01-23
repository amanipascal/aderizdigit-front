import React, { useState, useContext } from 'react'
import "../App.css"
import { Context } from '../shared/Store';
import { useLocation, useNavigate } from "react-router-dom";
import AdminAside from './components/AdminAside';
import AdminMain from './components/AdminMain';
import { client } from '../shared/feathersjs';

const AdminWs = () => {
  // let location = useLocation();

  // const getAuth = async () => {
  //   const authData = await client.get('authentication');
  //   console.log('authData Admin :', authData);
  // }

  // React.useEffect(() => {
  //   console.log('location Admin :', location);
  //   getAuth()
  // }, [location]);

    // let navigate = useNavigate();
    const [state] = useContext(Context)
    // const [collapsed, setCollapsed] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [image, setImage] = useState(true);
    const [toggled, setToggled] = useState(true);
  
    // const handleCollapsedChange = (checked) => {
    //   setCollapsed(checked);
    // };

    const handleCollapseChange = () => {
        setCollapse(!collapse);
      };
  

    const handleImageChange = (checked) => {
      setImage(checked);
    };
  
    const handleToggleSidebar = (value) => {
      setToggled(value);
    };

    

  return (
    <div className={`App ${toggled ? 'toggled' : ''}`}>
          <AdminAside 
                image={image}
                collapsed={collapse}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
            />
          <AdminMain
            image={image}
            toggled={toggled}
            collapsed={collapse}
            handleToggleSidebar={handleToggleSidebar}
            handleCollapseChange={handleCollapseChange}
            handleImageChange={handleImageChange}
        />
      
    </div>
  )
}

export default AdminWs;