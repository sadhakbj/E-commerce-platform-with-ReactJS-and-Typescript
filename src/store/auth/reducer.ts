import { SET_AUTH, SET_CURRENT_USER, SET_IS_LOGGED_IN } from "./type"

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  currentUser: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
}
const AuthReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "value":
      return state

    case SET_AUTH:
      return {
        ...state,
        ...actions.payload,
      }

    case SET_CURRENT_USER:
      return { ...state, currentUser: actions.payload }

    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: actions.payload }

    default:
      return state
  }
}

export default AuthReducer
