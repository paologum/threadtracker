
import { ButtonGroup, Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import DropRowInput, { error } from '../elements/DropRowInput';
import GeneralDataGrid, { rowSelection } from '../elements/GeneralDataGrid';
import { createRow, deleteRow, resetAll, find} from '../util/general-queries';
import { context } from '../util/index';
import { State } from '../util/state';
const columns: GridColDef[] = [
  { field: 'dropID', headerName: 'ID', type: 'number', width: 70 },
  { field: 'brandID', headerName: 'Brand ID', type: 'number', width: 130 },
  { field: 'name', headerName: 'Drop Name', width: 130 },
  { field: 'date', headerName: 'Released', width: 120 },
  { field: 'season', headerName: 'Season', width: 130 },
];
async function add(state: State) {
    const {
        brandID,
        name,
        date,
        season
    } = state.dropInput;
    if (brandID <= 0) {
        error.setError(true);
        error.setText("Drop must be related to a brand");
        return;
    }
    if (name.length == 0) {
        error.setError(true);
        error.setText("Drop Name must have a value");
        return;
    } 
    if (season.length == 0) {
        error.setError(true);
        error.setText("Season must have a value");
        return;
    }
    const search = await find("drops", {
        brandID: brandID,
        name: name,
        date: date,
        season: season
    });
    if (search.length > 0) {
        error.setError(true);
        error.setText("Drop already exists");
    } else {
        createRow("drops", state.dropInput);
        error.setNormal();
    }

    
}
const Drops: React.FC= observer (function () {
    const {state, actions} = useContext(context);
    return (
        <div>
        <DropRowInput/>
        <div className="centered-container">
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button variant="contained" onClick={async ()=> {
                    add(state);
                }}>Add</Button>
                <Button variant="contained" onClick={async ()=> {
                    deleteRow('drops', 'dropID', rowSelection.rowIDs)
                    error.setNormal;
                }}>Delete</Button>
                <Button variant="contained" onClick={async ()=> {
                    resetAll('drops');
                    error.setNormal;
                }}>Reset</Button>
            </ButtonGroup>
        </div>
        <GeneralDataGrid rows={state.drops} columns={columns} rowID="dropID"/>
        </div>
    )});
export default Drops;