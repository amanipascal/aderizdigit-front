import React, { useState } from 'react'
import Aside from './components/Aside';
import Main from './components/Main';
import "../App.css"
// import { Context } from '../shared/Store';
import { client } from '../shared/feathersjs';
import _ from 'lodash'
import { useLocation } from 'react-router-dom';

const WorkSpace = () => {

  // let location = useLocation();

  // const getAuth = async () => {
  //   const authData = await client.get('authentication');
  //   console.log('authData ws :', authData);
  // }

  // React.useEffect(() => {
  //   console.log('location ws:', location);
  //   getAuth()
  // }, [location]);

    const [collapsed, setCollapsed] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [image, setImage] = useState(true);
    const [toggled, setToggled] = useState(true);
    // const [state, setState] = useContext(Context)

    const [usermenus, setUsermenus] = useState([]);
    const [connectedUserId, setConnectedUserId] = useState(null);
  

    const loadUserMenus = async () => {
      client.reAuthenticate().then(async data => {
        const {data: nesteds} = await client.service('nested-menu').find({})
        const nested_ids = nesteds.map(item => item.child._id)
        const {user} = data
        const user_menus = [...user.user_menus]
        const profil_menus = user.user_profils.map(profil => profil.profil_menus).flat()
        const user_menus_all = _.uniqBy([...user_menus, ...profil_menus], '_id') 
        const menu_epure = user_menus_all.filter(item => !nested_ids.includes(item._id) )
        // console.log('menu_epure : ', menu_epure.sort((a,b) => a.ordre - b.ordre))
        setUsermenus([...menu_epure.sort((a,b) => a.ordre - b.ordre)])
        setConnectedUserId(user._id)
      })
      
    }

    React.useEffect(() => {
     loadUserMenus()
    }, [])

    // React.useEffect(() => {
    //   console.log('nestedIds : ', nestedIds)
    //  }, [nestedIds])
    
  
    const handleCollapsedChange = (checked) => {
      setCollapsed(checked);
    };

    const handleCollapseChange = () => {
        setCollapse(!collapse);
        // setCollapsed(!collapsed);
      };
  

    const handleImageChange = (checked) => {
      setImage(checked);
    };
  
    const handleToggleSidebar = (value) => {
      setToggled(value);
    };

  return (
    <div className="App">
          <Aside 
            image={image}
            collapsed={collapse}
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
            usermenus={usermenus}
            user_id={connectedUserId}
          />
         <Main
            image={image}
            toggled={toggled}
            collapsed={collapsed}
            handleToggleSidebar={handleToggleSidebar}
            handleCollapseChange={handleCollapseChange}
            handleImageChange={handleImageChange}
        />
      
    </div>
  )
}

export default WorkSpace;
//   {/* <TopHeader/> */}