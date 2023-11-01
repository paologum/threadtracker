import React from 'react';
import './BrandTable.css'
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

interface BrandListProps {
  brands: Brand[];
}

const columns: GridColDef[] = [
  { field: 'brandID', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Brand Name', width: 130 },
  { field: 'creator', headerName: 'Brand Creator', width: 130 },
  { field: 'year', headerName: 'Founded', width: 120 },
  { field: 'luxury', headerName: 'Luxury?', width: 130 },
  { field: 'rating', headerName: 'Rating', type: 'number', width: 130 },
];
export const rowSelection = new RowSelection();
const BrandList: React.FC<BrandListProps> = ({ brands }) => {
    return (
      <div style={{ height: 400, width: '100%', color: 'light black' }}>
      <DataGrid
        rows={brands}
        columns={columns}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.dark',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
        }}}
        // style={{
        //   border: '1px solid black',
        //   color: 'light black'
        // }}
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
export default BrandList;
//   return (
//     <div>
//       <h1>Brand List</h1>
//       <div className="grid-container">
//         {keys.map((props) => (
//         <p key={props}>{props}</p>
//         ))}
//         {brands.map((brand) => [
//             <React.Fragment key={brand.brandID}>
//                 <div className="grid-item">{brand.brandID}</div>
//                 <div className="grid-item">{brand.name}</div>
//                 <div className="grid-item">{brand.creator}</div>
//                 <div className="grid-item">{brand.startingDate.toLocaleDateString()}</div>
//                 <div className="grid-item">{brand.luxury ? "Yes" : "No"}</div>
//                 <div className="grid-item">{brand.rating}</div>
//             </React.Fragment>
//         ])}
//       </div>
//     </div>
//   );
// }