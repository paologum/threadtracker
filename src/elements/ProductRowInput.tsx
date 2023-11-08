import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, InputAdornment, InputLabel, MenuItem, OutlinedInput, Rating, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
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
          <FormControl sx={{ m: 1, minWidth: 200 }} size="medium">
            <InputLabel id="demo-select-small-label" variant="standard" htmlFor="uncontrolled-native">Brand</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={state.productInput.brandID}
              label="Brands"
              onChange={(event) => {
                actions.setProductBrand(event.target.value as number);
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