import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";

const Image = ({ image, page, showImagesState }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid key={image.id} item xs={12} md={6} lg={4}>
      <Card>
        <CardActionArea onClick={() => history.push(`/image/${image.id}`)}>
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
            <Typography gutterBottom variant="h5" component="h2">
              {image.author}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Original width: {image.width} px <br />
              Original height: {image.height} px
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    cardImage: {
      height: "260px",
    },
  })
);

export default Image;
