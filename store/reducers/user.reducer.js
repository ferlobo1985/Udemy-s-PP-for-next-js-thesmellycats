import * as type from '../types';

let DEFAULT_USER_STATE = {
    data:{
        _id:'',
        email:'',
        firstname:'',
        lastname:'',
        role:'user'
    },
    auth:false
}

export default function usersReducer(state=DEFAULT_USER_STATE,action){
    switch(action.type){
        case type.SIGN_IN:
            return { ...state, data: action.payload.data,auth:action.payload.auth}
        case type.SIGN_OUT:
            return { ...state, ...DEFAULT_USER_STATE}
        case type.UPD_USER:
            return {...state,data:{ ...state.data, ...action.payload}}
        default:
            return state;
    }
}