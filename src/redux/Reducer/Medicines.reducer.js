import * as ActionTypes from '../ActionTypes'

const initVal = {
    isLoading: false,
    Medicines: [],
    error:''
}
export const medicinesReducer = (state = initVal, action) => {
    switch(action.type) {
        case ActionTypes.GET_MEDICINESDATA:
            return{
                ...state,
                isLoading:false,
                Medicines: action.payload,
                error:''
            }

            default:
                return state;
    }
}