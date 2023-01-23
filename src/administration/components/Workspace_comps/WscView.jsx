import * as React from 'react';
import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
import TableauEmbed from '../../../shared/EmbedComponents/TableauEmbed';
import MondayEmbeded from '../../../shared/EmbedComponents/mondayEmbeded';
import JotFormEmbeded from '../../../shared/EmbedComponents/JotFormEmbeded';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const WscView = ({open, setView, item}) => {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
  const handleClose = () => {
    setView(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth="lg"
        fullWidth={true}
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {item && `Visualisation de composant - ${item.lib}`}
        </BootstrapDialogTitle>
        <DialogContent dividers>
        {
            (item && item.origin_tool == 'tableau') && <TableauEmbed url={item.api} width={ item.width ? item.width  : '100%'} height={ item.height ? item.height  : '70vh'} hideTabs={false} />
        }
        {
            (item && item.origin_tool == 'monday') && <MondayEmbeded url={item.api} width={ item.width ? item.width  : '100%'} height={ item.height ? item.height  : '500px'} />
        }
        {
            (item && item.origin_tool == 'jotform') && (
            <JotFormEmbeded url={item.api} width={ item.width ? item.width  : '100%'} height={ item.height ? item.height  : '100%'} />
            )
        }
        </DialogContent> 
      </BootstrapDialog>
    </div>
  );
}

export default WscView