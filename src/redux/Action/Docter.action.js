import { baseUrl } from '../../Shares/BaseUrl';
import * as ActionTypes from '../ActionTypes'

export const getDocterdata = () => (dispatch) => {
    try {
        dispatch(loadingDocters())

        setTimeout(function(){
            fetch(baseUrl + 'docter')
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
              .then((data) => dispatch(({ type: ActionTypes.GET_DOCTERDATA, payload: data })))
              .catch(error => dispatch(errorDocter(error.message)));
        }, 2000)
        
    } catch (error) {
        console.log(error);
    }
}

export const loadingDocters = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_DOCTER })
}

export const errorDocter = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_DOCTER, payload: error })
}