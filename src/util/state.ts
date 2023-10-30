import { observable } from 'mobx'
import { Brand } from '../BrandTable'
export type State =  {
    brands: Brand[];
}

export const state = observable<State>( {
    brands: [],
},
)