import { Button, ButtonGroup } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import GeneralDataGrid, { rowSelection } from '../elements/GeneralDataGrid';
import { context } from '../util/index';
import ProductRowInput from '../elements/ProductRowInput';
import * as generalQueries from '../util/general-queries';
import { State } from '../util/state';
async function add(state: State) {
    //TODO add input checking.
    generalQueries.createRow('products', state.productInput);
}
const Products: React.FC= observer (function () {
    const {state, actions} = useContext(context);
    const columns: GridColDef[] = [
        { field: 'productID', headerName: 'ID', width: 20 },
        { field: 'dropID', headerName: 'Drop ID', type: 'number', width: 80 },
        { field: 'brandID', headerName: 'Brand ID', type: 'number', width: 80 },
        { field: 'name', headerName: 'Product Name', width: 120 },
        { field: 'price', headerName: 'Price', type: 'number', width: 130 },
        { field: 'material', headerName: 'Material',  width: 130 },
        { field: 'category', headerName: 'Category',  width: 130 },
        { field: 'color', headerName: 'Color',  width: 130 },
    ];
    return (
        <div>
            <ProductRowInput/>
            <div className="centered-container">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button variant="contained" onClick={async ()=> {
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
            <GeneralDataGrid rows={state.products} columns={columns} rowID="productID"/>
        </div>
    )});
export default Products;