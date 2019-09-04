import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Customer } from "../../../model";
import history from "../../../utils/history";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  firstItem: {
    flexBasis: 200,
    overflow: "hidden",
    marginRight: 16
  },
  secondItem: {
    flexBasis: 200
  }
}));

const CustomersList = ({ customers }: { customers: Partial<Customer>[] }) => {
  const classes = useStyles("");
  const matches = useMediaQuery("(min-width:600px)");

  function handleListItemClick(id) {
    history.push(`/customer?id=${id}`);
  }

  return (
    <List className={classes.root}>
      {customers.map(({ id, avatar, firstName, email, lastName, balance }) => (
        <ListItem key={id} button onClick={() => handleListItemClick(id)}>
          <ListItemAvatar>
            <Avatar>
              <Avatar alt="Avatar" src={avatar} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            className={classes.firstItem}
            primary={email}
            secondary={`$${balance}`}
          />
          {matches && (
            <ListItemText
              className={classes.secondItem}
              primary={`${firstName} ${lastName}`}
            />
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default CustomersList;
