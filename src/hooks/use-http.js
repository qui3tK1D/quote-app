import { useReducer } from "react";

const initialState = {
  data: null,
  error: null,
  status: null,
};

const httpReducer = (state, action) => {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }
  if (action.type === "SUCCESS") {
    return {
      data: action.res,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.err,
      status: "failed",
    };
  }
  return state;
};

const useHttp = (requestTypeFn) => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const sendRequest = async (requestData) => {
    dispatchHttp({ type: "SEND" });
    try {
      const res = await requestTypeFn(requestData);
      dispatchHttp({ type: "SUCCESS", res });
    } catch (err) {
      dispatchHttp({ type: "ERROR", err });
    }
  };

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
