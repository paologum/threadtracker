import { observable } from 'mobx';
import { Brand } from '../../shared/types';
import { Page } from './types';
export type State =  {
    brands: Brand[];
    page: Page;
}

export const state = observable<State>( {
    brands: [],
    page: {
        name:'Home',
        path:'/home'
    }
},
        // brandID: 1,
        // name: 'Margiela',
        // creator: 'Martin Margiela',
        // startingDate: new Date('1973-1-1'),
        // luxury: true,
        // rating: 10
)