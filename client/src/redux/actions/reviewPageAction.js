export const reviewPageFetching = () => {
    return {
        type: "REVIEW_PAGE_FETCHING",
    }
}

export const reviewPageFetched = (review) => {
    return {
        type: "REVIEW_PAGE_FETCHED",
        payload: review,
    }
}

export const reviewPageFetchingError = () => {
    return {
        type: "REVIEW_PAGE_FETCHING_ERROR",
    }
}