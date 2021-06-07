import { useRef, useState } from "react";
import LayoutAdmin from "components/ui/layout.admin";
import { useFormik } from "formik";
import { errorHelper } from "helpers/functions";
import { showValidation } from "helpers/validations";
import UploadHandler from 'components/ui/image.upload';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useDispatch } from "react-redux";
import {
  successDispatcher,
  errorDispatcher,
} from "store/actions/notifications.action";
import axios from "axios";

////////// EDIT ///////
import connectToDb from 'database/db';
import { getBySlug } from 'database/services/show.service';
import { toJson } from 'helpers/functions'
////////// END EDIT ///////


const CreatShowPage = ({show}) => {
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const clearRef = useRef();
    
  const formik = useFormik({
      ////////// EDIT ///////
      enableReinitialize:true,
    initialValues: {
      slug: show.slug,
      title:show.title,
      venue: show.venue,
      excerpt: show.excerpt,
      content:show.content,
      yt:show.yt,
      image: show.image,
      date: show.date,
      time: show.time,
    },
    ////////// END EDIT ///////
   validationSchema: showValidation,
    onSubmit: (values, { resetForm }) => {
        setLoading(true)
       
        axios
        .post("/api/shows/add_show",values)
        .then(response =>{
            dispatch(successDispatcher('Done congrats !!'));
            clearRef.current.clearPic();
            resetForm();
        }).catch(error=>{
            dispatch(errorDispatcher(error.response.data.message));
        }).finally(()=>{
            setLoading(false)
        });
    },
  });

  const handlePicValue = (src) => {
    formik.setFieldValue("image",src);
  }

  return (
    <LayoutAdmin title="Edit Show">
      <form className="mt-3 event_form" onSubmit={formik.handleSubmit} >
        
        {/* ////////// EDIT /////// */}
        <UploadHandler 
            picValue={(url)=> handlePicValue(url)}
            ref={clearRef}
            prevImage={show.image}
        />
         {/* ////////// END EDIT /////// */}
        <Divider className="mt-3 mb-3" />

        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="title"
            label="Enter a title"
            variant="outlined"
            {...formik.getFieldProps("title")}
            {...errorHelper(formik, "title")}
          />
        </div>

        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="venue"
            label="Enter the venue name"
            variant="outlined"
            {...formik.getFieldProps("venue")}
            {...errorHelper(formik, "venue")}
          />
        </div>

        <div className="form-group">
          <TextField
            name="excerpt"
            label="Enter a brief description"
            variant="outlined"
            multiline
            rows={4}
            {...formik.getFieldProps("excerpt")}
            {...errorHelper(formik, "excerpt")}
          />
        </div>

        <div className="form-group">
          <TextField
            name="content"
            label="Enter a content"
            variant="outlined"
            multiline
            rows={4}
            {...formik.getFieldProps("content")}
            {...errorHelper(formik, "content")}
          />
        </div>

        <Divider className="mt-3 mb-3" />

        <div className="form-group">
          <TextField
            className="date-time-field mr-3"
            name="excerpt"
            label="Date of the event"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            {...formik.getFieldProps("date")}
            {...errorHelper(formik, "date")}
          />

          <TextField
            className="date-time-field"
            name="time"
            label="Start time"
            type="time"
            InputLabelProps={{ shrink: true }}
            InputProps={{ steps: 300 }}
            {...formik.getFieldProps("time")}
            {...errorHelper(formik, "time")}
          />
        </div>

        <Divider className="mt-3 mb-3" />

        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="yt"
            label="Enter the yt link "
            variant="outlined"
            {...formik.getFieldProps("yt")}
            {...errorHelper(formik, "yt")}
          />
        </div>

        <Divider className="mt-3 mb-3" />

        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="slug"
            label="Enter the slug "
            variant="outlined"
            {...formik.getFieldProps("slug")}
            {...errorHelper(formik, "slug")}
          />
        </div>

        {loading ?
        <CircularProgress color="secondary" className="mt-3"/>
            :
        <Button variant="contained" color="primary" type="submit">
            Edit Show
        </Button>
        }

            
      </form>
    </LayoutAdmin>
  );
};


export const getServerSideProps = async(context) => {
    await connectToDb();
    const show = await getBySlug(context.params)

    if(!show){
        return{
            notFound:true
        }
    }

    return{
        props:{
            show:toJson(show[0])
        }
    }


} 


export default CreatShowPage;
