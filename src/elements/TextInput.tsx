import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextInput() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Brand Name"
          helperText="Required"
          defaultValue="Brand"
        />
        <TextField
          required
          id="outlined-required"
          label="Brand Creator"
          helperText="Required"
          defaultValue="Creator"
        />
        <TextField
          required
          id="outlined-required"
          label="Starting Date"
          helperText="Required"
          defaultValue="Date"
        />
        <TextField
          required
          id="outlined-required"
          label="Luxury"
          helperText="Required"
          defaultValue="True"
        />
        <TextField
          required
          id="outlined-required"
          label="Rating"
          helperText="Required"
          defaultValue="Creator"
        />
      </div>
    </Box>
  );
}