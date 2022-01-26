// eslint-disable-next-line no-unused-vars
import {
  GET_PURCHASE,
  CREATE_PURCHASE,
  DELETE_PURCHASE,
  UPDATE_PURCHASE,
  BASE_URL,
} from "../actions/types";
import axios from "axios";
import { tokenConfig } from "./auth";

const url = `${BASE_URL}api/purchase/`;

export const getPurchase = () => (dispatch, getState) => {
  axios.get(url, tokenConfig(getState)).then((res) => {
    dispatch({
      type: GET_PURCHASE,
      payload: res.data,
    });
  });
};

export const createPurchase = (Bill) => (dispatch, getState) => {
  axios
    .post(url, Bill, tokenConfig(getState))
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: CREATE_PURCHASE,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
