import React from 'react';
import { Link } from 'react-router-dom';


export default function Card({ review }) {

    const wordLimit = (words, num) => {
        if (words.length > num) {
            return words.substring(0, num) + '...';
        }
        return words;
    }

    return (
        <div id={review._id} className='p-2 w-1/1 sm:w-1/2 sm:p-6 lg:1/2 md:w-1/3 md:p-1 lg:p-4'>
            <div className=" bg-white dark:bg-gray-800 dark:border-gray-700 p-6 container mx-auto max-w-sm rounded-2xl overflow-hidden shadow-xl dark:shadow-xl hover:shadow-2xl dark:hover:shadow-2xl transition duration-300">
                <Link to={`/review/${review._id}`} className='text-center'>
                    {
                        review.images && review.images.length ?
                            review.images.slice(0, 1).map((image, i) => (
                                <img src={image.url} key={i} alt="" className="rounded-lg text-center" />
                            ))
                            :
                            <img src="https://res.cloudinary.com/dvn9cqdgy/image/upload/v1673302894/no_image.png" alt="" className="rounded-lg text-center" />
                    }
                </Link>
                <div>
                    <Link to={`/review/${review._id}`}>
                        <div className='lg:flex justify-between'>
                            <h5 className="font-semibold tracking-tight text-blue-500">{wordLimit(review.content_name, 14)}</h5>
                            <p>
                                <span className="text-xs text-gray-900 dark:text-white">GROUP: </span>
                                <span className="text-sm font-bold text-blue-500 uppercase">{review.group}</span>
                            </p>
                        </div>
                        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{wordLimit(review.review_title, 15)}</h5>
                    </Link>
                    <div className="flex items-center mt-2.5">
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{review.grade}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
