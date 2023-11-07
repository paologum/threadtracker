import { action } from "mobx";
import { fetcher } from "./actions";
import requests from "./constants";
import { getAll } from "./general-queries";
import { BrandInputState } from "./types";

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
        console.log('Error deleting brands with error: ', error);
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

export const addBrands = action("addBrands", async(brand: BrandInputState) => {
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
        console.log("response: ", await response.json());
    } catch (error) {
        console.log("Error adding brands with error: ", error)
    }
})