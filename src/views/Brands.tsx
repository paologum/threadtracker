import Button from '@mui/material/Button';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import GeneralDataGrid, { rowSelection } from '../elements/GeneralDataGrid';   
import { context } from '../util/index';
import BrandTextInput, { error } from '../elements/BrandRowInput'
import { ButtonGroup } from '@mui/material';
import dayjs from 'dayjs';
import { GridColDef } from '@mui/x-data-grid';
import * as brandQueries from '../util/brand-queries';
import * as generalQueries from '../util/general-queries';
import { State } from '../util/state';
const columns: GridColDef[] = [
  { field: 'brandID', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Brand Name', width: 130 },
  { field: 'creator', headerName: 'Brand Creator', width: 130 },
  { field: 'year', headerName: 'Founded', width: 120 },
  { field: 'luxury', headerName: 'Luxury?', width: 130 },
  { field: 'rating', headerName: 'Rating', type: 'number', width: 60 },
];
async function add(state: State) {
    const {
        name,
        creator,
        year,
        luxury,
        } = state.brandInput;
        if (name.length == 0) {
            error.setError(true);
            error.setText("Brand Name must have a value");
            return;
        } else if (creator.length == 0) {
            error.setError(true);
            error.setText("Brand Creator must have a value");
            return;
        }
    // check if it already exists.
    // SQL for some reason only accepts 1's and 0's for booleans
    // So change the boolean to a string of 1 or 0
    const find = await generalQueries.find("brands", {
        name: name,
        creator: creator,
        year: dayjs().set('year', year).year().toString(),
        // luxury is stored in input as a boolean
        // if ever receiving from server, need to reformat to true and false
        luxury: luxury ? "1" : "0",
    });
    // if we find something in the database that matches, do not create a brand
    if (find.length > 0) {
        error.setError(true);
        error.setText("Brand already exists");
    } else {
        generalQueries.createRow("brands", state.brandInput);
        error.setNormal();
    }

}
const Brands: React.FC= observer (function () {
    const {state, actions} = useContext(context);
    return (
        <div>
            <BrandTextInput />
            <div className="centered-container">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button variant="contained" onClick={async () => {
                        add(state);
                    }}>Add</Button>
                    <Button variant="contained" onClick={async ()=> {
                        // console.log(rowSelection.rowIDs);
                        await generalQueries.deleteRow('brands', 'brandID', rowSelection.rowIDs);
                        error.setNormal();
                    }}>Delete</Button>
                    <Button variant="contained" onClick={async ()=> {
                        await generalQueries.resetAll('brands');
                        error.setNormal();
                    }}>Reset</Button>
                </ButtonGroup>
            </div>
            <GeneralDataGrid rows= {state.brands} columns={columns} rowID="brandID"/>
        </div>
    )});
export default Brands;