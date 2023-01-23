import React, {useContext} from 'react';
import { Button, Menu, MenuItem } from '@mui/material'
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { feathersClient } from '../../../shared/restClient';
import { client , authenticated} from '../../../shared/feathersjs';
import { Context } from '../../../shared/Store';
import { confirm } from "react-confirm-box";


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
  
    const supprimerProfile = async () => {
      const result = await confirm("Etes-vous sûr de vouloir supprimer ?", options);
      if (result) {
        if (authenticated()) {
          setState({...state, progression: true})
          client.service("profil").remove(row._id).then(profil => {
            setState({
                ...state, 
                Profilelist: [...state.Profilelist.filter(item => item._id != profil._id) ], 
                progression: false,
                alertProps: {...state.alertProps, open: true, severity: 'error',  message: 'Profil supprimé avec success !' }
            })
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
          <MenuItem onClick={() => {
            handleClose();
            supprimerProfile()
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
  


const RolesList = ({List, handleClickOpen}) => {

  const RolesList = List && List.length ? [...List] : []

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            { RolesList.length &&
              RolesList.length && Object.keys(List[0]).map((name, index) => (
                <React.Fragment>
                {
                  name !== '_id' && <TableCell id={index}> {name} </TableCell>
                }
                </React.Fragment>
              ))
            }

            {RolesList.length && (<TableCell align='center'> {"Actions"} </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {RolesList.length && RolesList.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.createdAt}</TableCell>
              <TableCell align="center">
                  <ActionBtn row={row} handleClickOpen={handleClickOpen} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RolesList