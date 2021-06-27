import { Button, Grid } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import GoBackIcon from "@material-ui/icons/Reply";
import React from "react";
import { useHistory } from "react-router-dom";

const HomeButton = () => {
  const classes = useStyles();

  const history = useHistory();

  return (
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
        Home
      </Button>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    goBackIconContainer: {
      marginTop: theme.spacing(3),
    },
    goBackIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

export default HomeButton;
