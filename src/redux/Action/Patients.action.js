import * as ActionTypes from '../ActionTypes'

export const getPatients = () => (dispatch) => {
    try {
        fetch(' http://localhost:3004/patients')
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionTypes.GET_PATIENTSDATA, payload: data}));
    } catch (error) {
        console.log(error.message)
    }
}