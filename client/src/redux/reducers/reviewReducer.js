const initialState = {
    reviews: [],
    isReviewPending: false,
    error: "",
}


const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REVIEW_FETCHING":
            return {
                ...state,
                isReviewPending: true,
            }
        case "REVIEW_FETCHED":
            return {
                ...state,
                reviews: action.payload,
                isReviewPending: false,
            }
        case "REVIEW_FETCHING_ERROR":
            return {
                ...state,
                error: "error",
                isReviewPending: false,
            }
        default:
            return state
    }
}

export default reviewReducer;