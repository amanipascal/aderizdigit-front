import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const UserSelect = ({users, handleChange}) => {
    

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel  htmlFor="user">
          Utilisateur
        </InputLabel>
        <NativeSelect
         inputProps={{
            name: 'user',
            id: 'user',
          }}
          onChange={handleChange}
        >
             <option value={null}> {""} </option>
            {
                users.length && users.map((item, index) => (<option key={index} value={item._id}> {item.username} </option>))
            }
        </NativeSelect>
      </FormControl>
    </Box>
  )
}

export default UserSelect
