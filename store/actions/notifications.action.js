import * as type from '../types';


export const successDispatcher = (msg) => {
    return (dispatch) => {
        dispatch({
            type: type.SUCCESS_GLOBAL,
            payload: msg
        })
    }
}