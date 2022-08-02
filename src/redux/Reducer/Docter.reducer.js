import * as ActionTypes from '../ActionTypes'

const initVal = {
    isLoading: false,
    Docter: [],
    error: ''
}
export const docterReducer = (state = initVal, action) => {
    console.log(action.type, action.payload);
    switch (action.type) {
        case ActionTypes.GET_DOCTERDATA:
            return {
                ...state,
                isLoading: false,
                Docter: action.payload,
                error: ''
            }
        case ActionTypes.LOADING_DOCTER:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionTypes.ERROR_DOCTER:
            return {
                ...state,
                isLoading: false,
                Docter: [],
                error: action.payload
            }
        default:
            return state;
    }

}