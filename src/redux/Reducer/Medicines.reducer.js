import * as ActionTypes from '../ActionTypes'

const initVal = {
    isLoading: false,
    Medicines: [],
    error: ''
}
export const medicinesReducer = (state = initVal, action) => {
    console.log(action.type, action.payload);
    switch (action.type) {
        case ActionTypes.GET_MEDICINESDATA:
            return {
                ...state,
                isLoading: false,
                Medicines: action.payload,
                error: ''
            }
        case ActionTypes.ADD_MEDICINESDATA:
            return {
                ...state,
                isLoading: false,
                Medicines: state.Medicines.concat(action.payload),
                error: ''
            }
        case ActionTypes.DELETE_MEDICINESDATA:
            return {
                ...state,
                isLoading: false,
                Medicines: state.Medicines.filter((m) => m.id !== action.payload),
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