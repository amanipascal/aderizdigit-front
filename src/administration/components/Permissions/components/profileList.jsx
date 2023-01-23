import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { ListItemIcon } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const ProfileList = ({Cible, profils, setProfilsChanges}) => {

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
    const InitializeUserProfils = () => {
        setChecked([])
        if (Cible) {
            const userProfil_IDS = (Cible.profils && Cible.profils.length) ? [...Cible.profils] : []
            const profilsChecked = userProfil_IDS.map(id => profils.find(item => item._id == id))
            setChecked(profilsChecked)
        }
    }

  // initialization fired on user selection change  
  React.useEffect(() => {
    InitializeUserProfils()
  }, [Cible])

  // When the checked profils number change from the user's ones, send it back to the parent components
  React.useEffect(() => {
    setProfilsChanges([...checked.map(profil => profil._id)])
  }, [checked])
  
    
  return (
    <List dense sx={{ 
      width: '100%', 
      bgcolor: 'background.paper',
      position: 'relative',
      overflow: 'auto',
      maxHeight: 350
       }}>
      {profils.length && profils.map((item, index) => {
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
              <ListItemText id={item.name} primary={item.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  )
}

export default ProfileList