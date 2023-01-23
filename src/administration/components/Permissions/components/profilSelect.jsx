import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const ProfilSelect = ({profils, handleChange}) => {
    

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel  htmlFor="profil">
          Selectionner profil
        </InputLabel>
        <NativeSelect
         inputProps={{
            name: 'profil',
            id: 'profil',
          }}
          onChange={handleChange}
        >
             <option value={null}> {""} </option>
            {
                profils.length && profils.map((item, index) => (<option key={index} value={item._id}> {item.name} </option>))
            }
        </NativeSelect>
      </FormControl>
    </Box>
  )
}

export default ProfilSelect
