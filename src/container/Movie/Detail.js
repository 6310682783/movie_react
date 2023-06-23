import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AppBar, Box, Grid, Paper, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as movieActions from "../../redux/actions/movie.action";
import AddIcon from "@mui/icons-material/Add";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  //getReducer
  const { data, isFetching } = useSelector((state) => state.movieReducer);
  React.useEffect(() => {
    //ดึงข้อมูล
    dispatch(movieActions.loadMovieById(id));
  }, [dispatch, id]);
  console.log(data);
  return (
    <Box sx={{ pt: 0.5 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div">
              {data?.data?.title}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button
              onClick={() => {
                navigate("/Movie");
              }}
              startIcon={<ArrowBackIcon />}
              color="inherit"
            >
              Back
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Paper sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <Box
              component={"img"}
              src={data?.data?.url}
              sx={{ width: "100%", height: "100%", paddingLeft: "16px" }}
            ></Box>
          </Grid>
          <Grid item md={9}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Nu4xTr5J5tE"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </Grid>
          <Grid item md={12}>
            <Typography>{data?.data?.description}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
