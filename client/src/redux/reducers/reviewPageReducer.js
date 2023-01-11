const initialState = {
    reviewPage: {},
    isReviewPagePending: false,
    error: "",
}


const reviewPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REVIEW_PAGE_FETCHING":
            return {
                ...state,
                isReviewPagePending: true,
            }
        case "REVIEW_PAGE_FETCHED":
            return {
                ...state,
                reviewPage: action.payload,
                isReviewPagePending: false,
            }
        case "REVIEW_FETCHING_ERROR":
            return {
                ...state,
                error: "error",
                isReviewPagePending: false,
            }
        default:
            return state
    }
}

export default reviewPageReducer;