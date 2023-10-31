import './Home.css';
import Button from '@mui/material/Button';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import BrandList from '../elements/BrandTable';   
import { context } from '../util/index';
import BrandTextInput, { brandTextInputState } from '../elements/TextInput'
export const Home = observer (function () {
    const {state, actions} = useContext(context);
    return (
        <div>
            <BrandTextInput />
            <div className="centered-container">
                <Button variant="contained" onClick={() => {
                // actions.getBrands();
                console.log(brandTextInputState);
                }}>Add Brand</Button>
            </div>
            <BrandList brands= {state.brands}/>
        </div>
    )});