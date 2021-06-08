import { useState }  from 'react'
import axios from "axios";

import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from 'helpers/loader';
import { useRouter } from 'next/router';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { errorHelper } from "helpers/functions";

import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import { useDispatch, useSelector } from "react-redux";
import { errorDispatcher } from 'store/actions/notifications.action';
import { userSignOut } from 'store/actions/user.action'

const EmailStepper = () => {
    const [ loading,setLoading] = useState(false);
    const [emailModal,setEmailModal] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter();

    const [active,setActiveStep] = useState(0);
    const step = ['Enter old email','Enter new email','Are you sure ?'];
    const user = useSelector(state=>state.user)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { email:'',newemail:''},
        validationSchema: Yup.object({
            email: Yup.string()
            .required("Sorry the email is required")
            .email('This is not a valid email')
            .test('match','Please check your email',(email)=>{
                return email === user.data.email
            }),
            newemail: Yup.string()
            .required("Sorry the new email is required")
            .email('This is not a valid email')
            .test('match','Please check your email',(newemail)=>{
                return newemail !== user.data.email
            })
        }),
        onSubmit: (values) => {
          
            console.log(values)

        //   axios.patch('/api/users',values)
        //   .then( response => {
        //     dispatch(updateUserprofile(response.data))
        //   }).catch(error=>{
        //       console.log(error)
        //     dispatch(errorDispatcher('Sorry try again'))
        //   })
    
        },
      });

      const openModal = () => setEmailModal(true);
      const closeModal = () => setEmailModal(false);


    return(
        <>
            <form className="mt-3 article_form" style={{ maxWidth: "250px" }}>
                <div className="form-group">
                    <TextField
                        style={{ width: "100%" }}
                        name="emailstatic"
                        label={user.data.email}
                        variant="outlined"
                        disabled
                    />
                </div>


                <Button
                    className="mb-3"
                    variant="contained"
                    color="primary"
                    onClick={openModal}
                >
                 Edit edit mail
                </Button>


            </form>


        </>
    )
}

export default EmailStepper;