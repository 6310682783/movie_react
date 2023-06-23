import { useState, forwardRef, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as movieActions from "../../redux/actions/movie.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Swal from "sweetalert2";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function EditMovie() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [severity, setSeverity] = useState("");
  const { data, isFetching } = useSelector((state) => state.movieReducer);

  useEffect(() => {
    dispatch(movieActions.loadMovieById(id));
  }, [dispatch, id]);
  const handleClickAlert = () => {
    setOpenAlert(true);
  };
  const handleDelete = () => {
    Swal.fire({
      //title: "Are you sure?",
      text: "Do you want to Delete ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(movieActions.deleteMovieById(id)).then((res) => {
          console.log(res);
          if (res && res.isSuccess) {
            setMessageAlert("Delete Successfull");
            setSeverity("success");
            handleClickAlert();
            setTimeout(function () {
              handleCloseAlert();
              navigate("/Movie");
            }, 2000);
          } else {
            setMessageAlert("Something wrong");
            setSeverity("error");
            handleClickAlert();
          }
        });
      }
    });
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please type a title").nullable(),
    url: Yup.string().required("Please type a url").nullable(),
    description: Yup.string().required("Please type a description").nullable(),
    video: Yup.string().required("Please type a videolink").nullable(),
    //description: Yup.string().required("Please type a description").nullable(),
  });
  return (
    <Box
      display="flex"
      component="form"
      justifyContent="center"
      alignItems="center"
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlert}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {messageAlert}
        </Alert>
      </Snackbar>
      <Formik
        enableReinitialize
        initialValues={data?.data ? data?.data : {}}
        onSubmit={(values) => {
          console.log(values);
          let formData = new FormData();
          formData.append("id", values?.id);
          formData.append("title", values?.title);
          formData.append("url", values?.url);
          formData.append("description", values?.description);
          formData.append("video", values?.video);
          dispatch(movieActions.editMovie(formData)).then((res) => {
            console.log(res);
            if (res && res.isSuccess) {
              setMessageAlert("Update Successfull");
              setSeverity("success");
              handleClickAlert();
              setTimeout(function () {
                handleCloseAlert();
                navigate("/Movie");
              }, 2000);
            } else {
              setMessageAlert("Something wrong");
              setSeverity("error");
              handleClickAlert();
            }
          });
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleSubmit } = props;
          return (
            <Form>
              <Card sx={{ maxWidth: 300, justifyContent: "center" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="title"
                        name="title"
                        label="title *"
                        value={values?.title || ""}
                        onChange={handleChange}
                        helperText={touched.title ? errors.title : ""}
                        error={touched.title && Boolean(errors.title)}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="url"
                        label="url *"
                        value={values?.url || ""}
                        onChange={handleChange}
                        helperText={touched.url ? errors.url : ""}
                        error={touched.url && Boolean(errors.url)}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="description"
                        label="description"
                        value={values?.description || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="video"
                        label="video"
                        value={values?.video || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <LoadingButton onClick={handleSubmit} variant="outlined">
                    <span>Submit</span>
                  </LoadingButton>
                  <Button onClick={handleDelete} variant="outlined">
                    <span>Delete</span>
                  </Button>
                </CardActions>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
