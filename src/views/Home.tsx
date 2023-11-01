import './Home.css';
import Button from '@mui/material/Button';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import BrandList, { rowSelection } from '../elements/BrandTable';   
import { context } from '../util/index';
import BrandTextInput, { brandTextInputState } from '../elements/RowInput'
import { ButtonGroup } from '@mui/material';
import dayjs from 'dayjs';
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
                    <Button variant="contained" onClick={async ()=> {
                        const {
                            brandName,
                            brandCreator,
                            startingDate,
                            luxury,
                            rating,
                          } = brandTextInputState;
                        actions.findBrand({
                            name: brandName,
                            creator: brandCreator,
                            year: dayjs(startingDate).year().toString(),
                            luxury: luxury.toString(),
                            rating: rating.toString()
                        });
                    }}>Find</Button>
                </ButtonGroup>
            </div>
            <BrandList brands= {state.brands}/>
        </div>
    )});