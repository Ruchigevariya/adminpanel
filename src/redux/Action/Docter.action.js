import { deleteDoctersData, getDoctersData, postDoctersData, putDoctersData } from '../../Common/Apis/Docter.api';
import { db, storage } from '../../firebase';
import { baseUrl } from '../../Shares/BaseUrl';
import * as ActionTypes from '../ActionTypes'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const getDocterdata = () => async (dispatch) => {
  try {

    const querySnapshot = await getDocs(collection(db, "docter"));
    let data = []
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() })
      console.log(data);
      dispatch({ type: ActionTypes.GET_DOCTERDATA, payload: data })
    });
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

export const addDocterData = (data) => async (dispatch) => {
  try {
    let randomNum = Math.floor(Math.random() * 1000000).toString()
    console.log(randomNum);

    const docterRef = ref(storage, 'docter/' + randomNum);
    // console.log(docterRef);
    uploadBytes(docterRef, data.profile_img)

      .then((snapshot) => {
        console.log('Uploaded a blob or file!');

        getDownloadURL(ref(storage, snapshot.ref))
          .then(async (url) => {
            const docRef = await addDoc(collection(db, "docter"), {
              ...data,
              profile_img: url,
              fileName: randomNum
            });
            dispatch({
              type: ActionTypes.ADD_DOCTERDATA, payload: {
                id: docRef.id,
                ...data,
                profile_img: url,
                fileName: randomNum
              }
            })
            console.log(url);
          })
      });
    // console.log("Document written with ID: ", docRef.id);

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
  } catch (error) {
    dispatch(errorDocter(error.message))
  }

}

export const deleteDocterData = (data) => async (dispatch) => {
  console.log(data);

  try {
    const docterRef = ref(storage, 'docter/' + data.fileName);

    deleteObject(docterRef)
      .then(async () => {
        await deleteDoc(doc(db, "docter", data.id));
        dispatch({ type: ActionTypes.DELETE_DOCTERDATA, payload: data.id })
      })
      .catch((error) => {
        dispatch(errorDocter(error.message))
      });


    // deleteDoctersData(id)
    //   .then(dispatch({ type: ActionTypes.DELETE_DOCTERDATA, payload: id }))
    //   .catch((error) => {
    //     dispatch(errorDocter(error.message))
    //   });
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

export const updateDocterData = (data) => async (dispatch) => {
  console.log(data);

  try {

    const docterRef = doc(db, "docter", data.id);

    if (typeof data.profile_img === 'string') {
      console.log("No change image");
    } else {
      const deldocterRef = ref(storage, 'docter/' + data.fileName);
      let randomNum = Math.floor(Math.random() * 1000000).toString()
      const instdocterRef = ref(storage, 'docter/' + randomNum);
      
      deleteObject(deldocterRef)  //1
        .then(async () => {
          uploadBytes(instdocterRef, data.profile_img) //2

            .then((snapshot) => {
              // console.log('Uploaded a blob or file!');
              getDownloadURL(ref(storage, snapshot.ref)) //3
                .then(async (url) => {
                  console.log(url);

                  await updateDoc(docterRef, {  //4
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    contact: data.contact,
                    fileName: randomNum,
                    profile_img: url
                  });
                  dispatch({ type: ActionTypes.UPDATE_DOCTERDATA, payload: { ...data, fileName: randomNum, profile_img: url } }) //5

                })
            })
          console.log("change image");
        })
    }

    // const docterRef = doc(db, "docter", data.id);

    // await updateDoc(docterRef, {
    //   firstname: data.firstname,
    //   lastname: data.lastname,
    //   email: data.email,
    //   contact: data.contact
    // });

    // dispatch({ type: ActionTypes.UPDATE_DOCTERDATA, payload: data })
    // putDoctersData(data)
    //   .then((data) => {
    //     dispatch({ type: ActionTypes.UPDATE_DOCTERDATA, payload: data.data })
    //   })
    //   .catch((error) => {
    //     dispatch(errorDocter(error.message))
    //   });
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
  } catch (error) {
    dispatch(errorDocter(error.message))
  }
}

export const loadingDocter = () => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_DOCTER })
}

export const errorDocter = (error) => (dispatch) => {
  dispatch({ type: ActionTypes.ERROR_DOCTER, payload: error })
}