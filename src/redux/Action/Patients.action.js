import { deletePatientsData, getPatientsData, postPatientsData, putPatientsData } from '../../Common/Apis/Patients.api'
import { db } from '../../firebase'
import { baseUrl } from '../../Shares/BaseUrl'
import * as ActionTypes from '../ActionTypes'
import { collection, addDoc } from "firebase/firestore"; 

export const getPatients = () => (dispatch) => {
    try {
        // dispatch(loadingPatients())

        // setTimeout(function () {
        //     getPatientsData()
        //         .then((data) => dispatch(({ type: ActionTypes.GET_PATIENTSDATA, payload: data.data })))
        //         .catch(error => dispatch(errorPatients(error.message)));
            // fetch(baseUrl + 'patients')
            //     .then(response => {
            //         if (response.ok) {
            //             return response;
            //         } else {
            //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
            //             error.response = response;
            //             throw error;
            //         }
            //     },
            //         error => {
            //             var errmess = new Error(error.message);
            //             throw errmess;
            //         })
            //     .then(response => response.json())
            //     .then((data) => dispatch(({ type: ActionTypes.GET_PATIENTSDATA, payload: data })))
            //     .catch(error => dispatch(errorPatients(error.message)));
        // }, 2000)

    } catch (error) {
        console.log(error.message)
    }
}

export const addpatients = (data) => async(dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "patients"), data);
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: ActionTypes.ADD_PATIENTSDATA, payload: { id: docRef.id, ...data } })

        // postPatientsData(data)
        // .then((data) => {
        //             dispatch({ type: ActionTypes.ADD_PATIENTSDATA, payload: data.data})
        //         })
        //         .catch((error) => {
        //             dispatch(errorPatients(error.message))
        //         });
        // fetch(baseUrl + 'patients', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        // .then(response => {
        //     if (response.ok) {
        //         return response;
        //     } else {
        //         var error = new Error(' Error ' + response.status + ': ' + response.statusText);
        //         error.response = response;
        //         throw error;
        //     }
        // },
        //     error => {
        //         var errmess = new Error(error.message);
        //         throw errmess;
        //     })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         dispatch({ type: ActionTypes.ADD_PATIENTSDATA, payload: data})
        //     })
        //     .catch((error) => {
        //         dispatch(errorPatients(error.message))
        //     });
    } catch (error) {
        dispatch(errorPatients(error.message))
    }
}

export const deletePatientsdata = (id) => (dispatch) => {
    console.log(id);
    try {
        deletePatientsData(id)
            .then(dispatch({ type: ActionTypes.DELETE_PATIENTSDATA, payload: id }))
            .catch((error) => {
                dispatch(errorPatients(error.message))
            });
        // fetch(baseUrl + 'patients/' + id ,{
        //     method: 'DELETE'
        // })
        // .then(response => {
        //     if (response.ok) {
        //         return response;
        //     } else {
        //         var error = new Error(' Error ' + response.status + ': ' + response.statusText);
        //         error.response = response;
        //         throw error;
        //     }
        // },
        //     error => {
        //         var errmess = new Error(error.message);
        //         throw errmess;
        //     })
        // .then((response) => response.json())
        // .then(dispatch({ type: ActionTypes.DELETE_PATIENTSDATA, payload: id}))
        // .catch((error) => {
        //     dispatch(errorPatients(error.message))
        // });
    } catch (error) {
        dispatch(errorPatients(error.message))
    }
}

export const updatePatientsData = (data) => (dispatch) => {
    console.log(data);
    try {
        putPatientsData(data)
            .then((data) => {
                dispatch({ type: ActionTypes.UPDATE_PATIENTSDATA, payload: data.data })
            })
            .catch((error) => {
                dispatch(errorPatients(error.message))
            });
        // fetch(baseUrl + 'patients/' + data.id , {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data), 
        // })
        // .then(response => {
        //     if (response.ok) {
        //         return response;
        //     } else {
        //         var error = new Error(' Error ' + response.status + ': ' + response.statusText);
        //         error.response = response;
        //         throw error;
        //     }
        // },
        //     error => {
        //         var errmess = new Error(error.message);
        //         throw errmess;
        //     })
        // .then((response) => response.json())
        // .then((data) => {
        //     dispatch({ type: ActionTypes.UPDATE_PATIENTSDATA, payload: data})
        // })
        // .catch((error) => {
        //     dispatch(errorPatients(error.message))
        // });
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