import './Home.css';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import { context } from '../util/index';
import GeneralDataGrid from '../elements/GeneralDataGrid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
const Home: React.FC= observer (function () {
    const {state, actions} = useContext(context);
    const columns: GridColDef[] = [
        { field: 'brandID', headerName: 'ID', width: 20 },
        { field: 'name', headerName: 'Product Name', width: 120},
        { field: 'total_products', headerName: 'Total Products', type: 'number', width: 130},
        { field: 'average_price', headerName: 'Average Price',  width: 130, type: 'number'},
        { field: 'total_drops', headerName: 'Total Drops',  width: 130, type: 'number'},
    ];
    return (
      <div style={{ height: 400, width: '100%', color: 'light black' }}>
      <DataGrid
        rows={state.brandSummaries}
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
        getRowId={(row) => row['brandID']}
      />
    </div>
    )});
export default Home;