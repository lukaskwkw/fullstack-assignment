import React, { useState } from "react";
import ReactDOM from "react-dom";
import { PropTypes } from "prop-types";
import Container from "@material-ui/core/Container";

import "./index.scss";
import PAGES, { Routes } from "./routes";
import history from "./utils/history";
import ButtonAppBar from "./components/Appbar";

const App = ({ pathname }) => {
  const [page, setPage] = useState(pathname);

  history.addListener(setPage);

  const found = Routes.find(
    route => route !== "/" && new RegExp(route).test(page)
  );

  console.info({ found, page });

  const Handler = PAGES[found] || PAGES["/404"];
  return (
    <>
      <ButtonAppBar />
      <Container fixed>
        <Handler />
      </Container>
    </>
  );
};

App.propTypes = {
  pathname: PropTypes.oneOf(Object.keys(PAGES)).isRequired
};

if (typeof window !== "undefined") {
  console.info("main " + location.pathname);
  ReactDOM.render(
    <App pathname={location.pathname} />,
    document.getElementById("app")
  );
}

export default App;
