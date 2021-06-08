import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { errorHelper } from 'helpers/functions'

import Loader from 'helpers/loader';
import axios from 'axios';

import { useDispatch } from 'react-redux'
import { errorDispatcher, successDispatcher } from 'store/actions/notifications.action'


const Contact = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues:{name:'',email:'',message:''},
        validationSchema: Yup.object({
            name:Yup.string()
            .required('Sorry the name is required'),
            email:Yup.string()
            .required('Sorry the email is required')
            .email('This is an invalid email'),
            message:Yup.string()
            .required('Sorry the message is required'),
        }),
        onSubmit:(values,{resetForm})=>{
            setLoading(true);

            axios.post('/api/email/contact',values)
            .then(response => {
                resetForm();
                dispatch(successDispatcher('Thank you !!'))
            }).catch(error=>{
                dispatch(errorDispatcher('Oops try again later'))
            }).finally(()=>{
                setLoading(false);
            })

        }
    });


    return(
        <div className="container page_container">
            <div className="contact_wrapper">

                <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
                <h1>Contact us</h1>

                    <div className="form-group">
                        <TextField
                            name="name"
                            label="Enter your name"
                            variant="outlined"
                            {...formik.getFieldProps('name')}
                            {...errorHelper(formik,'name')}
                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            name="email"
                            label="Enter your email"
                            variant="outlined"
                            {...formik.getFieldProps('email')}
                            {...errorHelper(formik,'email')}
                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            name="email"
                            label="Enter your message"
                            multiline
                            rows={4}
                            variant="outlined"
                            {...formik.getFieldProps('message')}
                            {...errorHelper(formik,'message')}
                        />
                    </div>


                    { loading ?
                        <Loader/>
                    :
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Send message
                        </Button>
                    }

                </form>

            </div>
        </div>
    )
}

export default Contact;