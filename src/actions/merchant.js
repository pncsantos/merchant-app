import axios from "axios";

import {
  CREATE_MERCHANT,
  GET_MERCHANT_BY_ID,
  UPDATE_MERCHANT,
  UPLOAD_MERCHANTS_PHOTO,
} from "./types";

// actions
import { showSnackBar } from "./snackBar";

import { SERVER_URL, STATUS } from "../utils/constants";

// fetch merchant details by id
export const getMerchantById = (id) => (dispatch) => {
  dispatch({
    type: `${GET_MERCHANT_BY_ID}_PENDING`,
    payload: axios({
      method: "GET",
      url: `${SERVER_URL}/merchants/${id}`,
    })
      .then((response) => {
        dispatch({
          type: `${GET_MERCHANT_BY_ID}_SUCCESS`,
          payload: {
            data: response.data,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: `${GET_MERCHANT_BY_ID}_ERROR`,
        });
      }),
  });
};

// create new merchant and display message if request is success or failed
export const createMerchant = (payload, callBackRequest) => (dispatch) => {
  dispatch({
    type: CREATE_MERCHANT,
    payload: axios({
      method: "POST",
      url: `${SERVER_URL}/merchants`,
      data: payload,
    })
      .then((response) => {
        callBackRequest(response.data);
        dispatch(
          showSnackBar({
            message: "Merchant successfully created",
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

// update existing merchant and display message if request is success or failed
export const updateMerchant = (id, payload, callBackRequest) => (dispatch) => {
  dispatch({
    type: UPDATE_MERCHANT,
    payload: axios({
      method: "PATCH",
      url: `${SERVER_URL}/merchants/${id}`,
      data: payload,
    })
      .then(() => {
        callBackRequest();
        dispatch(
          showSnackBar({
            message: "Merchant successfully updated",
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

// upload new merchant photo
export const uploadMerchantPhoto = (id, payload) => (dispatch) => {
  dispatch({
    type: UPLOAD_MERCHANTS_PHOTO,
    payload: axios({
      method: "PUT",
      url: `${SERVER_URL}/merchants/${id}/upload`,
      data: payload,
    })
      .then(() => {
        dispatch(
          showSnackBar({
            message: "Photo successfully uploaded",
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
