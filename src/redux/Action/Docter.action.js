import { deleteDoctersData, getDoctersData, postDoctersData, putDoctersData } from '../../Common/Apis/Docter.api';
import { db } from '../../firebase';
import { baseUrl } from '../../Shares/BaseUrl';
import * as ActionTypes from '../ActionTypes'
import { collection, addDoc } from "firebase/firestore"; 

export const getDocterdata = () => (dispatch) => {
  try {
    // dispatch(loadingDocter())

    // setTimeout(function () {
    //   getDoctersData()

      // .then((data) => dispatch({ type: ActionTypes.GET_DOCTERDATA, payload: data.data }))
      // .catch((error) => dispatch(errorDocter(error.message)));

      // fetch(baseUrl + 'docter')
      //   .then(response => {
      //     if (response.ok) {
      //       return response;
      //     } else {
      //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
      //       error.response = response;
      //       throw error;
      //     }
      //   },
      //     error => {
      //       var errmess = new Error(error.message);
      //       throw errmess;
      //     })
      //   .then(response => response.json())
      //   .then((data) => dispatch({ type: ActionTypes.GET_DOCTERDATA, payload: data }))
      //   .catch((error) => dispatch(errorDocter(error.message)));
    // }, 2000)

  } catch (error) {
    dispatch(errorDocter(error.message))
  }
}

export const addDocterData = (data) => async(dispatch) => {
  try{
    const docRef = await addDoc(collection(db, "docter"), data);
    console.log("Document written with ID: ", docRef.id);
    dispatch({ type: ActionTypes.ADD_DOCTERDATA, payload: {id:docRef.id, ...data} })
    
    // postDoctersData(data)
    // .then((data) => {
    //       dispatch({ type: ActionTypes.ADD_DOCTERDATA, payload: data.data })
    //     })
    //     .catch((error) => {
    //       dispatch(errorDocter(error.message))
    //     });
    // fetch(baseUrl + 'docter', {
    //   method: 'POST', 
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(response => {
    //     if (response.ok) {
    //       return response;
    //     } else {
    //       var error = new Error(' Error ' + response.status + ': ' + response.statusText);
    //       error.response = response;
    //       throw error;
    //     }
    //   },
    //     error => {
    //       var errmess = new Error(error.message);
    //       throw errmess;
    //     })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     dispatch({ type: ActionTypes.ADD_DOCTERDATA, payload: data })
    //   })
    //   .catch((error) => {
    //     dispatch(errorDocter(error.message))
    //   });
  } catch ( error) {
      dispatch(errorDocter(error.message))
  }
 
}

export const deleteDocterData = (id) => (dispatch) => {
  console.log(id);
  try{
    deleteDoctersData(id)
    .then(dispatch({ type: ActionTypes.DELETE_DOCTERDATA, payload: id }))
    .catch((error) => {
      dispatch(errorDocter(error.message))
    });
    // fetch(baseUrl + 'docter' + id , {
    //   method: 'DELETE'
    // })
    // .then(response => {
    //   if (response.ok) {
    //     return response;
    //   } else {
    //     var error = new Error(' Error ' + response.status + ': ' + response.statusText);
    //     error.response = response;
    //     throw error;
    //   }
    // },
    //   error => {
    //     var errmess = new Error(error.message);
    //     throw errmess;
    //   })
    // .then((response) => response.json())
    // .then(dispatch({ type: ActionTypes.DELETE_DOCTERDATA, payload: id }))
    // .catch((error) => {
    //   dispatch(errorDocter(error.message))
    // });
  } catch (error) {
    dispatch(errorDocter(error.message))
  }
}

export const updateDocterData = (data) => (dispatch) => {
  console.log(data);
  try{
  putDoctersData(data)
  .then((data) => {
      dispatch({ type: ActionTypes.UPDATE_DOCTERDATA, payload: data.data })
    })
    .catch((error) => {
      dispatch(errorDocter(error.message))
    });
    // fetch(baseUrl + 'docter/' + data.id , {
    //   method: 'PuT', 
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    // .then(response => {
    //   if (response.ok) {
    //     return response;
    //   } else {
    //     var error = new Error(' Error ' + response.status + ': ' + response.statusText);
    //     error.response = response;
    //     throw error;
    //   }
    // },
    //   error => {
    //     var errmess = new Error(error.message);
    //     throw errmess;
    //   })
    // .then((response) => response.json())
    // .then((data) => {
    //   dispatch({ type: ActionTypes.UPDATE_DOCTERDATA, payload: data })
    // })
    // .catch((error) => {
    //   dispatch(errorDocter(error.message))
    // });
  } catch(error) {
    dispatch(errorDocter(error.message))
  }
}

export const loadingDocter = () => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_DOCTER })
}

export const errorDocter = (error) => (dispatch) => {
  dispatch({ type: ActionTypes.ERROR_DOCTER, payload: error })
}