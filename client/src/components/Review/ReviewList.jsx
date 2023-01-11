import React from 'react';
import { Link } from 'react-router-dom';

import ReviewComment from './ReviewComment';


export default function ReviewList({ critics, comments, reviewId }) {

    return (
        <div className='flex flex-col md:flex-row p-4'>
            <div className='md:w-1/2 my-4'>
                <h1 className="mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Critic Reviews</h1>
                {
                    critics?.slice(0, 3).map((criticReview, i) => {
                        return (
                            <ReviewComment key={i} reviewComments={criticReview} type="review" />
                        )
                    })

                }
                {
                    // critics?.length > 3
                    false && (
                        <Link
                            to={`/review/review/${reviewId}`}
                            className="w-full block text-center text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
                        >
                            Read all {critics?.length} reviews
                        </Link>
                    )
                }
            </div>

            <div className='hidden md:block md:p-8'></div>

            <div className='md:w-1/2 my-4'>
                <h1 className="mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">User Reviews</h1>
                {
                    comments?.slice(0, 3).map((comment, i) => {
                        return (
                            <ReviewComment key={i} comment={comment} type="comment" />
                        )
                    })
                }
                {
                    // critics?.length > 3
                    false && (
                        <Link
                            to={`/review/comments/${reviewId}`}
                            className="w-full block text-center text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
                        >
                            Read all {comments?.length} reviews
                        </Link>
                    )
                }

            </div>
        </div>
    )
}
