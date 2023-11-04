
import { observer } from 'mobx-react' 
import { useContext } from 'react';
import { context } from '../util/index';
const Drops: React.FC= observer (function () {
    const {state, actions} = useContext(context);
    return (
        <div>
        </div>
    )});
export default Drops;