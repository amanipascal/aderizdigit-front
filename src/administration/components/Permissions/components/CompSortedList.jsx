import React, { useContext } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Avatar, Button, ListItemAvatar, ListSubheader, TextField } from '@mui/material';
import logoMonday from './logo/logo_monday.png'
import logoTableau from './logo/logo_tableau.png'
import { Context } from '../../../../shared/Store';
import { authenticated, client } from '../../../../shared/feathersjs';

const CompSortedList = ({Cible}) => {

  const [state, setState] = useContext(Context)

  const [comps, setComps] = React.useState([]);

  const [compOrders, setCompOrders] = React.useState([]);

  const [content, setContent] = React.useState({});
  // comp_orders
  React.useEffect(() => {
    if (Cible && !!Cible.wscompList.length) {
      setContent(Cible)
      setComps([...Cible.wscompList])
      if (Cible.comp_orders && !!Cible.comp_orders.length) {
        setCompOrders([...Cible.comp_orders])
      }
    }
  }, [Cible])

  React.useEffect(() => {
    console.log('compOrders: ', compOrders)
  }, [compOrders])

  

  function OrderOnChange(order, id) {
    const newObj = {id, order}
    if (!!compOrders.length) {
      const orders = [...compOrders]
      if (orders.findIndex(obj => obj.id == newObj.id) == -1) {
        setCompOrders([...compOrders, newObj ])
      } else {
        setCompOrders([
          ...compOrders.map(item => item.id == newObj.id ? newObj : item )
        ])
      }
    } else {
      setCompOrders([newObj])
    }

  }
  
  function currentOrder(itemId) {
    const OrderObjects = [...compOrders]
    const order_idx = OrderObjects.findIndex(obj => obj.id == itemId)
    if (order_idx !== -1) {
      return OrderObjects[order_idx].order
    }
    return 0
  }

  function SaveOrders() {
    const data = {...content, comp_orders: [...compOrders]}
    setState({...state, progression: true})
        if (authenticated()) {
          client.service('wscontent').patch(data._id, data).then(wsc => {
            setContent(wsc)
            if (wsc.comp_orders && !!wsc.comp_orders.length) {
              setCompOrders([...wsc.comp_orders])
            }
            setState({...state, progression: false})
        }).catch(err => {
          console.log('err::: ', err)
          setState({...state, progression: false})
        })
        } else {
            setState({...state, progression: false})
        }
  }
    
  return (
    <List dense sx={{ bgcolor: 'background.paper', position: 'relative', overflow: 'auto', maxHeight: 500 }}
      subheader={
      <ListSubheader>
          <div style={{width: '100%', marginTop: '10px'}}>
              <Button  variant="contained" fullWidth onClick={() => SaveOrders() } style={{textTransform: 'none'}}>Sauvegarder le classement</Button>
          </div>
      </ListSubheader>}
     >
      {(comps && comps.length)&& comps.map((item, index) => {
        return (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar ${item.lib}`}
                  src={ item.origin_tool == 'monday' ?  `${logoMonday}` : `${logoTableau}` }
                />
              </ListItemAvatar>
              <ListItemText id={item.lib} primary={item.lib} />
              <TextField
                label="ordre"
                size="small"
                variant="standard"
                type='number'
                value={currentOrder(item._id)}
                onChange={(e) => OrderOnChange(e.target.value, item._id)}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  )
}

export default CompSortedList


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