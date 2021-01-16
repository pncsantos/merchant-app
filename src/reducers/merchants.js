import { GET_MERCHANTS, SET_MERCHANTS_FILTERS } from "../actions/types";

export const initialState = {
  data: null,
  isFetching: false,
  totalCount: 0,
  filterParams: {
    page: 0,
    pageSize: 5,
  },
};

export default function merchants(state = initialState, action) {
  switch (action.type) {
    case `${GET_MERCHANTS}_SUCCESS`: {
      const { data } = action.payload;
      return {
        ...state,
        data: data.merchants || [],
        isFetching: false,
        totalCount: data.totalCount || 0,
      };
    }
    case `${GET_MERCHANTS}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${GET_MERCHANTS}_ERROR`:
      return {
        ...state,
        isFetching: false,
      };
    case SET_MERCHANTS_FILTERS:
      return {
        ...state,
        filterParams: action.payload.filters,
      };
    default:
      return state;
  }
}
