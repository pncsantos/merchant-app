import axios from "axios";

import { GET_MERCHANTS, SET_MERCHANTS_FILTERS } from "./types";

import { SERVER_URL } from "../utils/constants";

// fetch list of merchants using page and page size
export const getMerchants = ({ page, pageSize }) => (dispatch) => {
  dispatch({
    type: `${GET_MERCHANTS}_PENDING`,
    payload: axios({
      method: "GET",
      url: `${SERVER_URL}/merchants?page=${page}&limit=${pageSize}`,
    })
      .then((response) => {
        dispatch({
          type: `${GET_MERCHANTS}_SUCCESS`,
          payload: {
            data: response.data,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: `${GET_MERCHANTS}_ERROR`,
        });
      }),
  });
};

// update merchant filter parameters
export const setMerchantFilterParams = (filters) => (dispatch) => {
  dispatch({
    type: SET_MERCHANTS_FILTERS,
    payload: {
      filters,
    },
  });
};
