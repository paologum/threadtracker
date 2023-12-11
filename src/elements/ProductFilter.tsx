import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slider, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { useContext } from "react";
import { context } from "../util";

const ProductFilter: React.FC = observer(function () {
    const {state, actions} = useContext(context);
    return (
    <div>
        <Typography variant="h6" gutterBottom>
          Product Filters
      </Typography>
      <Box width="75%" margin="auto">
      <Grid container spacing={4} alignItems="center">
          <Grid item>
          <TextField
            label="Product Name"
            defaultValue={state.productNameFilter}
            onChange={(e) => {
              actions.setProductNameFilter(e.target.value);
            }}
          />
          </Grid>
        <Grid item>
          <TextField
            label="Product Color"
            defaultValue={state.productColorFilter}
            onChange={(e) => {
              actions.setProductColorFilter(e.target.value);
            }}
          />
          </Grid>
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 200 }} size="medium">
            <InputLabel htmlFor="uncontrolled-native">Category</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={state.productCategoryFilter}
              label="Category"
              onChange={(event) => {
                actions.setProductCategoryFilter(event.target.value)
              }}
            >
              <MenuItem value="">
                None
              </MenuItem>
              {state.productCategoryList.map((category, index) => (
                  <MenuItem key={index}value={category}>
                    {category}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          </Grid>
        <Grid item>
          <TextField
            label="Product Material"
            defaultValue={state.productMaterialFilter}
            onChange={(e) => {
              actions.setProductMaterialFilter(e.target.value);
            }}
          />
          </Grid>
          </Grid>
        <Typography variant="h6" gutterBottom>
        Price Range
      </Typography>
        <Slider
        getAriaLabel={() => 'Temperature range'}
        value={state.range}
        onChange={(event, value) => {
            actions.setRange(value as number[])
        }}
        marks={[
            {
                value: state.minPrice,
                label: `$${state.minPrice}` 
            },
            {
                value: state.maxPrice,
                label: `$${state.maxPrice}` 
            },
        ]}
        min={state.minPrice}
        max={state.maxPrice}
        valueLabelDisplay="auto"
        getAriaValueText={(value) => {
            return `$${value}`
        }}
        />
        </Box>
    </div>
    )
});

export default ProductFilter;