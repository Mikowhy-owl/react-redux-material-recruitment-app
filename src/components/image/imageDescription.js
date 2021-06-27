import { Grid, Link, Typography } from "@material-ui/core";
import React from "react";

const ImageDescription = ({ imageData }) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={10}>
        <Typography variant="h5">Author: {imageData.author}</Typography>
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
  );
};

export default ImageDescription;
