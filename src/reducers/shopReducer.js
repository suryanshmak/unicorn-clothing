import {
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_ERROR,
  FETCH_CAROUSEL_SUCCESS,
  FETCH_CAROUSEL_ERROR,
} from "../actions/types";

export default function shopReducer(
  state = { collections: null, error: null, carousel: null },
  action
) {
  switch (action.type) {
    case FETCH_COLLECTIONS_SUCCESS:
      return { ...state, collections: action.payload };
    case FETCH_CAROUSEL_SUCCESS:
      return { ...state, carousel: action.payload };
    case FETCH_COLLECTIONS_ERROR:
    case FETCH_CAROUSEL_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
