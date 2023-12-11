import { Button, ButtonGroup, MenuItem, Select, TextField } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import GeneralDataGrid, { rowSelection } from '../elements/GeneralDataGrid';
import { context } from '../util/index';
import ProductRowInput, { error } from '../elements/ProductRowInput';
import * as generalQueries from '../util/general-queries';
import { State } from '../util/state';
import ProductFilter from '../elements/ProductFilter';
const Products: React.FC= observer (function () {
    const {state, actions} = useContext(context);
    const columns: GridColDef[] = [
        { field: 'productID', headerName: 'ID', width: 20 },
        { field: 'dropID', headerName: 'Drop ID', type: 'number', width: 80, editable: true,
          renderEditCell: (params) => {
            return (
              <Select
                value={params.value}
                onChange={(event) => {
                  params.api.setEditCellValue({ id: params.id, field: params.field, value: event.target.value }, event);
                }}
                fullWidth
              >
                {state.drops.map((drop) => (
                  <MenuItem key={drop.dropID} value={drop.dropID}>
                    {drop.name}
                  </MenuItem>
                ))}
              </Select>
            );
          }},
        { field: 'name', headerName: 'Product Name', width: 120, editable: true},
        { field: 'price', headerName: 'Price', type: 'number', width: 130, editable: true},
        { field: 'material', headerName: 'Material',  width: 130, editable: true},
        { field: 'category', headerName: 'Category',  width: 130, editable: true},
        { field: 'color', headerName: 'Color',  width: 130, editable: true},
    ];
async function add(state: State) {
    const {
        dropID,
        name,
        price,
        material,
        category,
        color
    } = state.productInput;
    if (dropID == 0) {
        error.setError(true);
        error.setText("DropID must have a value");
        return;
    }
    if (name.length == 0) {
        error.setError(true);
        error.setText("Product Name must have a value");
        return;
    }
    if (price < 0) {
        error.setError(true);
        error.setText("Price must have a positive value");
        return;
    }
    if (material.length == 0) {
        error.setError(true);
        error.setText("Product must have a type of material");
        return;
    }
    if (category.length == 0) {
        error.setError(true);
        error.setText("Product must have a category");
        return;
    }
    const find = await generalQueries.find("products", {
        name: name,
        price: price,
        material: material,
        category: category,
        color: color
    });
    if (find.length > 0) {
        error.setError(true);
        error.setText("Product already exists");
    } else {
        generalQueries.createRow("products", state.productInput);
        error.setNormal();
    }
}
    return (
        <div>
            <ProductRowInput/>
            <ProductFilter/>
            <div className="centered-container">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button variant="contained" onClick={async ()=> {
                        // check if valid
                        add(state)
                    }}>Add</Button>
                    <Button variant="contained" onClick={async ()=> {
                        generalQueries.deleteRow('products', 'productID', rowSelection.rowIDs)
                    }}>Delete</Button>
                    <Button variant="contained" onClick={async ()=> {
                        generalQueries.resetAll('products');
                    }}>Reset</Button>
                </ButtonGroup>
            </div>
            <GeneralDataGrid tablename='products'rows={state.products} columns={columns} rowID="productID"/>
        </div>
    )});
export default Products;