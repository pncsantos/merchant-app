import { SHOW_SNACK_BAR, HIDE_SNACK_BAR } from "../actions/types";

export const initialState = {
  showSnackBar: false,
  details: null,
};

export default function snackBars(state = initialState, action) {
  switch (action.type) {
    case SHOW_SNACK_BAR:
      return {
        showSnackBar: true,
        details: action.payload,
      };
    case HIDE_SNACK_BAR:
      return {
        showSnackBar: false,
        details: null,
      };
    default:
      return state;
  }
}
