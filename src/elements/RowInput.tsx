import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, MenuItem, Rating, Select, Typography } from '@mui/material';
import { state } from '../util';
import { action, makeObservable, observable } from 'mobx';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { observer } from 'mobx-react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

export class BrandTextInputState {
  brandName = 'Brand';
  brandCreator = 'Creator';
  startingDate = dayjs().year();
  luxury = false;
  rating = 5;

  constructor() {
    makeObservable(this, {
      brandName: observable,
      brandCreator: observable,
      startingDate: observable,
      luxury: observable,
      rating: observable,
      setBrandName: action,
      setBrandCreator: action,
      setStartingDate: action,
      setLuxury: action,
      setRating: action,
    });
  }

  // Add actions to modify the state
  setBrandName(value: string) {
    this.brandName = value;
  }

  setBrandCreator(value: string) {
    this.brandCreator = value;
  }

  setStartingDate(value: Dayjs) {
    this.startingDate = value.year();
  }

  setLuxury(value: boolean) {
    this.luxury = value;
  }

  setRating(value: number) {
    this.rating = value;
  }
}
export class ErrorType {
  error=false;
  text="";
  constructor() {
    makeObservable(this, {
      error: observable,
      text: observable,
      setError: action,
      setText: action
    });
  }
  setError(value: boolean) {
    this.error=value;
  }
  setText(value:string){
    this.text=value;
  }
  setNormal() {
    this.error=false;
    this.text="";
  }
}
export const error = new ErrorType;

export const brandTextInputState = new BrandTextInputState();

const BrandTextInput: React.FC = observer(function () {
  const {
    brandName,
    brandCreator,
    startingDate,
    luxury,
    rating,
  } = brandTextInputState;
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
            defaultValue={brandName}
            onChange={(e) => {
              brandTextInputState.setBrandName(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Brand Creator"
            helperText="Required"
            defaultValue={brandCreator}
            onChange={(e) => {
              brandTextInputState.setBrandCreator(e.target.value);
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            value={dayjs().set('year', startingDate)}
            views={['year']}
            slotProps={{
              textField: {
                helperText: 'MM/DD/YYYY',
              },
            }}
            onChange={(newVal) => {
              brandTextInputState.setStartingDate(newVal!);
            }}
            label="Founded"/>
            </LocalizationProvider>
          <div>
            <FormControl sx={{width: '120', height: '100%', verticalAlign: 'middle', justifyContent: 'center', alignItems: 'center'}}>
              <FormControlLabel control={<Checkbox value={luxury} onChange={(e) => {
                brandTextInputState.setLuxury(e.target.checked)
              }}/>} label="Luxury" />
            </FormControl>
            <Typography component="legend">{rating + " out of 10"}</Typography>
            <Rating 
              name="customized-10" 
              defaultValue={0} 
              value={rating}
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
                brandTextInputState.setRating(newVal as number);
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