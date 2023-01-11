import axiosUrl from "../helpers/api";


export const createContentReview = async (
    reviewInfo, userId, token, response, public_id
) => {
    try {
        const { data } = await axiosUrl.post(
            `/createreview`,
            {
                ...reviewInfo,
                review_creator: userId,
                images: response,
                public_id: public_id,
            },
            {
                headers: {
                    Authorization: `AA ${token}`,
                },
            }
        );
        return { status: "ok", data };
    } catch (error) {
        console.log(error);
        return error.response.data.message;
    }
};

export const createCommentReview = async (
    userReviewInfo, userId, token, reviewId
) => {
    try {
        const { data } = await axiosUrl.post(
            `/createcomment`,
            {
                ...userReviewInfo,
                comment_creator: userId,
                review_id: reviewId,
                
            },
            {
                headers: {
                    Authorization: `AA ${token}`,
                },
            }
        );
        return { status: "ok", data };
    } catch (error) {
        console.log(error);
        return error.response.data.message;
    }
};

