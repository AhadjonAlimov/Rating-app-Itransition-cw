export const reviewFetching = () => {
    return {
        type: "REVIEW_FETCHING",
    }
}

export const reviewFetched = (review) => {
    return {
        type: "REVIEW_FETCHED",
        payload: review,
    }
}

export const reviewFetchingError = () => {
    return {
        type: "REVIEW_FETCHING_ERROR",
    }
}