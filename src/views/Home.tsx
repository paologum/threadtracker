import './Home.css';
import Button from '@mui/material/Button';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import BrandList, { rowSelection } from '../elements/BrandTable';   
import { context } from '../util/index';
import BrandTextInput, { error, brandTextInputState } from '../elements/RowInput'
import { ButtonGroup } from '@mui/material';
import dayjs from 'dayjs';
const Home: React.FC= observer (function () {
    const {state, actions} = useContext(context);
    return (
        <div>
            <BrandTextInput />
            <div className="centered-container">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button variant="contained" onClick={async ()=> {
                        const {
                            brandName,
                            brandCreator,
                            startingDate,
                            luxury,
                            rating,
                          } = brandTextInputState;
                        const find = await actions.findBrand({
                            name: brandName,
                            creator: brandCreator,
                            year: dayjs().set('year', startingDate).year().toString(),
                            luxury: luxury.toString(),
                        });
                        if (find.length > 0) {
                            error.setError(true);
                            error.setText("Brand already exists");
                        } else {
                            actions.addBrands(brandTextInputState);
                            error.setNormal();
                        }

                    }}>Add</Button>
                    <Button variant="contained" onClick={async ()=> {
                        // console.log(rowSelection.rowIDs);
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
export default Home;