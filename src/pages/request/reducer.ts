import { TypeKeys } from "./actions";

const customerDefault = {
  id: "",
  avatar: "",
  firstName: "",
  lastName: "",
  email: "",
  balance: 0
};

export const initialState = {
  creator: false,
  busy: false,
  error: null,
  customerId: null,
  customer: customerDefault,
  timeout: null
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
  case TypeKeys.CREATE_CUSTOMER:
    return { ...state, creator: true, busy: true };
  case TypeKeys.SHOW_PROFILE:
    return { ...state, creator: false, busy: true };
  case TypeKeys.FILL_PROFILE:
    return { ...state, customer: action.customer };
  case TypeKeys.ERROR_RESPONSE:
    return { ...state, busy: false, error: action.error };
  case TypeKeys.FETCH_SUCCESS:
    return {
      ...state,
      busy: false,
      error: null
    };
  case TypeKeys.TIMEOUT:
    return {
      ...state,
      timeout: action.timeout
    };
  case TypeKeys.HIDE_ALL_NOTIFICATIONS:
    return {
      ...state,
      timeout: null,
      customerId: null,
      busy: false,
      error: null
    };
  case TypeKeys.CREATION_SUCCESS:
    return {
      ...state,
      busy: false,
      error: null,
      customerId: action.customerId
    };
  default:
    return state;
  }
};
