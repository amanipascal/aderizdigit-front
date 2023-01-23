import React, {useEffect, useContext} from 'react';
import { Button, listClasses, Menu, MenuItem } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { feathersClient } from '../../../shared/restClient';
import { client, authenticated } from '../../../shared/feathersjs';
import { Context } from '../../../shared/Store';
import { confirm } from "react-confirm-box";


const ProfilPopover = ({profils}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const Profils = profils && profils.length ? [...profils] : []

  return (
    <div>
      <PeopleAltIcon 
        color='primary' 
        aria-haspopup="true" 
        aria-owns={open ? 'mouse-over-popover' : undefined}
        onMouseEnter={handlePopoverOpen} 
        onMouseLeave={handlePopoverClose} 
        />
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {
          Profils.length ? (
            <>
            {
              Profils.map((p, i) => <Typography key={i} sx={{ p: 1 }}> - {p.name} </Typography>)
            }
            </>
          ) : (<Typography sx={{ p: 1, color:'orangered', textTransform: 'lowercase' }} variant="overline" display="block" >Aucun profil associé</Typography>)
        }
        
      </Popover>
    </div>
  );

}

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

  const supprimerUser = async () => {
      const result = await confirm("Etes-vous sûr de vouloir supprimer ?", options);
      if (result) {
        setState({...state, progression: true})
        if (authenticated()) {
          client.service("users").remove(row._id).then(user => {
            setState({
                ...state, 
                userlist: [...state.userlist.filter(item => item._id != user._id) ], 
                progression: false,
                alertProps: {...state.alertProps, open: true, severity: 'error',  message: 'Utilisateur supprimé avec success !' }
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
          handleClose();
          handleClickOpen(row);
          }}>
          <ListItemIcon>
            <EditAttributesIcon style={{color:'yellowgreen'}} fontSize="small"/>
          </ListItemIcon>
          <Typography variant="inherit">Modifier</Typography> 
        </MenuItem>
        <MenuItem onClick={() => {
            handleClose();
            supprimerUser()
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

const UserList = ({List, handleClickOpen}) => {

  const UserList = List && List.length ? [...List] : []


  return (
 
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {
              UserList.length && Object.keys(UserList[0]).map((name, index) => (
                <React.Fragment key={index}>
                {
                  name !== '_id' && <TableCell key={index} id={index}> {name} </TableCell>
                }
                </React.Fragment>
              ))
            }
            {
              UserList.length && (<TableCell align='center'> {"Actions"} </TableCell>)
            }
            
          </TableRow>
        </TableHead>
        <TableBody>
          {UserList.length && List.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
              <TableCell component="th" scope="row"> {row.email} </TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">
                  <ProfilPopover profils={row.profils}/>
              </TableCell>
              <TableCell align="left">{row.createdAt}</TableCell>
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

export default UserList;
