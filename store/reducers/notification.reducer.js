import * as type from '../types';

export default function notificationsReducer(state={},action){
    switch(action.type){
        case type.ERROR_GLOBAL:
            return { ...state,error:true, msg: action.payload }
        case type.SUCCESS_GLOBAL:
            return { ...state,success:true, msg: action.payload }
        case type.CLEAR_NOTIFICATION:
            return {}
        default:
            return state;
    }
}