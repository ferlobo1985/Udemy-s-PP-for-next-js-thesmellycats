import dynamic from "next/dynamic";
import LayoutAdmin from "components/ui/layout.admin";
import axios from "axios";

import { useFormik } from "formik";
import * as Yup from "yup";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { errorHelper } from "helpers/functions";

import { useDispatch, useSelector } from "react-redux";
import  {errorDispatcher} from 'store/actions/notifications.action'

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user.data.firstname,
      lastname: user.data.lastname,
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(2, "2 char min")
        .max(50, "50 char min")
        .required("Sorry the firstname is required"),
      lastname: Yup.string()
        .min(2, "2 char min")
        .max(50, "50 char min")
        .required("Sorry the lastname is required"),
    }),
    onSubmit: (values) => {
      
      axios.patch('/api/users',values)
      .then( response => {
        console.log(response.data)
      }).catch(error=>{
          console.log(error)
        dispatch(errorDispatcher('Sorry try again'))
      })

    },
  });

  return (
    <LayoutAdmin title="Account">
      <form
        className="mt-3 article_form"
        onSubmit={formik.handleSubmit}
        style={{ maxWidth: "250px" }}
      >
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="firstname"
            label="Enter your firstname"
            variant="outlined"
            {...formik.getFieldProps("firstname")}
            {...errorHelper(formik, "firstname")}
          />
        </div>

        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="lastname"
            label="Enter your lastname"
            variant="outlined"
            {...formik.getFieldProps("lastname")}
            {...errorHelper(formik, "lastname")}
          />
        </div>

        <Button
          className="mb-3"
          variant="contained"
          color="primary"
          type="submit"
        >
          Edit profile
        </Button>
      </form>
    </LayoutAdmin>
  );
};

export default UserProfile;
