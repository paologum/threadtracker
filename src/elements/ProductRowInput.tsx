import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, InputAdornment, InputLabel, OutlinedInput, Rating, TextField, Typography } from "@mui/material";
import { NumberInputRootSlotProps } from "@mui/material/node_modules/@mui/base";
import { Box } from "@mui/system";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import { useContext } from "react";
import { context, actions } from "../util";
import { ErrorType } from "../util/types";

export const error = new ErrorType;

const ProductRowInput: React.FC = observer(function () {
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
        <FormLabel component="legend">Create Product</FormLabel>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Product Name"
            helperText="Required"
            defaultValue={state.productInput.name}
            onChange={(e) => {
              actions.setProductName(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Material"
            helperText="Required"
            defaultValue={state.productInput.material}
            onChange={(e) => {
              actions.setProductMaterial(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Category"
            helperText="Required"
            defaultValue={state.productInput.category}
            onChange={(e) => {
              actions.setProductCategory(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Color"
            helperText="Required"
            defaultValue={state.productInput.color}
            onChange={(e) => {
              actions.setProductColor(e.target.value);
            }}
          />
            <FormControl sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                    onChange={(e) => {
                        const value = e.target.value;
                        let num: number = parseInt(value);
                        if (value.length != 0 && isNaN(num)) {
                            error.setError(true);
                            error.setText("Amount is not a valid number");
                        } else {
                            actions.setProductPrice(num);
                            error.setNormal();
                        }
                    }}
                />
            </FormControl>
        </div>
        <FormHelperText>{error.text}</FormHelperText>
      </FormControl>
    </Box>
    )
});
export default ProductRowInput;