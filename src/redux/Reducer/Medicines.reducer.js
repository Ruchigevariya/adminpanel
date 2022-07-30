import * as ActionTypes from '../ActionTypes'

const initVal = {
    isLoading: false,
    Medicines: [],
    error: ''
}
export const medicinesReducer = (state = initVal, action) => {
    switch (action.type) {
        case ActionTypes.GET_MEDICINESDATA:
            return {
                ...state,
                isLoading: false,
                Medicines: action.payload,
                error: ''
            }
        case ActionTypes.LOADING_MEDICINES:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionTypes.ERROR_MEDICINES:
            return {
                ...state,
                isLoading: false,
                Medicines: [],
                error: action.payload
            }

        default:
            return state;
    }
}