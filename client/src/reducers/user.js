import {
  FETCHING_USER,
  LOGOUT_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
} from "../actions/user";

export default function user(state = {
  loading: false,
  error: false,
  data: {},
  pendingInvites: [],
}, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return { ...state, data: action.user };
    case LOGOUT_USER:
      return { ...state, data: {} };
    case FETCHING_USER:
      return { ...state, loading: true };
    case FETCH_USER_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
