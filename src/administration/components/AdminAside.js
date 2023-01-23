import React, { Fragment } from 'react'
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
  } from 'react-pro-sidebar';
import { FaSellsy } from 'react-icons/fa';
import sidebarBg from '../../assets/images/menu_bg.jpg';
import LogoAderiz from '../../shared/logo_aderiz';
import 'react-pro-sidebar/dist/css/styles.css';
import '../../assets/css/app.css'
import { Row } from 'simple-flexbox';
import { Link } from 'react-router-dom';



const AdminAside = ({ image, collapsed, toggled, handleToggleSidebar}) => {

    const [menuObject, setMenuObject] = React.useState(null);

    const selectedMenuStyle = {
        backgroundImage: 'linear-gradient(#079992, #78e08f, #b8e994, #f6e58d)',
        color: '#341f97',
        borderRadius: '10px',
        margin: '0px 10px'
    }

    React.useEffect(() => {
        setMenuObject(window.location.href.split('/').slice(-1)[0])
    }, [])
    
   

  return (
    <Fragment>
        <ProSidebar
            image={image ? sidebarBg : false}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
        >
             <SidebarHeader>
                <div style={{
                        padding: '8px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        
                    }}
                    // className="header-bg"
                >
                    <Row horizontal='center'>
                        <LogoAderiz width={50} height={50} />
                    </Row>
                     
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem icon={<FaSellsy />} onClick={() => setMenuObject('service')} style={menuObject == 'service' ? selectedMenuStyle : {}}> 
                         Services
                        <Link to="/administration/service" /> 
                    </MenuItem>
                    <MenuItem icon={<FaSellsy />} onClick={() => setMenuObject('users')} style={menuObject == 'users' ? selectedMenuStyle : {}}> 
                         Users
                        <Link to="/administration/users" /> 
                    </MenuItem>
                    <MenuItem icon={<FaSellsy />} onClick={() => setMenuObject('profils')} style={menuObject == 'profils' ? selectedMenuStyle : {}}> 
                        Profils
                        <Link to="/administration/profils" />
                    </MenuItem>
                    <MenuItem icon={<FaSellsy/>} onClick={() => setMenuObject('menus')} style={menuObject == 'menus' ? selectedMenuStyle : {}}>
                         gestion des Menus
                         <Link to="/administration/menus" />
                    </MenuItem>
                    <MenuItem icon={<FaSellsy />} onClick={() => setMenuObject('wsc')} style={menuObject == 'wsc' ? selectedMenuStyle : {}}>
                        Composants WS
                        <Link to="/administration/wsc" />
                    </MenuItem>
                    <MenuItem icon={<FaSellsy />} onClick={() => setMenuObject('permissions')} style={menuObject == 'permissions' ? selectedMenuStyle : {}}>
                        Permissions & Relations
                        <Link to="/administration/permissions" />
                    </MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter style={{ textAlign: 'center' }}>
                
            </SidebarFooter>

        </ProSidebar>
    </Fragment>
  )
}

export default AdminAside

