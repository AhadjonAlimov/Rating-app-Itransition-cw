import Cookies from "js-cookie";


const initialState = {
    auth: Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null,
    isAuthPending: false,
    error: "",
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_FETCHING":
            return {
                ...state,
                isAuthPending: true,
            }
        case "AUTH_FETCHED":
            return {
                ...state,
                auth: action.payload,
                isAuthPending: false,
            }
        case "AUTH_FETCHING_ERROR":
            return {
                ...state,
                error: "error",
                isAuthPending: false,
            }
        default:
            return state
    }
}

export default authReducer;