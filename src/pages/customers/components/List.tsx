import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Customer } from "../../../model";
import history from "../../../utils/history";
import { avatarLetters } from "../../../server/utils";

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

  function handleListItemClick(id) {
    history.push(`/customer?id=${id}`);
  }

  return (
    <List className={classes.root}>
      {customers.map(({ id, avatar, firstName, email, lastName }) => (
        <ListItem key={id} button onClick={() => handleListItemClick(id)}>
          <ListItemAvatar>
            <Avatar>
              <Avatar alt="Avatar" src={avatar}>
                {avatarLetters(firstName, lastName)}
              </Avatar>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            className={classes.firstItem}
            primary={email}
            secondary={`${firstName} ${lastName}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default CustomersList;
