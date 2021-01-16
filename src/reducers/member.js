import { GET_MEMBER_BY_ID } from "../actions/types";

export const initialState = {
  data: null,
  isFetching: false,
};

export default function member(state = initialState, action) {
  switch (action.type) {
    case `${GET_MEMBER_BY_ID}_SUCCESS`: {
      const { data } = action.payload;
      return {
        ...state,
        data,
        isFetching: false,
      };
    }
    case `${GET_MEMBER_BY_ID}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${GET_MEMBER_BY_ID}_ERROR`:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
