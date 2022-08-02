import * as ActionTypes from '../ActionTypes'

const initVal = {
    isLoading: false,
    Patients: [],
    error: ''
}

export const pattientsReducer = (state = initVal, action) => {
    console.log(action.type, action.payload);
    switch (action.type) {
        case ActionTypes.GET_PATIENTSDATA:
            return {
                ...state,
                isLoading: false,
                Patients: action.payload,
                error: ''
            }
        case ActionTypes.ADD_PATIENTSDATA:
            return {
                ...state,
                isLoading: false,
                Patients: state.Patients.concat(action.payload),
                error: ''
            }
        case ActionTypes.LOADING_PATIENTS:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionTypes.ERROR_PATIENTS:
            return {
                ...state,
                isLoading: false,
                Patients: [],
                error: action.payload
            }

        default:
            return state;
    }

}