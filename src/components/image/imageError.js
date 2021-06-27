import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const ImageError = ({ loadingError, imageId }) => {
  const history = useHistory();

  return (
    <>
      <Grid container item justify="center">
        <Typography variant="h6" color="error">
          {loadingError}
        </Typography>
      </Grid>
      <Grid container item justify="center" spacing={2}>
        <Grid item>
          <Button variant="contained" onClick={() => history.replace("/")}>
            Homepage
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() =>
              history.push(`/image/${imageId < 0 ? 0 : parseInt(imageId) + 1}`)
            }
          >
            Next image
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ImageError;
