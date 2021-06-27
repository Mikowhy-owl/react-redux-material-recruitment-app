import { Button, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { showImages } from "../redux/actions";

const TopBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const showImagesState = useSelector((state) => state.images.showImages);

  return (
    <Grid item container justify="center" className={classes.topBar}>
      <Grid item container xs={10}>
        <Grid item xs={4}>
          <Typography
            className={classes.appName}
            variant="h6"
            onClick={() => history.replace("/")}
          >
            Appname
          </Typography>
        </Grid>
        <Grid container item xs={8} justify="flex-end">
          <Grid item>
            <Button
              color={!showImagesState ? "primary" : "secondary"}
              variant="contained"
              onClick={() => {
                dispatch(showImages());
              }}
            >
              {!showImagesState ? "Enable" : "Disable"} images
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    topBar: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    appName: {
      cursor: "pointer",
    },
  })
);

export default TopBar;
