
import { ButtonGroup, Button, Select, MenuItem } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import DropRowInput, { error } from '../elements/DropRowInput';
import GeneralDataGrid, { rowSelection } from '../elements/GeneralDataGrid';
import { createRow, deleteRow, resetAll, find} from '../util/general-queries';
import { context } from '../util/index';
import { State } from '../util/state';
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
    const columns: GridColDef[] = [
    { field: 'dropID', headerName: 'ID', type: 'number', width: 70, editable: true},
    { field: 'brandID', headerName: 'Brand ID', type: 'number', width: 130, editable: true, 
    renderEditCell: (params) => {
                return (
                <Select
                    value={params.value}
                    onChange={(event) => {
                    params.api.setEditCellValue({ id: params.id, field: params.field, value: event.target.value }, event);
                    }}
                    fullWidth
                >
                    {state.brands.map((brand) => (
                    <MenuItem key={brand.brandID} value={brand.brandID}>
                        {brand.name}
                    </MenuItem>
                    ))}
                </Select>
                );
            }},
    { field: 'name', headerName: 'Drop Name', width: 130, editable: true}, 
    { field: 'date', headerName: 'Released', width: 120, editable: true,
          renderEditCell: (params) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(params.value)}
                  onChange={(newValue) => {
                    const formattedDate = newValue ? dayjs(newValue).format('MM/DD/YYYY') : '';
                    params.api.setEditCellValue({ id: params.id, field: params.field, value: formattedDate });
                    params.api.stopCellEditMode({ id: params.id, field: params.field });
                  }}
                />
              </LocalizationProvider>
              );
          }},
    { field: 'season', headerName: 'Season', width: 130, editable: true ,
    renderEditCell: (params) => {
                return (
                <Select
                    value={params.value}
                    onChange={(event) => {
                    params.api.setEditCellValue({ id: params.id, field: params.field, value: event.target.value }, event);
                    }}
                    fullWidth
                >
                    <MenuItem key={0} value={'Spring/Summer'}>
                        {'Spring/Summer'}
                    </MenuItem>
                    <MenuItem key={1} value={'Fall/Winter'}>
                        {'Fall/Winter'}
                    </MenuItem>
                    ))
                </Select>
                );
            }},
    ];
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
        <GeneralDataGrid tablename='drops' rows={state.drops} columns={columns} rowID="dropID" />
        </div>
    )});
export default Drops;