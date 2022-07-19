import * as ActionTypes from '../ActionTypes';

export const increament = () => (dispatch) => {
    dispatch({type: ActionTypes.INCREAMENT_COUNTER})
}

export const decreament = () => (dispatch) => {
    dispatch({type: ActionTypes.DECREAMENT_COUNTER})
}