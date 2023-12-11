import { action } from "mobx";
import { Routes } from "react-router";
import { Brand, Drop, Product } from "../../shared/types";
import { fetcher, setBrands, setDrops, setProducts } from "./actions";
import requests from "./constants";
import * as complexQueries from './complex-queries';

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
        // console.log(data);
        switch(table){
            case "brands": {
                let content = data as Brand[];
                content.map((row, index) => {
                    row.luxury = row.luxury ? "Yes" : "No"
                })
                setBrands(content)
                break;
            }
            case "products": {
                setProducts(data as Product[])
                break;
            }
            case "drops": {
                setDrops(data as Drop[])
                break;
            }
        }
        complexQueries.getBrandSummary();
        // console.log("response: ", data);
    } catch (error) {
        console.log("Error getting all with error: ", error)

    }
});

export const deleteRow = action("deleteRow", async (table: string, idProp: string, rows: number[]) => {
    const body = JSON.stringify({ids: rows});
    try {
        const response = await fetcher(`${requests.delete}/${table}/${idProp}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: body
        });
        await getAll(table);
        console.log("response: ", await response.json());
    } catch (error) {
        console.log("Error deleting row with error: ", error)
    }
})

export const createRow = action("createRow", async(table: string, row: any) => {
    const body = JSON.stringify(row);
    console.log(body);
    try {
        const response = await fetcher(`${requests.createRow}/${table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: body
        });
        await getAll(table);
        console.log("response: ", await response.json());
    } catch (error) {
        console.log("Error creating rows with error: ", error)
    }
})
export const resetAll = action("resetAll", async (table: string) => {
    const url = new URLSearchParams({table: table}).toString();
    try {
        await fetcher(`${requests.resetAll}?${url}`,{
            method: "PUT",
        });
        await getAll(table);
    } catch (error) {
        console.log('Error resetting all with error: ', error);
    }
})
export const find = action("find", async (table: string, props: any) => {
    const url = new URLSearchParams(props).toString();
    try {
        const response = await fetcher(`${requests.find}/${table}?${url}`,{
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

export const edit = action("edit", async (table: string, idProp: string, id: string, info: any) => {
    const body = JSON.stringify({idProp: idProp, id: id, info: info})
    try {
        const response = await fetcher(`${requests.edit}/${table}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
              },
              body: body
        });
        const res = await response.json();
        await getAll(table);
        return res;
    } catch (error) {
        console.log('Error editing table: ', table, ' with error: ', error);
    }
})