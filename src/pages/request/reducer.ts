export const initialState = {
  creator: true,
  busy: false,
  error: false,
  customerId: false
};

const url = "/api/create";

const requestCustomer = () => ({
  type: "CREATE_CUSTOMER"
});

const showProfile = () => ({
  type: "SHOW_PROFILE"
});

const responseError = error => ({
  type: "ERROR_RESPONSE",
  error
});

const responseCreationSuccess = customerId => ({
  type: "CREATION_SUCCESS",
  customerId
});

const responseFeatchSuccess = () => ({
  type: "FETCH_SUCCESS"
});

export const getCustomer = (id, setCustomer) => dispatch => {
  dispatch(showProfile());
  fetch(`/api/customers/${id}`)
    .then(response => response.json())
    .then(json => {
      if (json.error) {
        return dispatch(responseError(json.error));
      }
      dispatch(responseFeatchSuccess());
      setCustomer(json);
    });
};

export const createCustomer = customer => dispatch => {
  dispatch(requestCustomer());
  fetch(url, {
    method: "POST",
    body: JSON.stringify(customer),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json(), error => dispatch(responseError(error)))
    .then(json => {
      if (json.error) {
        return dispatch(responseError(json.error));
      }
      dispatch(responseCreationSuccess(json.customerId));
    });
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
  case "CREATE_CUSTOMER":
    return { ...state, creator: true, busy: true };
  case "SHOW_PROFILE":
    return { ...state, creator: false, busy: true };
  case "ERROR_RESPONSE":
    return { ...state, busy: false, error: action.error };
  case "FETCH_SUCCESS":
    return {
      ...state,
      busy: false,
      error: false
    };
  case "CREATION_SUCCESS":
    return {
      ...state,
      busy: false,
      error: false,
      customerId: action.customerId
    };
  default:
    return state;
  }
};
