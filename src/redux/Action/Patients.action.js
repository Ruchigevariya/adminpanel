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
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error(' Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch({ type: ActionTypes.ADD_PATIENTSDATA, payload: data})
            })
            .catch((error) => {
                dispatch(errorPatients(error.message))
            });
    } catch (error) {
        dispatch(errorPatients(error.message))
    }
}

export const deletePatientsdata = (id) => (dispatch) => {
    console.log(id);
    try{
        fetch(baseUrl + 'patients/' + id ,{
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error(' Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then((response) => response.json())
        .then(dispatch({ type: ActionTypes.DELETE_PATIENTSDATA, payload: id}))
        .catch((error) => {
            dispatch(errorPatients(error.message))
        });
    } catch (error) {
        dispatch(errorPatients(error.message))
    }
}
export const loadingPatients = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_PATIENTS })
}

export const errorPatients = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_PATIENTS, payload: error })
}