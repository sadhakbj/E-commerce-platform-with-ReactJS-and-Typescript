const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  currentUser: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
}
const AuthReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "value":
      return state

    case "set_auth":
      return {
        ...state,
        ...actions.payload,
      }

    case "set_current_user":
      return { ...state, currentUser: actions.payload }

    case "set_is_logged_in":
      return { ...state, isLoggedIn: actions.payload }

    default:
      return state
  }
}

export default AuthReducer
