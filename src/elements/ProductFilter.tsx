import { Box, Grid, Slider, TextField, Typography } from "@mui/material";
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