import { Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Home from './views/Home';
import Toolbar from '@mui/material/Toolbar'
import { TabBar } from './TabBar';
import { observer } from 'mobx-react';
import Brands from './views/Brands';
import './AppRouter.css'
import { useContext } from 'react';
import { context } from './util';
import Drops from './views/Drops';
import Products from './views/Products';

export default observer(function AppRouter () {
  const navigate = useNavigate();
  const onTabChange = (path: string) => {
      navigate(path);
  };
  return (
    <div>
      <TabBar onTabChange={onTabChange}/>
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/brands" element={<Brands/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/drops" element={<Drops/>} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
});