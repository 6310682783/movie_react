import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid, Card, CardContent, CardActions } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as movieActions from "../../redux/actions/movie.action";
import { useDispatch } from "react-redux";

export default function AddMovie() {
  const dispatch = useDispatch();
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
      <Formik
        enableReinitialize
        initialValues={{
          title: "",
          url: "",
          description: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          let formData = new FormData();
          formData.append("title", values?.title);
          formData.append("url", values?.url);
          formData.append("description", values?.description);
          dispatch(movieActions.addMovie(formData));
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
