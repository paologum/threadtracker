
import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, InputAdornment, InputLabel, MenuItem, OutlinedInput, Rating, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import { useContext } from "react";
import { context, actions } from "../util";
import { ErrorType } from "../util/types";

export const error = new ErrorType;

const DropRowInput: React.FC = observer(function () {
    const { state, actions } = useContext(context);
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
        <FormLabel component="legend">Create Drop</FormLabel>
        <div>
          <FormControl sx={{ m: 1, minWidth: 200 }} size="medium">
            <InputLabel id="demo-select-small-label" variant="standard" htmlFor="uncontrolled-native">Brand</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={state.dropInput.brandID}
              label="Brands"
              onChange={(event) => {
                actions.setDropBrand(event.target.value as number);
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {state.brands.map((brand, index) => (
                <MenuItem key={brand.brandID}value={brand.brandID}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            id="outlined-required"
            label="Drop Name"
            helperText="Required"
            defaultValue={state.dropInput.name}
            onChange={(e) => {
              actions.setDropName(e.target.value);
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            value={dayjs(state.dropInput.date)}
            views={['year']}
            slotProps={{
              textField: {
                helperText: 'MM/DD/YYYY',
              },
            }}
            onChange={(newVal) => {
              actions.setDropDate(newVal!);
            }}
            label="Released"/>
            </LocalizationProvider>
          <TextField
            required
            id="outlined-required"
            label="Season"
            helperText="Required"
            defaultValue={state.dropInput.season}
            onChange={(e) => {
              actions.setDropSeason(e.target.value);
            }}
          />
        </div>
        <FormHelperText>{error.text}</FormHelperText>
      </FormControl>
    </Box>
    )
});
export default DropRowInput;