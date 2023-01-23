import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const MenuSelect = ({menus, menuHandleChange}) => {
    

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel  htmlFor="menu">
          Espace de travail
        </InputLabel>
        <NativeSelect
         inputProps={{
            name: 'menu',
            id: 'menu',
          }}
          onChange={menuHandleChange}
        >
             <option value={null}> {""} </option>
            {
                menus.length && menus.map((item, index) => (
                <option key={index} value={item._id}>
                   { item.wsdesignation ? item.wsdesignation : item.lib } 
                </option>))
            }
        </NativeSelect>
      </FormControl>
    </Box>
  )
}

export default MenuSelect;
