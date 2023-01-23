import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Avatar, ListItemAvatar, ListSubheader, TextField } from '@mui/material';
import logoMonday from './logo/logo_monday.png'
import logoTableau from './logo/logo_tableau.png'
import logoJotForm from './logo/logo_jotform.png'

const WsCompList = ({Cible, compos, setComposChanges}) => {

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
    const InitializeMenuWsc = () => {
        setChecked([])
        if (Cible) {
            const MenuWsc_IDS = (Cible.wscomps && Cible.wscomps.length) ? [...Cible.wscomps] : []
            const wscChecked = MenuWsc_IDS.map(id => compos.find(item => item._id == id))
            setChecked(wscChecked)
        }
    }

  // initialization fired on user selection change  
  React.useEffect(() => {
    InitializeMenuWsc()
  }, [Cible])

  // When the checked profils number change from the user's ones, send it back to the parent components
  React.useEffect(() => {
    setComposChanges([...checked.map(compo => compo._id)])
  }, [checked])
  
    
  return (
    <List dense sx={{
       width: '100%', 
       bgcolor: 'background.paper',
       position: 'relative',
       overflow: 'auto',
       maxHeight: 500
       }}
       subheader={
       <ListSubheader>
        Settings
       </ListSubheader>}
       >
      {(compos && compos.length)&& compos.map((item, index) => {
        return (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar ${item.lib}`}
                  src={ item.origin_tool == 'monday' ?  `${logoMonday}` : item.origin_tool == 'tableau' ? `${logoTableau}` : `${logoJotForm}` }
                />
              </ListItemAvatar>
              <ListItemText id={item.lib} primary={item.lib} />
              <Checkbox
                edge="end"
                onChange={handleToggle(item)}
                checked={checked.indexOf(item) !== -1}
                inputProps={{ 'aria-labelledby': item.lib }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  )
}

export default WsCompList


{/* <ListItemButton>
  <ListItemAvatar>
    <Avatar
      alt={`Avatar ${item.lib}`}
      src={ item.origin_tool == 'monday' ?  `${logoMonday}` : `${logoTableau}` }
    />
  </ListItemAvatar>
  <ListItemText id={item.lib} primary={item.lib} />
</ListItemButton> */}

// secondaryAction={
//   // <Checkbox
//   //   edge="end"
//   //   onChange={handleToggle(item)}
//   //   checked={checked.indexOf(item) !== -1}
//   //   inputProps={{ 'aria-labelledby': item.lib }}
//   // />
// }