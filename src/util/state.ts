import dayjs, { Dayjs } from 'dayjs';
import { observable } from 'mobx';
import { Brand, Product } from '../../shared/types';
import { BrandInputState, Page } from './types';
export type State =  {
    brands: Brand[];
    page: Page;
    products: Product[];
    brandInput: BrandInputState;
}

export const state = observable<State>( {
    brands: [],
    page: {
        name:'Home',
        path:'/home'
    },
    products: [],
    brandInput: {
        name: "Brand Name",
        creator: "Brand Creator",
        year: dayjs().year(),
        luxury: false,
        rating: 5
    }
},
)