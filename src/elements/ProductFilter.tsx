import { Slider } from "@mui/material";
import { observer } from "mobx-react";
import { useContext } from "react";
import { context } from "../util";

const ProductFilter: React.FC = observer(function () {
    const {state, actions} = useContext(context);
    return (
    <div>
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
    </div>
    )
});

export default ProductFilter;