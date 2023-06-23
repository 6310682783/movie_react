import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as movieActions from "../../redux/actions/movie.action";
import AddIcon from "@mui/icons-material/Add";
import { Navigate, useNavigate } from "react-router-dom";

export default function Movie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isFetching, result } = useSelector((state) => state.movieReducer);
  React.useEffect(() => {
    dispatch(movieActions.loadMovieAll());
  }, [dispatch]);
  console.log(result);
  console.log(isFetching);
  return (
    <Box sx={{ pt: 0.5 }}>
      {!isFetching && result ? (
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Box sx={{ textAlign: "right" }}>
              <Button
                onClick={() => {
                  navigate("/Movie/AddMovie");
                }}
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Box>
          </Grid>
          {result?.data?.map((item, index) => (
            <Grid key={index} item xs={12} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={item?.url}
                  title={item?.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <Typography>{item?.title}</Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item?.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button
                    onClick={() => {
                      navigate(`/Movie/EditMovie/${item?.id}`);
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      navigate(`/Movie/Detail/${item?.id}`);
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Detail
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {/* <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid> */}
        </Grid>
      ) : (
        ""
      )}
    </Box>
  );
}
