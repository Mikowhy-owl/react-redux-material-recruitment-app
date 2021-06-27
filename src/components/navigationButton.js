import { Button } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React from "react";
import { useHistory } from "react-router-dom";

const NavigationButton = ({ type, url }) => {
  const history = useHistory();

  return (
    <Button onClick={() => history.push(url)}>
      {type === "prev" ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
    </Button>
  );
};

export default NavigationButton;
