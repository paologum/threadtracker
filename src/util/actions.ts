import { action } from 'mobx'
import { state } from './state'
import { Brand, Drop, Product } from '../../shared/types' 
import { Dayjs } from 'dayjs';
import { BrandSummaries } from './types';
import { getProductFilter } from './complex-queries';
// If you are running in dev mode, prefix URL's with the dev server URL:

const devurl = "http://localhost:3000";
export function devSafeUrl(url: string) {
    if (!url.match(/^\//)) {
        console.log('WARNING: you did not use an absolute path for your URL in a request to fetcher (i.e. one starting with a /).');
        console.log('The url you passed to fetcher is: ', url);
        console.log('fetcher will prefix the path with the dev URL if you are running in dev mode, so relative paths do not work since you are not loading the page through the server.');
        console.log('Therefore, you will probably have bugs on the dev side.  The call stack here (to show you where you made the call) is: ', (new Error()).stack);
    }

    // vite sets this variable to true if you are running `yarn dev`, but if you
    // are running from the built files in dist/ (i.e. they are served to the 
    // browser from the node server instead of the vite dev server), then it 
    // will be false.
    return devurl + url;
}

// A wrapper around the fetch API that ensures the URL is safe for development.
// It prepends a development server URL if necessary.
export async function fetcher(...args: Parameters<typeof fetch>): ReturnType<typeof fetch> {
    if (typeof args[0] === 'string') { 
        args[0] = devSafeUrl(args[0]);
    }
    return fetch(...args);
}
export const setBrands = action("setBrands", (brands: Brand[]) => {
    state.brands = brands;
})
export const setProducts = action("setProducts", (products: Product[]) => {
    state.products = products;
})
export const setDrops = action("setDrops", (drops: Drop[]) => {
    state.drops = drops;
})
export const setBrandName = action("setBrandName", (value: string) => {
    state.brandInput.name=value;
})
export const setBrandCreator = action("setBrandCreator", (value: string) => {
    state.brandInput.creator=value;
})
export const setBrandYear = action("setBrandYear", (value: number) => {
    state.brandInput.year=value;
})
export const setBrandRating = action("setBrandRating", (value: number) => {
    state.brandInput.rating=value;
})
export const setBrandLuxury = action("setBrandLuxury", (value: boolean) => {
    state.brandInput.luxury=value;
})
export const setProductName = action("setProductName", (value: string) => {
    state.productInput.name=value;
})
export const setProductPrice = action("setProductPrice", (value: number) => {
    state.productInput.price=value;
})
export const setProductMaterial = action("setProductMaterial", (value: string) => {
    state.productInput.material=value;
})
export const setProductCategory = action("setProductCategory", (value: string) => {
    state.productInput.category=value;
})
export const setProductColor = action("setProductColor", (value: string) => {
    state.productInput.color=value;
})
export const setProductDrop = action("setProductDrop", (value: number) => {
    state.productInput.dropID=value;
})
export const setDropBrand= action("setDropBrand", (value: number) => {
    state.dropInput.brandID=value;
})
export const setDropName = action("setDropName", (value: string) => {
    state.dropInput.name=value;
})
export const setDropDate = action("setDropDate", (value: Dayjs) => {
    state.dropInput.date=value.format('MM/DD/YYYY');
})
export const setDropSeason= action("setDropBrand", (value: string) => {
    state.dropInput.season=value;
})
export const setBrandSummaries = action("setBrandSummaries", (value: BrandSummaries[]) => {
    state.brandSummaries = value;
})
export const setMinPrice = action("setMinPrice", (value: number) => {
    state.minPrice = value
})
export const setMaxPrice = action("setMaxPrice", (value: number) => {
    state.maxPrice = value
})
export const setRange = action("setRange", (value: number[]) => {
    state.range = value
    getProductFilter(state.range[0] as any as string, state.range[1] as any as string, state.productNameFilter, state.productColorFilter)
})
export const setProductNameFilter = action("setProductNameFilter", (value: string) => {
    state.productNameFilter = value
    getProductFilter(state.range[0] as any as string, state.range[1] as any as string, state.productNameFilter, state.productColorFilter)
})
export const setProductColorFilter = action("setProductColorFilter", (value: string) => {
    state.productColorFilter = value
    getProductFilter(state.range[0] as any as string, state.range[1] as any as string, state.productNameFilter, state.productColorFilter)
})