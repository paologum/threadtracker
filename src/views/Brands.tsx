import Button from '@mui/material/Button';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import GeneralDataGrid, { rowSelection } from '../elements/GeneralDataGrid';   
import { context } from '../util/index';
import BrandTextInput, { error } from '../elements/BrandRowInput'
import { ButtonGroup } from '@mui/material';
import dayjs from 'dayjs';
import { GridColDef } from '@mui/x-data-grid';
const columns: GridColDef[] = [
  { field: 'brandID', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Brand Name', width: 130 },
  { field: 'creator', headerName: 'Brand Creator', width: 130 },
  { field: 'year', headerName: 'Founded', width: 120 },
  { field: 'luxury', headerName: 'Luxury?', width: 130 },
  { field: 'rating', headerName: 'Rating', type: 'number', width: 60 },
];
const Brands: React.FC= observer (function () {
    const {state, actions} = useContext(context);
    return (
        <div>
            <BrandTextInput />
            <div className="centered-container">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button variant="contained" onClick={async ()=> {
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
                        const find = await actions.findBrand({
                            name: name,
                            creator: creator,
                            year: dayjs().set('year', year).year().toString(),
                            luxury: luxury ? "1" : "0",
                        });
                        // if we find something in the database that matches, do not create a brand
                        if (find.length > 0) {
                            error.setError(true);
                            error.setText("Brand already exists");
                        } else {
                            actions.createRow("brands", state.brandInput);
                            error.setNormal();
                        }

                    }}>Add</Button>
                    <Button variant="contained" onClick={async ()=> {
                        // console.log(rowSelection.rowIDs);
                        actions.deleteBrand(rowSelection.rowIDs);
                        error.setNormal();
                    }}>Delete</Button>
                    <Button variant="contained" onClick={async ()=> {
                        actions.resetBrands();
                        error.setNormal();
                    }}>Reset</Button>
                </ButtonGroup>
            </div>
            <GeneralDataGrid rows= {state.brands} columns={columns} rowID="brandID"/>
        </div>
    )});
export default Brands;