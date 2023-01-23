import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { ListItemIcon } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const MenuList = ({Cible, menus, setMenusChanges}) => {

    const [checked, setChecked] = React.useState([]); // State du composant
    
    // Updating state on check or uncheck
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    // initialize the state on User select
    const InitializeUserMenus = () => {
        setChecked([])
        if (Cible) {
            const userMenus_IDS = (Cible.menus && Cible.menus.length) ? [...Cible.menus] : []
            const menusChecked = userMenus_IDS.map(id => menus.find(item => item._id == id))
            setChecked(menusChecked)
        }
    }

  // initialization fired on user selection change  
  React.useEffect(() => {
    InitializeUserMenus()
  }, [Cible])

  // When the checked profils number change from the user's ones, send it back to the parent components
  React.useEffect(() => {
    setMenusChanges([...checked.map(menu => menu._id)])
    // console.log('Checked : ', checked)
  }, [checked])
  
    
  return (
    <List dense sx={{
      width: '100%',
       bgcolor: 'background.paper',
       position: 'relative',
       overflow: 'auto',
       maxHeight: 350
       }}>
      {(menus && menus.length)&& menus.map((item, index) => {
        return (
          <ListItem
            key={index}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(item)}
                checked={checked.indexOf(item) !== -1}
                inputProps={{ 'aria-labelledby': item.name }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <PeopleAltIcon color='primary' />
              </ListItemIcon>
              <ListItemText id={item.lib} primary={item.lib} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  )
}

export default MenuList