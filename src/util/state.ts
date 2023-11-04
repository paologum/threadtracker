import { observable } from 'mobx';
import { Brand } from '../../shared/types';
import { Page } from './types';
export type State =  {
    brands: Brand[];
    page: Page;
}

export const state = observable<State>( {
    brands: [],
    page: {
        name:'Home',
        path:'/home'
    }
},
)