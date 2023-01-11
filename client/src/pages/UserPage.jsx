import React from 'react';
import CardGroup from '../components/Cards/CardGroup';


export default function UserPage() {
    return (
        <div className='max-w-screen-xl mx-auto mt-28 p-4'>
            <div className="flex flex-col min-w-0 break-words mb-6">
                <div className="text-center">
                    <h1 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Hight SCORE</h1>
                    <p className="text-md text-gray-500 dark:text-gray-00 mb-2">@username</p>
                    <p className="text-lg text-gray-500 dark:text-gray">email@username</p>
                </div>
                <div className="flex justify-center py-4 pt-8">
                    <div className="mr-4 p-3 text-center text-gray-900 dark:text-white">
                        <span className="text-xl font-bold block uppercase tracking-wide">
                            22
                        </span>
                        <span className="text-sm">Post Reviews</span>
                    </div>
                    <div className="mr-4 p-3 text-center text-gray-900 dark:text-white">
                        <span className="text-xl font-bold block uppercase tracking-wide">
                            10
                        </span>
                        <span className="text-sm">Vote Reviews</span>
                    </div>
                </div>
                <ul className="text-md font-medium text-gray-500 flex dark:text-gray-400 justify-center">
                    <li className="">
                        <button className="p-4 text-gray-900 bg-gray-100 rounded-l-lg active dark:bg-gray-700 dark:text-white" aria-current="page">Post Review</button>
                    </li>
                    <li className="">
                        <button className="p-4 bg-white rounded-r-lg hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Vote Review</button>
                    </li>
                </ul>
            </div>
            <CardGroup />
        </div>
    )
}
