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

    const [activeStep,setActiveStep] = useState(0);
    const steps = ['Enter old email','Enter new email','Are you sure ?'];
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
            setLoading(true);


          axios.patch('/api/users',{
              email:values.newemail
          })
          .then( response => {
            dispatch(userSignOut('Done !! Log it again with your new email'));
            router.push('/');
          }).catch(error=>{
            dispatch(errorDispatcher(error.response.data.message));
            setActiveStep(1);
            setLoading(false);
          })
        },
      });

      const openModal = () => setEmailModal(true);
      const closeModal = () => setEmailModal(false);

      const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }

      const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1)
        }

    const nextBtn = () => (
        <Button className="mt-3" variant="contained" color="primary" onClick={handleNext} >
            Next
        </Button>
    )

    const backsBtn = () => (
        <Button className="mt-3 ml-2" variant="contained" onClick={handleBack} >
            Back
        </Button>
    )



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

            <Modal size="lg" centered show={emailModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update your email</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Stepper activeStep={activeStep}>
                        { steps.map( (label,index) =>{
                            return(
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>

                    <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>

                        { activeStep === 0 ?
                             <div className="form-group">
                                <TextField
                                    style={{ width: "100%" }}
                                    name="email"
                                    label="Enter your current email"
                                    variant="outlined"
                                    {...formik.getFieldProps("email")}
                                    {...errorHelper(formik, "email")}
                                />
                                { formik.values.email && !formik.errors.email ?
                                    nextBtn()
                                   :null
                                }
                            </div>
                        :null}

                        { activeStep === 1 ?
                            <div className="form-group">
                                <TextField
                                    style={{ width: "100%" }}
                                    name="newemail"
                                    label="Enter your new email"
                                    variant="outlined"
                                    {...formik.getFieldProps("newemail")}
                                    {...errorHelper(formik, "newemail")}
                                />
                                { formik.values.newemail && !formik.errors.newemail ?
                                    nextBtn()
                                   :null
                                }
                                { backsBtn()}
                            </div>
                        :null}


                        { activeStep === 2 ?
                            <div className="form-group">
                                { loading ?
                                    <Loader/>
                                :
                                    <>
                                    <Alert variant="warning">
                                    Remember, you will be signed out and you need to sign in with your new email.
                                    </Alert>
                                    <Button 
                                        className="mt-3"
                                        variant="contained"
                                        color="primary"
                                        onClick={formik.submitForm}
                                    >   
                                        Edit email
                                    </Button>
                                    {backsBtn()}
                                    </>
                                }
                            </div>
                        :null}
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EmailStepper;