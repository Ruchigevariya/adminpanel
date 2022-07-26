import * as ActionTypes from '../ActionTypes'

export const getMedicines = () => (dispatch) => {
    try{
        fetch('http://localhost:3004/medicines')
        .then((response) => response.json())
        .then((data) => dispatch({type: ActionTypes.GET_MEDICINESDATA, payload: data}))
    }catch (error) {
       console.log(error.message)
    }
}