import { observable } from 'mobx';
import { Brand, Product } from '../../shared/types';
import { Page } from './types';
export type State =  {
    brands: Brand[];
    page: Page;
    products: Product[];
}

export const state = observable<State>( {
    brands: [],
    page: {
        name:'Home',
        path:'/home'
    },
    products: []
},
)