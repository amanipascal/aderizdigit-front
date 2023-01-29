import React, { Fragment, useContext } from 'react'
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
  } from 'react-pro-sidebar';
  import Tooltip from '@mui/material/Tooltip';
  
// import {  FaAngleDoubleRight } from 'react-icons/fa';
import { MdOutlineMenuBook, MdDescription} from 'react-icons/md'
import sidebarBg from '../../assets/images/menu_bg.jpg';
import LogoAderiz from '../../shared/logo_aderiz';
import 'react-pro-sidebar/dist/css/styles.css';
import '../../assets/css/app.css'
import { Row } from 'simple-flexbox';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../../shared/Store';
// import { client } from '../../shared/feathersjs';





const Aside = ({ image, collapsed, toggled, handleToggleSidebar, usermenus, user_id}) => {


const [state, setState] = useContext(Context)

const [selectedId, setSelectedId] = React.useState(null);

function hasNestedMenus(menu) {
    return menu.nested && !!menu.nested.length
}

const selectedMenuStyle = {
    backgroundImage: 'linear-gradient(#079992, #78e08f, #b8e994, #f6e58d)',
    color: '#341f97',
    borderRadius: '10px',
    margin: '0px 10px'
}

let { menu_id } = useParams();


React.useEffect(() => {
    setSelectedId(menu_id)
}, [menu_id])


const dataToWs = async (menu_id) => {
    setState({ ...state, user_id })
}

function deroulerNested(nestedMenus) {
    return nestedMenus.map((sousmenu, i) => (
        <div key={i}>
            {
               !hasNestedMenus(sousmenu) ? (
                <React.Fragment>
                    <Tooltip title={collapsed ? sousmenu.lib: ''} placement="right">
                        <MenuItem icon={<MdDescription style={{color:'red'}}/>} onClick={ () => dataToWs(sousmenu._id) } style={selectedId == sousmenu._id ? selectedMenuStyle : {}}> 
                            {sousmenu.lib}
                            <Link to={`/workspace/espace/${sousmenu._id}/${user_id}`} /> 
                        </MenuItem>
                    </Tooltip>
                </React.Fragment>
               ) : 
               (
               <React.Fragment>
                    <SubMenu suffix={<span className="badge orange"> {sousmenu.nested && sousmenu.nested.length} </span>}
                        title={sousmenu.lib}
                        icon={<MdOutlineMenuBook style={{color:'yellow'}}/>}
                        >
                        {
                            deroulerNested(sousmenu.nested.map(n => n.child))
                        }    
                    </SubMenu>
               </React.Fragment>) 
            }
        </div>
    ))
}

function menu_items(menu_items) {

        return menu_items.map((item, i ) => (
            <div key={i}>
                {
                    !hasNestedMenus(item) ? (
                        <Tooltip title={collapsed ? item.lib: ''} placement="right">
                            <MenuItem icon={<MdDescription style={{color:'yellow'}}/>} onClick={ () => dataToWs(item._id) } style={selectedId == item._id ? selectedMenuStyle: {}} > 
                                {item.lib}
                                <Link to={`/workspace/espace/${item._id}/${user_id}`} /> 
                            </MenuItem>
                        </Tooltip>
                    ) : (
                        <SubMenu suffix={<span className="badge orange"> {item.nested && item.nested.length} </span>}
                        title={item.lib}
                        icon={<MdOutlineMenuBook style={{color:'yellow'}}/>}
                        >
                            {
                                deroulerNested(item.nested.map(n => n.child))
                            }
                        </SubMenu>
                    )
                }
            </div>
        ))
  }


  


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
                        <LogoAderiz width={55} height={55} />
                    </Row>
                     
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    {
                        menu_items(usermenus) 
                    }
                </Menu>
            </SidebarContent>
            <SidebarFooter style={{ textAlign: 'center' }}>
            </SidebarFooter>

        </ProSidebar>
    </Fragment>
  )
}

export default Aside