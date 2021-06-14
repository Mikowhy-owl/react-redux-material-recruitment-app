import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Image from "./views/Image";
import NoPage from "./views/NoPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/image/:id">
          <Image />
        </Route>
        <Route>
          <NoPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
