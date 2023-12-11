import { action } from "mobx";
import { actions, state } from ".";
import { Brand, Drop, Product } from "../../shared/types";
import { fetcher, setBrands, setDrops, setProducts } from "./actions";
import requests from "./constants";
import { BrandSummaries } from "./types";

export const getBrandSummary = action("getBrandSummary", async () => {
    try {
        const response = await fetcher(`${requests.brandSummary}`, {
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
        actions.setBrandSummaries(data as BrandSummaries[]);
    } catch (error) {
        console.log("Error getting all with error: ", error)

    }
});
