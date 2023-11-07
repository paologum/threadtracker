import dayjs, { Dayjs } from 'dayjs';
import { observable } from 'mobx';
import { Brand, Product } from '../../shared/types';
import { BrandInputState, Page, ProductInputState } from './types';
export type State =  {
    brands: Brand[];
    products: Product[];
    brandInput: BrandInputState;
    productInput: ProductInputState;
}

export const state = observable<State>( {
    brands: [],
    products: [],
    brandInput: {
        name: "",
        creator: "",
        year: dayjs().year(),
        luxury: false,
        rating: 5
    },
    productInput: {
        dropID: 0,
        brandID: 0,
        name: "",
        price: 0,
        material: "",
        category: "",
        color: ""
    }
},
)