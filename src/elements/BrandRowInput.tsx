import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, MenuItem, Rating, Select, Typography } from '@mui/material';
import { context} from '../util';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { observer } from 'mobx-react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { ErrorType } from '../util/types';

export const error = new ErrorType;

const BrandTextInput: React.FC = observer(function () {
  const {state, actions} = React.useContext(context);
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl required error={error.error} sx={{ m: 1 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Create Brand</FormLabel>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Brand Name"
            helperText="Required"
            defaultValue={state.brandInput.name}
            onChange={(e) => {
              actions.setBrandName(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Brand Creator"
            helperText="Required"
            defaultValue={state.brandInput.creator}
            onChange={(e) => {
              actions.setBrandCreator(e.target.value);
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            value={dayjs().set('year', state.brandInput.year)}
            views={['year']}
            slotProps={{
              textField: {
                helperText: 'MM/DD/YYYY',
              },
            }}
            onChange={(newVal) => {
              actions.setBrandYear(newVal!.year()!);
            }}
            label="Founded"/>
            </LocalizationProvider>
          <div>
            <FormControl sx={{width: '120', height: '100%', verticalAlign: 'middle', justifyContent: 'center', alignItems: 'center'}}>
              <FormControlLabel control={<Checkbox value={state.brandInput.luxury} onChange={(e) => {
                actions.setBrandLuxury(e.target.checked)
              }}/>} label="Luxury" />
            </FormControl>
            <Typography component="legend">{state.brandInput.rating + " out of 10"}</Typography>
            <Rating 
              name="customized-10" 
              defaultValue={0} 
              value={state.brandInput.rating}
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#19388A',
                },
                '& .MuiRating-iconHover': {
                  color: '#133AA3',
                },
              }}
              max={10} 
              precision={0.5}
              onChange={(event, newVal) => {
                actions.setBrandRating(newVal as number);
              }}
              />
          </div>
        </div>
        <FormHelperText>{error.text}</FormHelperText>
      </FormControl>
    </Box>
  );
})
export default BrandTextInput;