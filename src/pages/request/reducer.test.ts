// import * as React from "react";
import { useReducer } from "react";
import { act, renderHook } from "@testing-library/react-hooks";

// import render from "riteway/render-component";
import fetchMock = require("fetch-mock");
import { describe } from "riteway";
import { customerReducer, initialState } from "./reducer";
import { getCustomer, fetchCustomerUrl } from "./actions";
import customersSeed from "../../server/seed";

describe("customer reducer", async assert => {
  {
    assert({
      given: "no arguments",
      should: "return the valid initial state",
      actual: customerReducer(),
      expected: initialState
    });
  }
  {
    const { result } = renderHook(() =>
      useReducer(customerReducer, initialState)
    );
    const [state, dispatch] = result.current;

    const testId = "4";
    fetchMock.get(fetchCustomerUrl(testId), customersSeed[3]);

    console.info({ initialState: state });

    act(() => {
      getCustomer(testId, json => {
        console.info({ json });
      })(dispatch).then(() => {
        console.info({ stateAfter: state });
        console.info({ resultC: result.current });
        // result.json()

        assert({
          given: "correct customer id",
          should: "retrive coorect one from server",
          actual: 5,
          expected: 5
        });
      });

      console.info({ stateBetween: state });
    });
  }
});
