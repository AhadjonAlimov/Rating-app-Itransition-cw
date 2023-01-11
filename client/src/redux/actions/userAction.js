export const authFetching = () => {
    return {
        type: "AUTH_FETCHING",
    }
}

export const authFetched = (auth) => {
    return {
        type: "AUTH_FETCHED",
        payload: auth,
    }
}

export const authFetchingError = () => {
    return {
        type: "AUTH_FETCHING_ERROR",
    }
}