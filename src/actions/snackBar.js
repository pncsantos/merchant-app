import { HIDE_SNACK_BAR, SHOW_SNACK_BAR } from "./types";

// update snack bar state to
export const hideSnackBar = () => (dispatch) => {
  dispatch({
    type: HIDE_SNACK_BAR,
  });
};

// update snack bar state to
export const showSnackBar = ({ message, status }) => (dispatch) => {
  dispatch({
    type: SHOW_SNACK_BAR,
    payload: {
      message,
      status,
    },
  });
};
