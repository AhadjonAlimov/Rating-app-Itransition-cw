import React, { useState } from 'react';
import { createCommentReview } from '../../functions/Review';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import DotLoader from "react-spinners/DotLoader";


const colors = {
    orange: "#facc15",
    grey: "#a9a9a9"
};

export default function ReviewCommentModal({ user, showCommentModal, setShowCommentModal, reviewId }) {
    const { reviews } = useSelector((state) => state.reviewReducer);
    const dispatch = useDispatch();
    const [userReviewInfo, setUserReviewInfo] = useState({
        comment_title: "",
        comment_text: "",
        grade: 0,
    })
    const [hoverValue, setHoverValue] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const stars = Array(5).fill(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserReviewInfo({ ...userReviewInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userReviewInfo.grade > 0) return toast("Please rate this content.")

        setLoading(true);
        const response = await createCommentReview(
            userReviewInfo,
            user.id,
            user.token,
            reviewId,
        );
        setLoading(false);
        if (response.status === "ok") {
            dispatch({
                type: "REVIEW_FETCHED",
                payload: [response.data, ...reviews],
            });
            setUserReviewInfo({
                comment_title: "",
                comment_text: "",
                grade: 0,
            });
            setShowCommentModal(false);
        } else {
            toast(response);
        }

    }

    return (
        <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className={`${showCommentModal ? "" : "hidden"} h-screen fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center`}
        >
            <div className="relative w-full h-full max-w-lg md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-hide="authentication-modal"
                        onClick={() => setShowCommentModal(false)}
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-4 py-6 md:px-6">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create Comment</h3>
                        <form className="space-y-2" action="#" onSubmit={handleSubmit}>
                            <div className='flex gap-2'>
                                <div className='w-full'>
                                    <label htmlFor="review_title" className="block text-sm font-medium text-gray-900 dark:text-white">Comment title</label>
                                    <input
                                        type="text"
                                        name="comment_title"
                                        id="comment_title"
                                        placeholder="Comment title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required
                                        value={userReviewInfo.comment_title}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="review_text" className="block text-sm font-medium text-gray-900 dark:text-white">Comment text</label>
                                <textarea
                                    type="text"
                                    name="comment_text"
                                    id="comment_text"
                                    placeholder="Comment text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                    rows="5"
                                    value={userReviewInfo.comment_text}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="grade" className="block text-sm font-medium text-gray-900 dark:text-white">Rate review</label>
                                <div className='flex gap-1'>
                                    {
                                        stars.map((_, index) => {
                                            return (
                                                <FaStar
                                                    key={index}
                                                    id="grade"
                                                    name='grade'
                                                    size={24}
                                                    onClick={() => setUserReviewInfo({ ...userReviewInfo, grade: index + 1 })}
                                                    onMouseOver={() => setHoverValue(index + 1)}
                                                    onMouseLeave={() => setHoverValue(undefined)}
                                                    color={(hoverValue || userReviewInfo.grade) > index ? colors.orange : colors.grey}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <br />
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                disabled={loading}
                            >
                                {!loading ? "CREATE" : <DotLoader color='white' loading={loading} size={14} />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
