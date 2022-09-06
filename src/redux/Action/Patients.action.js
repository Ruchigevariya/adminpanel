import { deletePatientsData, getPatientsData, postPatientsData, putPatientsData } from '../../Common/Apis/Patients.api'
import { db, storage } from '../../firebase'
import { baseUrl } from '../../Shares/BaseUrl'
import * as ActionTypes from '../ActionTypes'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const getPatients = () => async (dispatch) => {
    try {

        const querySnapshot = await getDocs(collection(db, "patients"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            console.log(data);
            dispatch({ type: ActionTypes.GET_PATIENTSDATA, payload: data })
        });

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

export const addpatients = (data) => async (dispatch) => {
    try {
        const patientsRef = ref(storage, 'patients/' + data.patients_img.name);
        // console.log(patientsRef);
        uploadBytes(patientsRef, data.patients_img)
            .then((snapshot) => {
                console.log('Uploaded a blob or file!');

                getDownloadURL(ref(storage, snapshot.ref))
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "patients"),{
                            ...data,
                            patients_img:url
                        });
                        dispatch({ type: ActionTypes.ADD_PATIENTSDATA, payload: { 
                            id: docRef.id,
                             ...data,
                            patients_img:url

                        } })

                        console.log(url);

                    });
            });
        // console.log("Document written with ID: ", docRef.id);

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

export const deletePatientsdata = (id) => async (dispatch) => {
    console.log(id);
    try {
        await deleteDoc(doc(db, "patients", id));
        dispatch({ type: ActionTypes.DELETE_PATIENTSDATA, payload: id })
        // deletePatientsData(id)
        //     .then(dispatch({ type: ActionTypes.DELETE_PATIENTSDATA, payload: id }))
        //     .catch((error) => {
        //         dispatch(errorPatients(error.message))
        //     });
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

export const updatePatientsData = (data) => async (dispatch) => {
    console.log(data);
    try {
        const patientsRef = doc(db, "patients", data.id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(patientsRef, {
            name: data.name,
            age: data.age,
            birthDate: data.birthDate,
            contact: data.contact,
            city: data.city
        });
        dispatch({ type: ActionTypes.UPDATE_PATIENTSDATA, payload: data })
        // putPatientsData(data)
        //     .then((data) => {
        //         dispatch({ type: ActionTypes.UPDATE_PATIENTSDATA, payload: data.data })
        //     })
        //     .catch((error) => {
        //         dispatch(errorPatients(error.message))
        //     });
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