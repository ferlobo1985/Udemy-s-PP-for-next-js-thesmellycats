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

const Newsletter = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues:{email:''},
        validationSchema: Yup.object({
            email:Yup.string()
            .required('Sorry the email is required')
            .email('This is an invalid email')
        }),
        onSubmit:(values,{resetForm})=>{
            setLoading(true)
            
            axios.post(`/api/users/newsletter`,values)
            .then(response => {
                dispatch(successDispatcher('Thank you'))
            }).catch(error=>{
                dispatch(errorDispatcher(error.response.data.message))
            }).finally(()=>{
                resetForm();
                setLoading(false)
            });

        }
    })


    return(
        <section className="newsletter_section">
            <div className="container px-4 px-lg-5 text-center">
                <h2 className="mb-4">Join to our newsletter</h2>

                { !loading ?
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name="email"
                                label="Enter your email"
                                variant="outlined"
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik,'email')}
                            />
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="small"
                        >
                            Subscribe
                        </Button>
                    </form>
                :
                    <Loader/>
                }


            </div>
        </section>
    )
}

export default Newsletter;