import './Home.css';
import Button from '@mui/material/Button';
import { fetcher } from '../util/actions';
import { observer } from 'mobx-react' 
import { state } from '../util/state'
import { useContext } from 'react';
import BrandList, { Brand } from '../BrandTable';   
import { getBrands } from '../util/actions';
import { context } from '../util';
export const Home = observer (function () {
    const {state, actions} = useContext(context);
    return (
        <div>
            <div className="centered-container">
                <Button variant="contained" onClick={() => {
                actions.getBrands();
                }}>Get Table</Button>
            </div>
            <div>
                <BrandList brands= {state.brands}/>
            </div>
        </div>
    )});