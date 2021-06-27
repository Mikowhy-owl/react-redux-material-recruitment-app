import { CircularProgress, Grid } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HomeButton from "../components/homeButton";
import ImageDescription from "../components/image/imageDescription";
import ImageError from "../components/image/imageError";
import MobileNavigationButtons from "../components/image/mobileNavigationButtons";
import NavigationButton from "../components/navigationButton";
import TopBar from "../components/topBar";
import useImage from "../hooks/useImage";

const Image = () => {
  const classes = useStyles();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width:600px)");
  const imageId = params.id;

  const { imageData, isLoading, loadingError } = useImage({ imageId });

  const showImagesState = useSelector((state) => state.images.showImages);

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
                      <NavigationButton
                        type="prev"
                        url={`/image/${parseInt(imageId) - 1}`}
                      />
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
                    <MobileNavigationButtons imageId={imageId} />
                  ) : null}

                  <ImageDescription imageData={imageData} />
                </Grid>

                {!isMobile ? (
                  <Grid container item xs={1} justify="center">
                    <Grid item>
                      <NavigationButton
                        type="next"
                        url={`/image/${parseInt(imageId) + 1}`}
                      />
                    </Grid>
                  </Grid>
                ) : null}

                <HomeButton />
              </Grid>
            </Grid>
          ) : (
            <Grid container direction="column" spacing={2}>
              {loadingError ? (
                <ImageError loadingError={loadingError} imageId={imageId} />
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
  })
);

export default Image;
