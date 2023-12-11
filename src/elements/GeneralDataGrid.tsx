import React from 'react';
import './GeneralDataGrid.css'
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { action, makeObservable, observable } from 'mobx';
import * as generalQueries from '../util/general-queries';

export class RowSelection {
  rowIDs: number[] = [];
  constructor() {
    makeObservable(this, {
      rowIDs: observable,
      setRowIDs: action
    });
  }
  setRowIDs(value: GridRowSelectionModel) {
    this.rowIDs = value.map((num) => num as number);
  }
}

interface GeneralDataGridProps {
  tablename: string;
  rows: any[];
  columns: GridColDef[];
  rowID: string;
}

export const rowSelection = new RowSelection();
const GeneralDataGrid: React.FC<GeneralDataGridProps> = ({ tablename, rows, columns, rowID}) => {
    return (
      <div style={{ height: 400, width: '100%', color: 'light black' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.dark',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
        }}}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(callback, details) => rowSelection.setRowIDs(callback)}
        processRowUpdate={(newRow, oldRow) => {
          generalQueries.edit(tablename, rowID, newRow[rowID], newRow)
          console.log(newRow)
          return newRow
        }}
        onProcessRowUpdateError= {(err) => {
          console.log(err)
        }}
        getRowId={(row) => row[rowID]}
      />
    </div>
    );
};
export default GeneralDataGrid;