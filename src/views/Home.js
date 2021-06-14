import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  TablePagination,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TopBar from "../components/TopBar";
import { setImages, setImagesPerPage, setPageNumber } from "../redux/actions";

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.images.imagesArray);
  const showImagesState = useSelector((state) => state.images.showImages);
  const page = useSelector((state) => state.images.pageNumber);
  const imagesPerPage = useSelector((state) => state.images.imagesPerPage);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    fetch(
      `https://picsum.photos/v2/list?page=${page + 1}&limit=${imagesPerPage}`
    )
      .then((res) => res.json())
      .then((res) => {
        dispatch(setImages(res));
        setLoadingError(null);
        setIsLoading(false);
      })
      .catch(() => {
        dispatch(setImages(null));
        setLoadingError("There was an error loading data.");
        setIsLoading(false);
      });
  }, [page, imagesPerPage, dispatch]);

  const handleChangePage = (event, newPage) => {
    dispatch(setPageNumber(newPage));
  };

  const handleChangeImagesPerPage = (event) => {
    dispatch(setImagesPerPage(parseInt(event.target.value, 10)));
    dispatch(setPageNumber(0));
  };

  return (
    <Grid container className={classes.mainContainer}>
      <TopBar />
      <Grid item container justify="center">
        <Grid container item xs={10}>
          <Grid container justify="center">
            <Grid item>
              <Grid container justify="center" spacing={6}>
                {data?.length && !isLoading ? (
                  <>
                    {data.map((image) => (
                      <Grid key={image.id} item xs={12} md={6} lg={4}>
                        <Card>
                          <CardActionArea
                            onClick={() => history.push(`/image/${image.id}`)}
                          >
                            <CardMedia
                              key={page}
                              className={classes.cardImage}
                              component="img"
                              src={
                                !showImagesState
                                  ? "https://globalhygiene.pl/wp-content/uploads/2018/07/blank-product-600x600.jpg"
                                  : `https://picsum.photos/id/${image.id}/1000/300`
                              }
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                              >
                                {image.author}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                Original width: {image.width} px <br />
                                Original height: {image.height} px
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                  </>
                ) : (
                  <Grid container justify="center" spacing={10}>
                    <Grid item>
                      {loadingError ? (
                        <Typography variant="h6" color="error">
                          {loadingError}
                        </Typography>
                      ) : (
                        <CircularProgress />
                      )}
                    </Grid>
                  </Grid>
                )}
                {!loadingError ? (
                  <TablePagination
                    component="div"
                    count={-1}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={imagesPerPage}
                    onChangeRowsPerPage={handleChangeImagesPerPage}
                    rowsPerPageOptions={[6, 12, 21, 42]}
                    labelRowsPerPage="Per page"
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    mainContainer: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    cardImage: {
      height: "260px",
    },
  })
);

export default Home;
