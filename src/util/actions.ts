import { action } from 'mobx'
import { state, State } from './state'
import { Brand } from '../../shared/types' 
import { BrandTextInputState } from '../elements/RowInput';
// If you are running in dev mode, prefix URL's with the dev server URL:

const devurl = "http://localhost:5173";
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

export async function fetcher(...args: Parameters<typeof fetch>): ReturnType<typeof fetch> {
    if (typeof args[0] === 'string') { 
        args[0] = devSafeUrl(args[0]);
    }
    return fetch(...args);
}
export const getBrands = action("getBrands", async () => {
    try {
        const response = await fetcher('/router/all');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        state.brands = data; 
        console.log(state.brands);
    } catch (error) {
        console.log("Error getting brands with error: ", error)

    }
});

export const addBrands = action("addBrands", async(brand: BrandTextInputState) => {
    const body = JSON.stringify(brand);
    const response = await fetcher('/createBrand', {
        method: 'POST',
        body: body 
    });
    await getBrands();
})