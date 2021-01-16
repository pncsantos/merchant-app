import { GET_MEMBERS, SET_MEMBERS_FILTERS } from "../actions/types";

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
    case `${GET_MEMBERS}_SUCCESS`: {
      const { data } = action.payload;
      return {
        ...state,
        data: data.members || [],
        isFetching: false,
        totalCount: data.totalCount || 0,
      };
    }
    case `${GET_MEMBERS}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${GET_MEMBERS}_ERROR`:
      return {
        ...state,
        isFetching: false,
      };
    case SET_MEMBERS_FILTERS:
      return {
        ...state,
        filterParams: action.payload.filters,
      };
    default:
      return state;
  }
}
