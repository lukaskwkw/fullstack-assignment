import { Customer } from "../../model";

export enum TypeKeys {
  CREATE_CUSTOMER = "CREATE_CUSTOMER",
  SHOW_PROFILE = "SHOW_PROFILE",
  ERROR_RESPONSE = "ERROR_RESPONSE",
  CREATION_SUCCESS = "CREATION_SUCCESS",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  HIDE_ALL_NOTIFICATIONS = "HIDE_ALL_NOTIFICATIONS",
  TIMEOUT = "TIMEOUT"
}

const notificationTime = 5000;

const createUrl = "/api/create";

export const fetchCustomerUrl = id => `/api/customers/${id}`;

const requestCustomer = () => ({
  type: TypeKeys.CREATE_CUSTOMER
});

const showProfile = () => ({
  type: TypeKeys.SHOW_PROFILE
});

const responseError = error => ({
  type: TypeKeys.ERROR_RESPONSE,
  error
});

const responseCreationSuccess = customerId => ({
  type: TypeKeys.CREATION_SUCCESS,
  customerId
});

const responseFetchSuccess = () => ({
  type: TypeKeys.FETCH_SUCCESS
});

const hideAllNotifications = () => ({
  type: TypeKeys.HIDE_ALL_NOTIFICATIONS
});

const addTimeout = timeout => dispatch =>
  dispatch({
    type: TypeKeys.TIMEOUT,
    timeout: setTimeout(() => dispatch(hideAllNotifications()), timeout)
  });

interface GetCustomer {
  (id: string, size: Function): (dispatch: Function) => Promise<Response>;
}

export const getCustomer: GetCustomer = (id, setCustomer) => dispatch => {
  dispatch(showProfile());

  return fetch(fetchCustomerUrl(id))
    .then(response => response.json())
    .then(json => {
      if (json.error) {
        addTimeout(notificationTime)(dispatch);
        return dispatch(responseError(json.error));
      }
      dispatch(responseFetchSuccess());
      setCustomer(json);
    });
};

interface CreateCustomer {
  (customer: Partial<Customer>): (dispatch: Function) => Promise<Response>;
}

export const createCustomer: CreateCustomer = customer => dispatch => {
  dispatch(requestCustomer());

  return fetch(createUrl, {
    method: "POST",
    body: JSON.stringify(customer),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json(), error => dispatch(responseError(error)))
    .then(json => {
      addTimeout(notificationTime)(dispatch);
      if (json.error) {
        return dispatch(responseError(json.error));
      }
      dispatch(responseCreationSuccess(json.customerId));
    });
};
