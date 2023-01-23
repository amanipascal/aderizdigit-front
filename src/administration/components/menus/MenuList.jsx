import React, {useEffect, useContext} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, listClasses, Menu, MenuItem } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { client, authenticated } from '../../../shared/feathersjs';
import { Context } from '../../../shared/Store';
// import MenuForm from './MenuForm';
import { confirm } from "react-confirm-box";

{/* 
<Button variant="outlined" onClick={handleClickOpen}>
  Open form dialog
</Button> 
*/}

// const ChangeOrder = (row, externalOpen) => {

//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };


//   return (
//       <Dialog open={open} onClose={handleClose}>
//         <DialogContent>
//           <DialogContentText>
//             {`Changement de l'ordre du menu << ${row.lib} >>`}
//           </DialogContentText>
//           <TextField  autoFocus margin="dense" id="order"  label="L'ordre du menu" type="number" fullWidth
//             variant="standard"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleClose}>Valider</Button>
//         </DialogActions>
//       </Dialog>
//   );
// }


const ActionBtn = ({row, handleClickOpen}) => {

  const options = {
    render: (message, onConfirm, onCancel) => {
      return (
        <Paper sx={{padding: '15px'}}>
          <h3> {message} </h3>
          <Button color='success' onClick={onConfirm}> OUI </Button>
          <Button color='error' onClick={onCancel}> NON </Button>
        </Paper>
      );
    }
  };
 

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [state, setState] = useContext(Context)

  const supprimerMenu = async () => {
    const result = await confirm("Etes-vous sûr de vouloir supprimer ?", options);
    if (result) {
      setState({...state, progression: true})
      if (authenticated()) {
        client.service("menu").remove(row._id).then(item => {
          
          const {__v, updatedAt,  wsdescription, ...menu} = item
          setState({
              ...state, 
              menulist: [...state.menulist.filter(item => item._id != menu._id) ], 
              progression: false,
              alertProps: {...state.alertProps, open: true, severity: 'error',  message: 'Menu supprimé avec success !' }
          })
        }).catch(() => {
          setState({...state, progression: false})
        })
      } else {
        setState({...state, progression: false})
      }
    }
      
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event, data) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
   };

  return (
    <React.Fragment>
      <IconButton aria-label="settings" aria-haspopup="true" onClick={(e) => handleClick(e, row)}>
          <MoreVertIcon color="secondary" /> 
      </IconButton> 
      <Menu id="simple-menu" anchorEl={anchorEl}  keepMounted  open={Boolean(anchorEl)}  onClose={handleClose}>
        <MenuItem onClick={() => {
          handleClickOpen(row);
          handleClose();
          }}>
          <ListItemIcon>
            <EditAttributesIcon style={{color:'yellowgreen'}} fontSize="small"/>
          </ListItemIcon>
          <Typography variant="inherit">Modifier</Typography> 
        </MenuItem>

        {/* <MenuItem onClick={() => {
          // handleClickOpen(row);
          handleClose();
          }}>
          <ListItemIcon>
            <ClearAllIcon style={{color:'orange'}} fontSize="small"/>
          </ListItemIcon>
          <Typography variant="inherit">Changer d'ordre</Typography> 
        </MenuItem> */}

        <MenuItem onClick={() => {
          handleClose();
          supprimerMenu()
          }}>
          <ListItemIcon>
            <DeleteOutlineIcon style={{color:'red'}} fontSize="small"/>
          </ListItemIcon>
          <Typography variant="inherit">Supprimer</Typography> 
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
} 

const MenuList = ({List, handleClickOpen}) => {

  const Menu_list = List && List.length ? [...List] : []

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {
              Menu_list.length && Object.keys(Menu_list[0]).map((name, index) => (
                <React.Fragment key={index} >
                {
                  name !== '_id' && <TableCell key={index} id={index}> {name} </TableCell>
                }
                </React.Fragment>
              ))
            }
            {
              Menu_list.length && (<TableCell align='center'> {"Actions"} </TableCell>)
            }
            
          </TableRow>
        </TableHead>
        <TableBody>
          {Menu_list.length && List.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
              {
              Menu_list.length && Object.keys(Menu_list[0]).map((name, index) => (
                <React.Fragment key={index} >
                {
                  name !== '_id' && <TableCell key={index} align="left">{row[name]}</TableCell>
                }
                </React.Fragment>
              ))
            }
              <TableCell align="center">
                  <ActionBtn row={row} handleClickOpen={handleClickOpen} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MenuList;
