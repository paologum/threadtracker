import React from 'react';
import './GeneralDataGrid.css'
import { DataGrid, GridColDef, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { Brand } from '../../shared/types' 
import { action, makeObservable, observable } from 'mobx';

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
  rows: any[];
  columns: GridColDef[];
}

export const rowSelection = new RowSelection();
const GeneralDataGrid: React.FC<GeneralDataGridProps> = ({ rows, columns }) => {
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
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(callback, details) => rowSelection.setRowIDs(callback)}
        getRowId={(row) => row.brandID}
      />
    </div>
    );
};
export default GeneralDataGrid;