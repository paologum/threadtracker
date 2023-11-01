import './Home.css';
import Button from '@mui/material/Button';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import BrandList, { rowSelection } from '../elements/BrandTable';   
import { context } from '../util/index';
import BrandTextInput, { brandTextInputState } from '../elements/RowInput'
import { ButtonGroup } from '@mui/material';
export const Home = observer (function () {
    const {state, actions} = useContext(context);
    return (
        <div>
            <BrandTextInput />
            <div className="centered-container">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button variant="contained" onClick={async ()=> {
                        actions.addBrands(brandTextInputState);
                    }}>Add</Button>
                    <Button variant="contained" onClick={async ()=> {
                        console.log(rowSelection.rowIDs);
                        actions.deleteBrand(rowSelection.rowIDs);
                    }}>Delete</Button>
                    <Button variant="contained" onClick={async ()=> {
                        actions.resetBrands();
                    }}>Reset</Button>
                </ButtonGroup>
            </div>
            <BrandList brands= {state.brands}/>
        </div>
    )});