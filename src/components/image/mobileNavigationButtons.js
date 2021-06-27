import { Grid } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import NavigationButton from "../navigationButton";

const MobileNavigationButtons = ({ imageId }) => {
  const classes = useStyles();

  return (
    <Grid container item className={classes.navigationIconsMobileContainer}>
      <Grid item xs={6}>
        <NavigationButton type="prev" url={`/image/${parseInt(imageId) - 1}`} />
      </Grid>
      <Grid container item xs={6} justify="flex-end">
        <Grid item>
          <NavigationButton
            type="next"
            url={`/image/${parseInt(imageId) + 1}`}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    navigationIconsMobileContainer: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

export default MobileNavigationButtons;
