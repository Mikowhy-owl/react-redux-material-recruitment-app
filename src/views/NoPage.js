import { Button, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";

export default function NoPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.container}
        direction="column"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h4">
            404 | This page could not be found.
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.replace("/")}
          >
            Go back to main page
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      height: "100vh",
      padding: theme.spacing(2),
    },
  })
);
