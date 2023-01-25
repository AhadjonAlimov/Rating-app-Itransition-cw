import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../../functions/User';
import { useSelector } from 'react-redux';

import ModalWrapper from './ModalWrapper';


export default function SearchModal({ isOpen, setIsOpen }) {
    const { auth } = useSelector((state) => state.authReducer);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const input = useRef(null);


    const searchHandler = async () => {
        if (searchTerm === "") {
            setResults([]);
        } else {
            const res = await search(searchTerm, auth?.token);
            setResults(res);
        }
    };

    return (
        <ModalWrapper
            customCLass="max-w-lg"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className="px-4 py-6 md:px-6  ">
                <div className='relative' id="search-modal">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input
                            // ref={input}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyUp={searchHandler}
                            type="search"
                            id="default-search"
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required
                        />
                    </div>
                </div>
                <div className='overflow-y-auto h-96'>
                    {
                        results?.map((res, i) => {
                            return (
                                <div key={i} onClick={() => {
                                    setIsOpen(false);
                                    setSearchTerm("");
                                    setResults([])
                                }} className="w-full p-4 text-gray-900 border-y overflow-y-auto border-gray-300 dark:border-gray-600 dark:text-gray-300" role="alert">
                                    <Link to={`/review/${res._id}`} className="flex items-center">
                                        {
                                            res.images && res.images.length ?
                                                res?.images.slice(0, 1).map((image, i) => (
                                                    <img src={image?.url} key={i} alt="" className="w-28 rounded-lg" />
                                                ))
                                                :
                                                <img src="https://res.cloudinary.com/dvn9cqdgy/image/upload/v1673302894/no_image.png" alt="" className="rounded-lg text-center" />
                                        }
                                        <div className="ml-3 text-sm font-normal">
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{res.review_title}</div>
                                            <div className="text-sm font-normal">{res.review_text}</div>
                                            <span className="text-xs font-medium text-blue-600 dark:text-blue-500">GROUP: {res.group}</span>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </ModalWrapper>
    )
}
