import { GET_MERCHANT_BY_ID } from "../actions/types";

export const initialState = {
  data: null,
  isFetching: false,
};

export default function merchant(state = initialState, action) {
  switch (action.type) {
    case `${GET_MERCHANT_BY_ID}_SUCCESS`: {
      const { data } = action.payload;
      return {
        ...state,
        data,
        isFetching: false,
      };
    }
    case `${GET_MERCHANT_BY_ID}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${GET_MERCHANT_BY_ID}_ERROR`:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
