import React from 'react';
import CardGroup from '../components/Cards/CardGroup';
import DotLoader from "react-spinners/DotLoader";


export default function Home({ reviews, isReviewPending }) {
    return (
        <div className='mt-24'>
            {
                isReviewPending ? (
                    <div className='text-center flex justify-center text-gray-900 dark:text-white'>
                        <DotLoader color='gray' loading={isReviewPending} size={40} />
                    </div>
                ) : (
                    reviews.length ?
                        <CardGroup reviews={reviews} />
                        :
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            No reviews
                        </h1>
                )
            }
        </div>
    )
}
