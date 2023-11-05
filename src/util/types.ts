import { action, makeObservable, observable } from 'mobx';
import dayjs, { Dayjs } from 'dayjs';

export interface Page {
    name: string,
    path: string
}
export interface BrandInputState {
    name: string,
    creator: string,
    year: number,
    luxury: boolean,
    rating: number
}
export class BrandTextInputState {
  name = 'Brand';
  creator = 'Creator';
  year = dayjs().year();
  luxury = false;
  rating = 5;

  constructor() {
    makeObservable(this, {
      name: observable,
      creator: observable,
      year: observable,
      luxury: observable,
      rating: observable,
      setBrandName: action,
      setBrandCreator: action,
      setStartingDate: action,
      setLuxury: action,
      setRating: action,
    });
  }

  // Add actions to modify the state
  setBrandName(value: string) {
    this.name = value;
  }

  setBrandCreator(value: string) {
    this.creator = value;
  }

  setStartingDate(value: Dayjs) {
    this.year = value.year();
  }

  setLuxury(value: boolean) {
    this.luxury = value;
  }

  setRating(value: number) {
    this.rating = value;
  }
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