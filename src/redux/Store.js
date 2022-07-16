import { createStore } from 'redux'
import { rootreducer } from './Reducer';

export const configureStore = () => {
    let store = createStore(rootreducer);

    return store;
}