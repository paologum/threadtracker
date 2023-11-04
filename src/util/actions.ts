import { action } from 'mobx'
import { state, State } from './state'
import { Brand } from '../../shared/types' 
import { BrandTextInputState } from '../elements/RowInput';
import { actions } from '.';
import { useNavigate } from 'react-router-dom';
import requests from './constants';
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
export const getAll = action("getAll", async (table: string) => {
    try {
        const url = new URLSearchParams({table: table}).toString();
        const response = await fetcher(`${requests.getAll}?${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        switch(table){
            case "brands": {
                setBrands(data as Brand[])
                break;
            }
        }
    } catch (error) {
        console.log("Error getting brands with error: ", error)

    }
});
export const setBrands = action("setBrands", (brands: Brand[]) => {
    state.brands = brands;
})
export const deleteBrand = action("deleteBrand", async (ids: number[]) => {
    try {
        await fetcher(requests.deleteBrand,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ids : ids})
        });
        await getAll("brands");
    } catch (error) {
        console.log('Error resetting brands with error: ', error);
    }
})
export const resetBrands = action("resetBrands", async () => {
    try {
        await fetcher(requests.resetBrand,{
            method: "PUT",
        });
        await getAll("brands");
    } catch (error) {
        console.log('Error resetting brands with error: ', error);
    }
})

export const findBrand = action("findBrand", async (brand: {name: string, creator: string, year: string, luxury: string,}) => {
    const url = new URLSearchParams(brand).toString();
    try {
        const response = await fetcher(`${requests.findBrand}?${url}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
              },
        });
        const found = await response.json()
        console.log(found);
        return found;
    } catch (error) {
        console.log('Error finding brands with error: ', error);
    }
})

export const addBrands = action("addBrands", async(brand: BrandTextInputState) => {
    const body = JSON.stringify(brand);
    try {
        const response = await fetcher(requests.addBrand, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: body
        });
        await getAll("brands");
    } catch (error) {
        console.log("Error adding brands with error: ", error)
    }
})
export const createRow = action("createRow", async(table: string, row: any) => {
    const body = JSON.stringify(row);
    try {
        const response = await fetcher(`${requests.createRow}/${table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: body
        });
        await getAll(table);
    } catch (error) {
        console.log("Error adding brands with error: ", error)
    }
})