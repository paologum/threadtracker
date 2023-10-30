import './Home.css';
import Button from '@mui/material/Button';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import BrandList from '../BrandTable';   
import { context } from '../util/index';
export const Home = observer (function () {
    const {state, actions} = useContext(context);
    return (
        <div>
            <div className="centered-container">
                <Button variant="contained" onClick={() => {
                actions.getBrands();
                }}>Get Table</Button>
            </div>
            <BrandList brands= {state.brands}/>
        </div>
    )});