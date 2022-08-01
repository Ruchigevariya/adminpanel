import * as ActionTypes from '../ActionTypes'

export const getDocterdata = () => (dispatch) => {
    try {
        fetch(' http://localhost:3004/docter')
            .then((response) => response.json())
            .then((data) => dispatch({ type : ActionTypes.GET_DOCTERDATA, payload: data}));
    } catch (error) {
        console.log(error);
    }
}