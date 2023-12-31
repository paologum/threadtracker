import dayjs, { Dayjs } from 'dayjs';
import { observable } from 'mobx';
import { Brand, Product, Drop } from '../../shared/types';
import { BrandInputState, BrandSummaries, DropInputState, ProductInputState } from './types';
export type State =  {
    brands: Brand[];
    products: Product[];
    drops: Drop[];
    brandInput: BrandInputState;
    productInput: ProductInputState;
    dropInput: DropInputState;
    brandSummaries: BrandSummaries[];
    minPrice: number;
    maxPrice: number;
    range: number[];
    productNameFilter: string;
    productColorFilter: string;
    productCategoryFilter: string;
    productMaterialFilter: string;
    productCategoryList: string[];
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
    },
    brandSummaries: [],
    minPrice: 0,
    maxPrice: 0,
    range: [0, 0],
    productNameFilter: "",
    productColorFilter: "",
    productCategoryFilter: "",
    productMaterialFilter: "",
    productCategoryList: [],
},
)