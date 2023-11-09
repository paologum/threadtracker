import { action, makeObservable, observable } from 'mobx';
import dayjs, { Dayjs } from 'dayjs';

export interface Page {
    name: string,
    path: string
}
// this is the deprecated brand without the id
export interface BrandInputState {
    name: string,
    creator: string,
    year: number,
    luxury: boolean,
    rating: number
}
// this is the deprecated product without the id
export interface ProductInputState {
  dropID: number,
  brandID: number,
  name: string,
  price: number,
  material: string,
  category: string,
  color: string
}

export interface DropInputState {
  brandID: number,
  name: string,
  date: string,
  season: string,
  collaboratorID: number
}
export class ErrorType {
  error=false;
  text="";
  constructor() {
    makeObservable(this, {
      error: observable,
      text: observable,
      setError: action,
      setText: action
    });
  }
  setError(value: boolean) {
    this.error=value;
  }
  setText(value:string){
    this.text=value;
  }
  setNormal() {
    this.setError(false)
    this.setText("")
  }
}