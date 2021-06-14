import {
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import GoBackIcon from "@material-ui/icons/Reply";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TopBar from "../components/TopBar";

const Image = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();

  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  const isMobile = useMediaQuery("(max-width:600px)");

  const images = useSelector((state) => state.images.imagesArray);
  const showImagesState = useSelector((state) => state.images.showImages);

  const imageId = params.id;

  useEffect(() => {
    const isActualImageInStore = images.find((x) => x.id === imageId);

    setIsLoading(true);

    if (isActualImageInStore) {
      setImageData(isActualImageInStore);
      setLoadingError(null);
      setIsLoading(false);
    } else {
      getImage();
    }
  }, [imageId, images]);

  const getImage = () => {
    fetch(`https://picsum.photos/id/${imageId}/info`)
      .then((res) => res.json())
      .then((res) => {
        setImageData(res);
        setLoadingError(null);
        setIsLoading(false);
      })
      .catch(() => {
        setLoadingError(
          "There was problem fetching data or there is no image with that id. Try again."
        );
        setImageData(null);
        setIsLoading(false);
      });
  };

  return (
    <Grid container className={classes.mainContainer}>
      <TopBar />
      <Grid container justify="center">
        <Grid container item sm={10}>
          {imageData && !isLoading ? (
            <Grid container>
              <Grid item container justify="center" alignItems="center">
                {!isMobile ? (
                  <Grid container item xs={1} justify="center">
                    <Grid item>
                      <Button
                        onClick={() =>
                          history.push(`/image/${parseInt(imageId) - 1}`)
                        }
                      >
                        <NavigateBeforeIcon />
                      </Button>
                    </Grid>
                  </Grid>
                ) : null}

                <Grid item xs={10}>
                  <img
                    src={
                      !showImagesState
                        ? "https://globalhygiene.pl/wp-content/uploads/2018/07/blank-product-600x600.jpg"
                        : `https://picsum.photos/id/${imageId}/1400/800`
                    }
                    alt={imageId}
                    className={classes.image}
                  />

                  {isMobile ? (
                    <Grid
                      container
                      item
                      className={classes.navigationIconsMobileContainer}
                    >
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          onClick={() =>
                            history.push(`/image/${parseInt(imageId) - 1}`)
                          }
                        >
                          Prev
                        </Button>
                      </Grid>
                      <Grid container item xs={6} justify="flex-end">
                        <Grid item>
                          <Button
                            variant="contained"
                            onClick={() =>
                              history.push(`/image/${parseInt(imageId) + 1}`)
                            }
                          >
                            Next
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}

                  <Grid container alignItems="center">
                    <Grid item xs={10}>
                      <Typography variant="h5">
                        Author: {imageData.author}
                      </Typography>
                      <Typography variant="body1">
                        Original width: {imageData.width} px
                      </Typography>
                      <Typography variant="body1">
                        Original height: {imageData.height} px
                      </Typography>
                      <Typography variant="body2">
                        Link:{" "}
                        <Link target="blank" href={imageData.url}>
                          {imageData.url}
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {!isMobile ? (
                  <Grid container item xs={1} justify="center">
                    <Grid item>
                      <Button
                        onClick={() =>
                          history.push(`/image/${parseInt(imageId) + 1}`)
                        }
                      >
                        <NavigateNextIcon />
                      </Button>
                    </Grid>
                  </Grid>
                ) : null}

                <Grid
                  container
                  item
                  xs={10}
                  justify="flex-end"
                  className={classes.goBackIconContainer}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => history.replace("/")}
                  >
                    <GoBackIcon className={classes.goBackIcon} />
                    Go back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid container direction="column" spacing={2}>
              {loadingError ? (
                <>
                  <Grid container item justify="center">
                    <Typography variant="h6" color="error">
                      {loadingError}
                    </Typography>
                  </Grid>
                  <Grid container item justify="center" spacing={2}>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => history.replace("/")}
                      >
                        Homepage
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() =>
                          history.push(
                            `/image/${imageId < 0 ? 0 : parseInt(imageId) + 1}`
                          )
                        }
                      >
                        Next image
                      </Button>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <CircularProgress />
              )}
            </Grid>
          )}
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
    image: {
      width: "100%",
      height: "700px",
      [theme.breakpoints.down("lg")]: {
        height: "550px",
      },
      [theme.breakpoints.down("md")]: {
        height: "400px",
      },
      [theme.breakpoints.down("xs")]: {
        height: "200px",
      },
      marginBottom: theme.spacing(2),
      boxShadow: "5px 5px 15px -8px #000000",
    },
    navigationIconsMobileContainer: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    goBackIconContainer: {
      marginTop: theme.spacing(3),
    },
    goBackIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

export default Image;
