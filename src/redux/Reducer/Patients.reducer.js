import * as ActionTypes from '../ActionTypes'

const initVal = {
    isLoading: false,
    Patients: [],
    error: ''
}

export const pattientsReducer = (state = initVal, action) => {
    console.log(action.type);
    switch(action.type){
        case ActionTypes.GET_PATIENTSDATA:
            return{
                ...state,
                isLoading: false,
                Patients:action.payload,
                error: ''
            }
            
            default:
                return state;
    }
    
}