import dynamic from 'next/dynamic';
import { signIn, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { errorHelper } from 'helpers/functions';
const Loader = dynamic(()=> import('helpers/loader'));

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { errorDispatcher } from 'store/actions/notifications.action';
import { signInUser, registerUser } from 'store/actions/user.action';

const SignIn = () => {
    const [formType,setFormType] = useState(false);
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues:{email:'francis@gmail.com',password:'testing123'},
        validationSchema:Yup.object({
            // email:Yup.string()
            // .required('Sorry the email is required')
            // .email('This is no a valid email'),
            password:Yup.string()
            .required('Sorry, the password is required')
        }),
        onSubmit:(values)=>{
           submitForm(values)
        }
    });

    const submitForm = async(values) => {
        setLoading(true)

        if(formType){
            /// register
            axios.post('/api/auth/register',values)
            .then(response => {
                dispatch(registerUser(values,response.data,router))
                console.log(response.data)
            }).catch(error=>{
                setLoading(false);
                dispatch(errorDispatcher(error.response.data.message))
            })
        } else {
            /// sing in
            const result = await signIn('credentials',{
                redirect:false,
                email: values.email,
                password: values.password
            });

            if(result.error){
                setLoading(false);
                dispatch(errorDispatcher(result.error))
            } else {
                const session = await getSession();
                dispatch(signInUser(session,router))
            }
        }

    }


    const handleFormType = () => {
        setFormType(!formType);
    }


    return(
        <div className="container full_vh small top-space">
            
            { loading ?
                <Loader/>
                :
            <>
                <h1>{ formType ? 'Register':'Sign in'}</h1>
                <form className="mt-3" onSubmit={formik.handleSubmit}>



                    <div className="form-group">

                        
                        <TextField
                            style={{width:'100%'}}
                            name="email"
                            label="Enter your email"
                            variant="outlined"
                            { ...formik.getFieldProps('email')}
                            { ...errorHelper(formik,'email')}
                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            style={{width:'100%'}}
                            name="password"
                            label="Enter your password"
                            variant="outlined"
                            type="password"
                            { ...formik.getFieldProps('password')}
                            { ...errorHelper(formik,'password')}
                        />
                    </div>

                    <div className="mb-3">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="small"
                            className="mr-2"
                        >
                            { formType ? 'Register':'Sign in'}
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            size="small"
                            onClick={handleFormType}
                        >
                            { formType ?
                             'Already registered, click here'
                             :
                             'Already signed in, click here'
                             }
                        </Button>
                    </div>
                </form>
            </>
            }           

        </div>
    )
}

export default SignIn