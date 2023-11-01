import { Routes, Route} from 'react-router-dom';
import { Home } from './views/Home';
import Toolbar from '@mui/material/Toolbar'
import { Database } from './views/Database';
import TabBar from './TabBar';
import { observer } from 'mobx-react';
import './AppRouter.css'

export default observer(function AppRouter () {
  return (
    <div>
      <TabBar />
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Database" element={<Database/>} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
});