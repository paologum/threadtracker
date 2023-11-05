import { Button, ButtonGroup } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import GeneralDataGrid from '../elements/GeneralDataGrid';
import { context } from '../util/index';
import ProductRowInput from '../elements/ProductRowInput';
const Products: React.FC= observer (function () {
    const {state, actions} = useContext(context);
    const columns: GridColDef[] = [
        { field: 'productID', headerName: 'ID', width: 70 },
        { field: 'dropID', headerName: 'Drop ID', type: 'number', width: 130 },
        { field: 'brandID', headerName: 'Brand ID', type: 'number', width: 130 },
        { field: 'name', headerName: 'Product Name', width: 120 },
        { field: 'price', headerName: 'Price', type: 'number', width: 130 },
        { field: 'material', headerName: 'Material',  width: 60 },
        { field: 'category', headerName: 'Category',  width: 60 },
        { field: 'color', headerName: 'Color',  width: 60 },
    ];
    return (
        <div>
            <ProductRowInput/>
            <div className="centered-container">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button variant="contained" onClick={async ()=> {
                    }}>Add</Button>
                    <Button variant="contained" onClick={async ()=> {
                    }}>Delete</Button>
                    <Button variant="contained" onClick={async ()=> {
                    }}>Reset</Button>
                </ButtonGroup>
            </div>
            <GeneralDataGrid rows={state.products} columns={columns}/>
        </div>
    )});
export default Products;