import { TypeKeys } from "./actions";

export const initialState = {
  creator: true,
  busy: false,
  error: false,
  customerId: null,
  timeout: null
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
  case TypeKeys.CREATE_CUSTOMER:
    return { ...state, creator: true, busy: true };
  case TypeKeys.SHOW_PROFILE:
    return { ...state, creator: false, busy: true };
  case TypeKeys.ERROR_RESPONSE:
    return { ...state, busy: false, error: action.error };
  case TypeKeys.FETCH_SUCCESS:
    return {
      ...state,
      busy: false,
      error: false
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
      error: false
    };
  case TypeKeys.CREATION_SUCCESS:
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
