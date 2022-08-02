import { baseUrl } from '../../Shares/BaseUrl'
import * as ActionTypes from '../ActionTypes'

export const getPatients = () => (dispatch) => {
    try {
        dispatch(loadingPatients())

        setTimeout(function () {
            fetch(baseUrl + 'patients')
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        var errmess = new Error(error.message);
                        throw errmess;
                    })
                .then(response => response.json())
                .then((data) => dispatch(({ type: ActionTypes.GET_PATIENTSDATA, payload: data })))
                .catch(error => dispatch(errorPatients(error.message)));
        }, 2000)

    } catch (error) {
        console.log(error.message)
    }
}

export const addpatients = (data) => (dispatch) => {
    try {
        fetch(baseUrl + 'patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } catch (error) {

    }
}
export const loadingPatients = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_PATIENTS })
}

export const errorPatients = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_PATIENTS, payload: error })
}