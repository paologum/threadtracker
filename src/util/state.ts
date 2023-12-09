import dayjs, { Dayjs } from 'dayjs';
import { observable } from 'mobx';
import { Brand, Product, Drop } from '../../shared/types';
import { BrandInputState, DropInputState, ProductInputState } from './types';
export type State =  {
    brands: Brand[];
    products: Product[];
    drops: Drop[];
    brandInput: BrandInputState;
    productInput: ProductInputState;
    dropInput: DropInputState;
}

export const state = observable<State>( {
    brands: [],
    products: [],
    drops: [],
    brandInput: {
        name: "",
        creator: "",
        year: dayjs().year(),
        luxury: false,
        rating: 5
    },
    productInput: {
        dropID: 0,
        name: "",
        price: 0,
        material: "",
        category: "",
        color: ""
    },
    dropInput: {
        brandID: 0,
        name: "",
        date: dayjs().format('MM/DD/YYYY'),
        season: "",
        }
},
)