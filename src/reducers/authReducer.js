import { SIGN_IN, SIGN_OUT } from "../actions/types";

export default function authReducer(state = { isSigned: false }, action) {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSigned: true };
    case SIGN_OUT:
      return { ...state, isSigned: false };
    default:
      return state;
  }
}
