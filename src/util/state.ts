import { observable } from 'mobx'
import { Brand } from '../BrandTable'
export type State =  {
    brands: Brand[];
}

export const state = observable<State>( {
    brands: [{
        brandID: 1,
        name: 'Margiela',
        creator: 'Martin Margiela',
        startingDate: new Date('1973-1-1'),
        luxury: true,
        rating: 10
    }],
},
)