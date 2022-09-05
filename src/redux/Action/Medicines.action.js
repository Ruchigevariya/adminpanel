import { deleteMedicinesData, getMedicinesData, postMedicinesData, putMedicinesData } from '../../Common/Apis/Medicines.api'
import { db } from '../../firebase'
import { baseUrl } from '../../Shares/BaseUrl'
import * as ActionTypes from '../ActionTypes'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

export const getMedicines = () => async (dispatch) => {
    try {

        const querySnapshot = await getDocs(collection(db, "medicines"));

        let data = []

        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            console.log(data);
            dispatch({ type: ActionTypes.GET_MEDICINESDATA, payload: data })
        });

        // dispatch(loadingMedicines())

        // setTimeout(function () {
        //     getMedicinesData()
        //     .then((data) => dispatch({ type: ActionTypes.GET_MEDICINESDATA, payload: data.data }))
        //         .catch((error) => dispatch(errorMedicines(error.message)))

        // fetch(baseUrl + 'medicines')
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error(' Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionTypes.GET_MEDICINESDATA, payload: data }))
        //     .catch((error) => dispatch(errorMedicines(error.message)))
        // }, 2000)

    } catch (error) {
        dispatch(errorMedicines(error.message))
    }

}

export const addMedicines = (data) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "medicines"), data);
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: ActionTypes.ADD_MEDICINESDATA, payload: { id: docRef.id, ...data } })

        // postMedicinesData(data)
        // .then((data) => {
        //             dispatch({ type: ActionTypes.ADD_MEDICINESDATA, payload: data.data })
        //         })
        //         .catch((error) => {
        //             dispatch(errorMedicines(error.message))
        //         });
        // fetch(baseUrl + 'medicines', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error(' Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         dispatch({ type: ActionTypes.ADD_MEDICINESDATA, payload: data })
        //     })
        //     .catch((error) => {
        //         dispatch(errorMedicines(error.message))
        //     });
    } catch (error) {
        dispatch(errorMedicines(error.message))
    }
}

export const deleteMedicines = (id) => async(dispatch) => {
    console.log(id);
    try {
        await deleteDoc(doc(db, "medicines", id));
        dispatch({type: ActionTypes.DELETE_MEDICINESDATA, payload: id})

        // deleteMedicinesData(id)
        //     .then(dispatch({ type: ActionTypes.DELETE_MEDICINESDATA, payload: id }))
        //     .catch((error) => {
        //         dispatch(errorMedicines(error.message))
        //     });
        // fetch(baseUrl + 'medicines/'+ id, {
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
        // .then(dispatch({ type: ActionTypes.DELETE_MEDICINESDATA, payload: id }))
        // .catch((error) => {
        //     dispatch(errorMedicines(error.message))
        // });
    } catch (error) {
        dispatch(errorMedicines(error.message))
    }
}

export const updateMedicines = (data) => async(dispatch) => {
    console.log(data);
    try {
        const medicinesRef = doc(db, "medicines", data.id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(medicinesRef, {
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            expiry: data.expiry
        });
        dispatch({type: ActionTypes.UPDATE_MEDICINESDATA, payload: data})
        // putMedicinesData(data)
        //     .then((data) => { dispatch({ type: ActionTypes.UPDATE_MEDICINESDATA, payload: data.data }) })
        //     .catch((error) => {
        //         dispatch(errorMedicines(error.message))
        //     });
        // fetch(baseUrl + 'medicines/' + data.id ,{
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
        // .then((data) => {dispatch({ type: ActionTypes.UPDATE_MEDICINESDATA, payload: data })})
        // .catch((error) => {
        //     dispatch(errorMedicines(error.message))
        // });
    } catch (error) {
        dispatch(errorMedicines(error.message))
    }

}

export const loadingMedicines = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_MEDICINES })
}

export const errorMedicines = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_MEDICINES, payload: error })
}