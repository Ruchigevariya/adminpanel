import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { rootreducer } from './Reducer';

export const configureStore = () => {
    let store = createStore(rootreducer, applyMiddleware(thunk));

    return store;
}