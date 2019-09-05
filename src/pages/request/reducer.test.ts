import { useReducer } from "react";
import { act, renderHook } from "@testing-library/react-hooks";

import fetchMock = require("fetch-mock");
import { describe } from "riteway";
import { customerReducer, initialState } from "./reducer";
import {
  createUrl,
  getCustomer,
  fetchCustomerUrl,
  createCustomer,
  withDrawBalanceUrl,
  withdrawBalance
} from "./actions";
import customersSeed from "../../server/seed";
import { ErrorList } from "../../server/utils";
import { Customer } from "../../model";

const testCustomer: Partial<Customer> = {
  firstName: "Alex",
  lastName: "Test",
  email: "test11@example.com"
};

describe("customer reducer", async assert => {
  {
    assert({
      given: "no arguments",
      should: "return the valid initial state",
      actual: customerReducer(initialState, { type: null }),
      expected: initialState
    });
  }

  {
    const testId = "4";
    const expectedCustomer = customersSeed[3];
    const response = expectedCustomer;
    fetchMock.get(fetchCustomerUrl(testId), response);

    const { result } = renderHook(() =>
      useReducer(customerReducer, initialState)
    );
    const [state, dispatch] = result.current;

    act(() => {
      getCustomer(testId)(dispatch).then(() => {
        const [stateAfter] = result.current;

        assert({
          given: "correct customer id with dispatch",
          should: "retrive state with correct customer from the server",
          actual: stateAfter,
          expected: { ...state, customer: expectedCustomer }
        });
      });
    });
  }

  {
    const testId = "wrong_id";
    const response = { error: ErrorList.CUSTOMER_NOT_FOUND };
    fetchMock.get(fetchCustomerUrl(testId), response);

    const { result } = renderHook(() =>
      useReducer(customerReducer, initialState)
    );
    const [state, dispatch] = result.current;

    act(() => {
      getCustomer(testId)(dispatch).then(() => {
        const [stateAfter] = result.current;

        assert({
          given: "wrong correct customer id with dispatch",
          should:
            "retrive state with error from the server and with set timeout for notification",
          actual: { ...stateAfter, timeout: 5000 },
          expected: {
            ...state,
            error: ErrorList.CUSTOMER_NOT_FOUND,
            timeout: stateAfter.timeout && 5000
          }
        });
      });
    });
  }

  {
    const generatedId = "TEST_ID";
    const response = { customerId: generatedId };
    fetchMock.reset();
    fetchMock.post(createUrl, response);

    const { result } = renderHook(() =>
      useReducer(customerReducer, { ...initialState, creator: true })
    );
    const [state, dispatch] = result.current;

    act(() => {
      createCustomer(testCustomer)(dispatch).then(() => {
        const [stateAfter] = result.current;
        assert({
          given: "all request data to createCustomer",
          should:
            "retrive state with generated customerId from the server and with set timeout for notification",
          actual: { ...stateAfter, timeout: 5000 },
          expected: {
            ...state,
            customerId: generatedId,
            timeout: stateAfter.timeout && 5000
          }
        });
      });
    });
  }

  {
    const response = { error: ErrorList.EMAIL_ALREADY_TAKEN };
    fetchMock.reset();
    fetchMock.post(createUrl, response);

    const { result } = renderHook(() =>
      useReducer(customerReducer, { ...initialState, creator: true })
    );
    const [state, dispatch] = result.current;

    act(() => {
      createCustomer(testCustomer)(dispatch).then(() => {
        const [stateAfter] = result.current;
        assert({
          given:
            "all request data but with already used email to createCustomer",
          should:
            "retrive state with error from the server and with set timeout for notification",
          actual: { ...stateAfter, timeout: 5000 },
          expected: {
            ...state,
            error: ErrorList.EMAIL_ALREADY_TAKEN,
            timeout: stateAfter.timeout && 5000
          }
        });
      });
    });
  }

  {
    const response = { newBalance: 200 };
    const id = "3";
    fetchMock.reset();
    fetchMock.post(withDrawBalanceUrl, response);

    const { result } = renderHook(() =>
      useReducer(customerReducer, initialState)
    );
    const [state, dispatch] = result.current;

    act(() => {
      withdrawBalance(id, 1000)(dispatch).then(() => {
        const [stateAfter] = result.current;

        assert({
          given: "request for withdraw balance",
          should: "get new balance state form server and update reducer state",
          actual: { ...stateAfter },
          expected: {
            ...state,
            customer: { ...state.customer, balance: response.newBalance }
          }
        });
      });
    });
  }
});
