import * as ActionTypes from '../ActionTypes' 

const initVal = {
    isLoading: false,
    Docter: [],
    error: ''
}
export const docterReducer = (state = initVal, action) => {
    console.log(action.type,action.payload);
    switch(action.type){
        case ActionTypes.GET_DOCTERDATA:
            return{
                ...state,
                isLoading: false,
                Docter: action.payload,
                error: ''
            }

            default:
                return state;
    }

}