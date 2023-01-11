import React from 'react';
import { AiFillStar } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewComment from '../components/Review/ReviewComment';


export default function ReviewListPage() {
    // const { reviewPage } = useSelector((state) => state.reviewPageReducer);
    // const {type} = useParams;

    return (
        <div className='max-w-screen-xl mx-auto mt-28 p-4'>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Movie title: <span className="mb-2 text-3xl font-bold tracking-tight text-blue-500">Movie Name</span></h1>
            <div className='flex flex-col md:flex-row py-4 border-t border-gray-300 dark:border-gray-600'>
                <div className="flex justify-between md:w-1/2 mb-4">
                    <div>
                        <h1 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">CRITIC SCORE</h1>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Average reviews based on 52 critic reviews</p>
                    </div>
                </div>

                <div className='hidden md:block md:p-4'></div>

                <div className='md:w-1/2'>
                    <div className="flex items-center mb-3">
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">4.95 out of 5</p>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
                    <div className="mt-4">
                        <div className="w-full h-2 bg-gray-200 rounded dark:bg-gray-700">
                            <div className="h-2 bg-yellow-400 rounded" style={{ width: "70%" }}></div>
                        </div>
                        <div className='w-full flex items-center justify-between'>
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-500">POSITIVE:</span>
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-500">70%</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="w-full h-2 bg-gray-200 rounded dark:bg-gray-700">
                            <div className="h-2 bg-yellow-400 rounded" style={{ width: "17%" }}></div>
                        </div>
                        <div className='w-full flex items-center justify-between'>
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-500">AVERAGE:</span>
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-500">17%</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="w-full h-2 bg-gray-200 rounded dark:bg-gray-700">
                            <div className="h-2 bg-yellow-400 rounded" style={{ width: "8%" }}></div>
                        </div>
                        <div className='w-full flex items-center justify-between'>
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-500">NEGATIVE:</span>
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-500">8%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-8'>
                <h1 className="mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Critic Reviews</h1>
                {/* {
                    [1, 2, 3].map((t) => {
                        return (
                            <ReviewComment />
                        )
                    })
                } */}
            </div>
        </div>
    )
}
