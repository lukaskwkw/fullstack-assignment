import * as React from "react";
import { useState, useReducer, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { initialState, customerReducer } from "./reducer";
import {
  createCustomer,
  fillCustomer,
  getCustomer,
  withdrawBalance
} from "./actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Link from "../../components/Link";
import { makeStyles } from "@material-ui/core/styles";
import { avatarLetters } from "../../server/utils";

const useStyles = makeStyles({
  extraBottom: {
    marginBottom: 48
  },
  bigAvatar: {
    margin: 10,
    width: 240,
    height: 240
  },
  lastRow: {
    display: "flex",
    justifyContent: "flex-end",
    "& div": {
      marginRight: 8
    },
    "& button": {
      alignSelf: "center"
    }
  }
});

export default function AddressForm() {
  let timeoutNotification = null;

  const [state, dispatch] = useReducer(customerReducer, {
    ...initialState,
    creator: true
  });

  const [amountToWithdraw, setAmountToWithdraw] = useState(0);

  const { customer } = state;

  const classes = useStyles("");

  useEffect(() => {
    const id = location.search.substr(4);
    if (id) {
      getCustomer(id)(dispatch);
    }
  }, []);

  useEffect(() => {
    timeoutNotification = state.timeout;
    return () => {
      timeoutNotification = state.timeout;
      clearTimeout(timeoutNotification);
    };
  }, [state.timeout]);

  const { id, avatar, firstName, lastName, email, balance } = customer;

  const handleChange = name => event =>
    dispatch(fillCustomer({ ...customer, [name]: event.target.value }));

  return (
    <form
      method="post"
      onSubmit={event => {
        event.preventDefault();
        if (!state.creator) {
          return;
        }
        createCustomer(customer)(dispatch);
      }}
    >
      <Typography
        className={classes.extraBottom}
        align="center"
        variant="h4"
        gutterBottom
      >
        {(state.creator && "Create customer") || `${firstName} ${lastName}`}
      </Typography>
      <Grid container spacing={3}>
        <Grid
          className={classes.extraBottom}
          justify="center"
          alignItems="center"
          container
          item
          xs={12}
          md={4}
        >
          <Avatar className={classes.bigAvatar} alt="Avatar" src={avatar}>
            {avatarLetters(firstName, lastName)}
          </Avatar>
        </Grid>
        <Grid spacing={3} container item xs={12} md={8}>
          <Grid item xs={12}>
            <TextField
              disabled={!state.creator}
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              value={firstName}
              onChange={handleChange("firstName")}
              autoComplete="fname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={!state.creator}
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              value={lastName}
              onChange={handleChange("lastName")}
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={!state.creator}
              required
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={handleChange("email")}
              autoComplete="Email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={!state.creator}
              id="balance"
              name="balance"
              type="number"
              label={(state.creator && "Initial balance") || "Balance"}
              fullWidth
              value={balance}
              onChange={handleChange("balance")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={!state.creator}
              id="avatar"
              name="avatar"
              label="Avatar url"
              fullWidth
              value={avatar}
              onChange={handleChange("avatar")}
            />
          </Grid>
          <Grid item xs={12} md={6}></Grid>
          <Grid className={classes.lastRow} item xs={12} md={6}>
            {(state.creator && (
              <Button
                disabled={state.busy}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            )) || (
              <>
                <TextField
                  id="withdraw-balance"
                  name="withdraw-balance"
                  type="number"
                  label={"Amount to withdraw"}
                  fullWidth
                  value={amountToWithdraw}
                  onChange={event => {
                    if (parseFloat(event.target.value) >= 0) {
                      setAmountToWithdraw(+event.target.value);
                    }
                  }}
                />
                <Button
                  disabled={state.busy}
                  type="submit"
                  variant="contained"
                  onClick={() =>
                    amountToWithdraw > 0 &&
                    withdrawBalance(id, amountToWithdraw)(dispatch)
                  }
                  color="secondary"
                >
                  Withdraw
                </Button>
              </>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {state.busy && <LinearProgress />}
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={state.customerId !== null || state.error != null}
        message={
          (state.customerId && (
            <span id="message-id">
              Customer has been created:{" "}
              <Link className="link" href={`/customer?id=${state.customerId}`}>
                {state.customerId}
              </Link>
            </span>
          )) ||
          (state.error && <span id="message-id">Error: {state.error}</span>)
        }
      />
    </form>
  );
}
