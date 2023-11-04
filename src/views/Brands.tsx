import Button from '@mui/material/Button';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import GeneralDataGrid, { rowSelection } from '../elements/GeneralDataGrid';   
import { context } from '../util/index';
import BrandTextInput, { error, brandTextInputState } from '../elements/RowInput'
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
                            brandName,
                            brandCreator,
                            startingDate,
                            luxury,
                          } = brandTextInputState;
                        // check if it already exists
                        const find = await actions.findBrand({
                            name: brandName,
                            creator: brandCreator,
                            year: dayjs().set('year', startingDate).year().toString(),
                            luxury: luxury.toString(),
                        });
                        // if we find something in the database that matches, do not create a brand
                        if (find.length > 0) {
                            error.setError(true);
                            error.setText("Brand already exists");
                        } else {
                            actions.createRow("brands", brandTextInputState);
                            error.setNormal();
                        }

                    }}>Add</Button>
                    <Button variant="contained" onClick={async ()=> {
                        // console.log(rowSelection.rowIDs);
                        actions.deleteBrand(rowSelection.rowIDs);
                    }}>Delete</Button>
                    <Button variant="contained" onClick={async ()=> {
                        actions.resetBrands();
                    }}>Reset</Button>
                </ButtonGroup>
            </div>
            <GeneralDataGrid rows= {state.brands} columns={columns}/>
        </div>
    )});
export default Brands;