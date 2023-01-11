import React, { useEffect, useState } from 'react';
import Card from './Card';


export default function CardGroup({ reviews }) {
    const [data, setData] = useState(reviews);

    useEffect(() => {
        setData(reviews)
    }, [reviews])

    const filterData = (category) => {
        const filteredData = reviews.filter((review) => {
            return review.group === category;
        });
        setData(filteredData);
    }

    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className="flex justify-center rounded-md shadow-sm mb-2 mt-8">
                <button
                    onClick={() => setData(reviews)}
                    className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600"
                >
                    All
                </button>
                <button
                    onClick={() => filterData("movie")}
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600"
                >
                    Movies
                </button>
                <button
                    onClick={() => filterData("game")}
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600"
                >
                    Games
                </button>
                <button
                    onClick={() => filterData("book")}
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600"
                >
                    Books
                </button>
            </div>
            <div className="flex flex-wrap lg:p-6 p-4 customPadding justify-center sm:justify-start">
                {
                    data.map((elem, i) => {
                        return (
                            <Card key={i} review={elem} />
                        )
                    })
                }
            </div>
        </div>
    )
}
