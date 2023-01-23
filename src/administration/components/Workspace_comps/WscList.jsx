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
import {Downloading} from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { feathersClient } from '../../../shared/restClient';
import { client , authenticated} from '../../../shared/feathersjs';
import { Context } from '../../../shared/Store';
import { confirm } from "react-confirm-box";
import WscView from './WscView';
import Swal from 'sweetalert2'


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
  
    const supprimerWsc = async () => {
      const result = await confirm("Etes-vous sûr de vouloir supprimer ?", options);
      if (result) {
        if (authenticated()) {
          setState({...state, progression: true})
          client.service("wscomps").remove(row._id).then(wsc => {
            setState({
                ...state, 
                wsclist: [...state.wsclist.filter(item => item._id != wsc._id) ], 
                progression: false,
                alertProps: {...state.alertProps, open: true, severity: 'error',  message: 'Composant supprimé avec success !' }
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

    const assoservice = (row) => {
      client.service("jtforms").find({ query: {url: row.api}}).then(resp => {
        const {data} = resp;
        console.log('data: ',data)
        if (!!data.length) {
          const frm = data[0]
          // inputValue: frm.crud_service,
          Swal.fire({
              title: 'Service de deversement associé au formulaire',
              input: 'text',
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: true,
              showCancelButtonText: 'Annuler',
              confirmButtonText: 'Valider',
              showLoaderOnConfirm: true,
              preConfirm: (service) => {
                client.service("jtforms").patch(frm._id, {crud_service: service})
                .catch(error => {
                  Swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                })
              },
              allowOutsideClick: () => !Swal.isLoading()
            })
            .then((result) => {
              if (result.isConfirmed) {
                Swal.fire('Opération effectuée avec success !!')
              }
            })
        }
      })
      
    };
   
    const handleClick = (event, data) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
     };
  
    return (
      <React.Fragment>
        {/* -------------------dialog association service-------------------------------------------------- */}

        {/* --------------------------------------------------------------------- */}
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
          {
            row.origin_tool == "jotform" && (
              <MenuItem onClick={() => { 
                assoservice(row);
                handleClose();
              }}>
                  <ListItemIcon>
                    <Downloading style={{color:'green'}} fontSize="small"/>
                  </ListItemIcon>
                  <Typography variant="inherit">Service/table de deversement</Typography> 
                </MenuItem>
            )
          }
          <MenuItem onClick={() => {
            handleClose();
            supprimerWsc()
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
  


const WscList = ({List, handleClickOpen}) => {
  const [view, setView] = React.useState(false);
  const [compRow, setCompRow] = React.useState(null);

  const WscList = List && List.length ? [...List] : []

  const Afficher = (row) => {
    setCompRow(row)
    setView(true)
  }

  return (
    <React.Fragment>
    <WscView open={view} setView={setView} item={compRow} />
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            { WscList && WscList.length && Object.keys(List[0]).map((name, index) => (
                <React.Fragment>
                {
                  name !== '_id' && <TableCell id={index}> {name} </TableCell>
                }
                </React.Fragment>
              ))
            }
            <TableCell align='center'> {"vue"} </TableCell>
            {WscList.length && (<TableCell align='center'> {"Actions"} </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {WscList.length && WscList.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
              <TableCell align="left">{row.lib}</TableCell>
              <TableCell align="left">{row.api}</TableCell>
              <TableCell align="left">{row.origin_tool}</TableCell>
              <TableCell align="left">{row.width}</TableCell>
              <TableCell align="left">{row.height}</TableCell>
              <TableCell align="center">
                  <Button variant='outlined' color='info' onClick={() => Afficher(row)}  >Afficher</Button>
              </TableCell>
              <TableCell align="center">
                  <ActionBtn row={row} handleClickOpen={handleClickOpen} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  )
}

export default WscList