import { createStore } from 'redux'
import { rootCounter } from './Reducer';

export const configure = () => {
    let store = createStore(rootCounter);

    return store;
}