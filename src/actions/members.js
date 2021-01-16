import axios from "axios";

import { GET_MEMBERS, SET_MEMBERS_FILTERS } from "./types";

import { SERVER_URL } from "../utils/constants";

// fetch list of members by merchant ID, page and page size
export const getMembers = ({ merchantId, page, pageSize }) => (dispatch) => {
  dispatch({
    type: `${GET_MEMBERS}_PENDING`,
    payload: axios({
      method: "GET",
      url: `${SERVER_URL}/merchants/${merchantId}/members?page=${page}&limit=${pageSize}`,
    })
      .then((response) => {
        dispatch({
          type: `${GET_MEMBERS}_SUCCESS`,
          payload: {
            data: response.data,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: `${GET_MEMBERS}_ERROR`,
        });
      }),
  });
};

// update members filter parameters
export const setMembersFilterParams = (filters) => (dispatch) => {
  dispatch({
    type: SET_MEMBERS_FILTERS,
    payload: {
      filters,
    },
  });
};
