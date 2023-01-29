import React, {useContext} from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { feathersClient } from '../../shared/restClient';
import { Context } from '../../shared/Store';
import user_avatar from './avatar.png'
import CustomTooltip from '../../shared/CustomTooltip';


const Account = () => {

    const [state, setState] = useContext(Context)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [user, setUser] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let navigate = useNavigate();

    const logout = async (e) => {
        
        e.preventDefault()

        handleClose()

        await feathersClient.logout();

        setState({authenticated: false, user: null, accessToken: null, isAdmin: false })
        
        // localStorage.clear()
        await localStorage.removeItem('feathers-jwt')
        await localStorage.removeItem('globalContext')
        
        navigate('/authenticate', { replace: true });
        
    }  

    React.useEffect(() => {
      setUser(localStorage.getItem('username'))
    }, [])
    


  return (
    <div>
    {/* <Tooltip title={state.user ? state.user.username : ''} placement="left"> */}
    <CustomTooltip text={user ? user : ''} placement="left">
        <IconButton
        size="medium"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        >
          <Avatar alt="Remy Sharp" src={user_avatar} />
        </IconButton>
    </CustomTooltip>  
    {/* </Tooltip> */}
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {/* <MenuItem onClick={handleClose}>
        <ListItemIcon>
           <SwitchAccountIcon color='primary' fontSize="small" />
        </ListItemIcon>
        <ListItemText>Mon compte</ListItemText>
      </MenuItem> */}
      {/* {
        state.isAdmin && (
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                <AdminPanelSettingsIcon color='secondary' fontSize="small" />
                </ListItemIcon>
                <ListItemText>Administration</ListItemText>
            </MenuItem>
        )
      } */}
      <Divider />
      <MenuItem  onClick={(e) => logout(e)} >
        <ListItemIcon>
           <LogoutIcon color='error' fontSize="small" />
        </ListItemIcon>
        <ListItemText>Se déconnecter</ListItemText>
      </MenuItem>
    </Menu>
  </div>
  )
}

export default Account