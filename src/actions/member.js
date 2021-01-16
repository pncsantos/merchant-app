import axios from "axios";

import {
  CREATE_MEMBER,
  DELETE_MEMBER,
  GET_MEMBER_BY_ID,
  UPDATE_MEMBER,
} from "./types";

// actions
import { showSnackBar } from "./snackBar";

import { SERVER_URL, STATUS } from "../utils/constants";

// fetch member details by id
export const getMemberById = (id) => (dispatch) => {
  dispatch({
    type: `${GET_MEMBER_BY_ID}_PENDING`,
    payload: axios({
      method: "GET",
      url: `${SERVER_URL}/members/${id}`,
    })
      .then((response) => {
        dispatch({
          type: `${GET_MEMBER_BY_ID}_SUCCESS`,
          payload: {
            data: response.data,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: `${GET_MEMBER_BY_ID}_ERROR`,
        });
      }),
  });
};

// create new member and display message if request is success or failed
export const createMember = (payload, callBackRequest) => (dispatch) => {
  dispatch({
    type: CREATE_MEMBER,
    payload: axios({
      method: "POST",
      url: `${SERVER_URL}/members`,
      data: payload,
    })
      .then((response) => {
        callBackRequest(response.data);
        dispatch(
          showSnackBar({
            message:"Member was successfully created",
            status: STATUS.success,
          })
        );
      })
      .catch((e) => {
        dispatch(
          showSnackBar({
            message: e.response.data ? e.response.data.message : e.message,
            status: STATUS.error,
          })
        );
      }),
  });
};

// update existing member and display message if request is success or failed
export const updateMember = (id, payload, callBackRequest) => (dispatch) => {
  dispatch({
    type: UPDATE_MEMBER,
    payload: axios({
      method: "PATCH",
      url: `${SERVER_URL}/members/${id}`,
      data: payload,
    })
      .then(() => {
        callBackRequest();
        dispatch(
          showSnackBar({
            message: "Member was successfully created",
            status: STATUS.success,
          })
        );
      })
      .catch((e) => {
        dispatch(
          showSnackBar({
            message: e.response.data ? e.response.data.message : e.message,
            status: STATUS.error,
          })
        );
      }),
  });
};

// delete existing member and display message if request is success or failed
export const deleteMember = (id, callBackRequest) => (dispatch) => {
  dispatch({
    type: DELETE_MEMBER,
    payload: axios({
      method: "DELETE",
      url: `${SERVER_URL}/members/${id}`,
    })
      .then(() => {
        callBackRequest();
        dispatch(
          showSnackBar({
            message: "Member successfully deleted",
            status: STATUS.success,
          })
        );
      })
      .catch((e) => {
        dispatch(
          showSnackBar({
            message: e.response.data ? e.response.data.message : e.message,
            status: STATUS.error,
          })
        );
      }),
  });
};
