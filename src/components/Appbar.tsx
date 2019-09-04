import * as React from "react";
import * as PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "./Link";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 32
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const ButtonAppBar = ({ children }) => {
  const classes = useStyles("");

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            App
          </Typography>
          {children}
          <Button color="inherit">
            <Link href="/request">Request</Link>
          </Button>
          <Button color="inherit">
            <Link href="/">Customers</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

ButtonAppBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

export default ButtonAppBar;
