import * as type from '../types';
import { successDispatcher  } from './notifications.action';

export const signInUser = (session,router) => {
    return async(dispatch)=>{

        dispatch(successDispatcher('Welcome back'));
        dispatch({
            type:type.SIGN_IN,
            payload:{
                data:{
                    _id: session.user._id,
                    email:session.user.email,
                    role:session.user.role
                },
                auth:true
            }
        })
        router.push('/users/dashboard');
    }
}