
import { ButtonGroup, Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import DropRowInput from '../elements/DropRowInput';
import GeneralDataGrid, { rowSelection } from '../elements/GeneralDataGrid';
import { createRow, deleteRow, resetAll } from '../util/general-queries';
import { context } from '../util/index';
const columns: GridColDef[] = [
  { field: 'dropID', headerName: 'ID', type: 'number', width: 70 },
  { field: 'brandID', headerName: 'Brand ID', type: 'number', width: 130 },
  { field: 'name', headerName: 'Drop Name', width: 130 },
  { field: 'date', headerName: 'Released', width: 120 },
  { field: 'season', headerName: 'Season', width: 130 },
  { field: 'collaboratorID', headerName: 'Collaborator ID', type: 'number', width: 60 },
];
const Drops: React.FC= observer (function () {
    const {state, actions} = useContext(context);
    return (
        <div>
        <DropRowInput/>
        <div className="centered-container">
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button variant="contained" onClick={async ()=> {
                    createRow('drops', state.dropInput);
                }}>Add</Button>
                <Button variant="contained" onClick={async ()=> {
                    deleteRow('drops', 'dropID', rowSelection.rowIDs)
                }}>Delete</Button>
                <Button variant="contained" onClick={async ()=> {
                    resetAll('drops');
                }}>Reset</Button>
            </ButtonGroup>
        </div>
        <GeneralDataGrid rows={state.drops} columns={columns} rowID="dropID"/>
        </div>
    )});
export default Drops;