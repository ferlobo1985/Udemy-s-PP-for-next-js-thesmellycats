import * as type from '../types';

export const successDispatcher = (msg) => {
    return (dispatch) => {
        dispatch({
            type: type.SUCCESS_GLOBAL,
            payload: msg
        })
    }
}

export const errorDispatcher = (msg) => {
    return (dispatch) => {
        dispatch({
            type: type.ERROR_GLOBAL,
            payload: msg
        })
    }
}

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type: type.CLEAR_NOTIFICATION,
        })
    }
}



