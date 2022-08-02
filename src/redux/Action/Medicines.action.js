import { baseUrl } from '../../Shares/BaseUrl'
import * as ActionTypes from '../ActionTypes'

export const getMedicines = () => (dispatch) => {
    try {
        dispatch(loadingMedicines())

        setTimeout(function () {
            fetch(baseUrl + 'medicines')
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
                .then((data) => dispatch({ type: ActionTypes.GET_MEDICINESDATA, payload: data }))
                .catch((error) => dispatch(errorMedicines(error.message)))
        }, 2000)

    } catch (error) {
        dispatch(errorMedicines(error.message))
    }

}

export const addMedicines = (data) => (dispatch) => {
    try {
        fetch(baseUrl + 'medicines', {
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
                dispatch({ type: ActionTypes.ADD_MEDICINESDATA, payload: data })
            })
            .catch((error) => {
                dispatch(errorMedicines(error.message))
            });
    } catch (error) {
        dispatch(errorMedicines(error.message))
    }
}

export const deleteMedicines = (id) => (dispatch) => {
    console.log(id);
    try{
        fetch(baseUrl + 'medicines/'+ id, {
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
        .then(dispatch({ type: ActionTypes.DELETE_MEDICINESDATA, payload: id }))
        .catch((error) => {
            dispatch(errorMedicines(error.message))
        });
    } catch(error) {
        dispatch(errorMedicines(error.message))
    }
}

export const updateMedicines = (data) => (dispatch) => {
    console.log(data);
    try{
        fetch(baseUrl + 'medicines/' + id ,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),  
        })
        .then((response) => response.json())
        .then((data) => {dispatch({ type: ActionTypes.UPDATE_MEDICINESDATA, payload: data })})
    } catch (error) {

    }

}
export const loadingMedicines = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_MEDICINES })
}

export const errorMedicines = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_MEDICINES, payload: error })
}