import { useState, forwardRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid, Card, CardContent, CardActions, Snackbar } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as movieActions from "../../redux/actions/movie.action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [severity, setSeverity] = useState("");
  const handleClickAlert = () => {
    setOpenAlert(true);
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
        initialValues={{
          title: "",
          url: "",
          description: "",
          video: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          let formData = new FormData();
          formData.append("title", values?.title);
          formData.append("url", values?.url);
          formData.append("description", values?.description);
          formData.append("video", values?.video);
          dispatch(movieActions.addMovie(formData)).then((res) => {
            console.log(res);
            if (res && res.isSuccess) {
              setMessageAlert("Add Successfull");
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
                </CardActions>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
