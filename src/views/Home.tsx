import './Home.css';
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import { context } from '../util/index';
const Home: React.FC= observer (function () {
    const {state, actions} = useContext(context);
    return (
        <div>
        </div>
    )});
export default Home;