import React, { useEffect, useState } from 'react';
import { deleteUser } from '../functions/User';
import { useSelector } from 'react-redux';
import axiosUrl from '../helpers/api';
import moment from 'moment/moment';

import { BiSearch } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { toast } from 'react-toastify';
import { DotLoader } from 'react-spinners';


export default function UsersList() {
    const { auth } = useSelector((state) => state.authReducer);
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllUsers();
    }, [])

    const getAllUsers = async () => {
        try {
            setLoading(true);
            const { data } = await axiosUrl.get(
                `/allUsers`,
                {
                    headers: {
                        Authorization: `AA ${auth.token}`,
                    },
                }
            );
            setLoading(false);
            if (data.ok === false) {
                toast("No users")
            } else {
                setUsers(data);
            }
        } catch (error) {
            setLoading(false);
            toast(error.response?.data?.message)
        }
    };

    const handleDelete = async (id) => {
        const res = await deleteUser(id, auth.token);
        if (res.status === "ok") {
            getAllUsers();
            toast(res.message);
        } else {
            toast(res);
        }
    }

    return (
        <div className='max-w-screen-xl mx-auto mt-28 p-4'>
            {
                loading ? (
                    <div className='text-center flex justify-center text-gray-900 dark:text-white'>
                        <DotLoader color='gray' loading={loading} size={40} />
                    </div>
                ) : (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-900">
                            <form className=''>
                                <div className="flex">
                                    <input
                                        type="search"
                                        id="search-dropdown"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-l-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                        placeholder="Search for users"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        <BiSearch size={20} />
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users?.map((user, i) => {
                                        return (
                                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="w-4 p-4">
                                                    <div className="flex items-center">
                                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                <th scope="row" className="flex items-center px-4 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="pl-3">
                                                        <div className="text-base font-semibold">{user.first_name + " " + user.last_name}</div>
                                                        <div className="font-normal text-gray-500">{user.username}</div>
                                                    </div>
                                                </th>
                                                <td className="px-4 py-2">
                                                    {user.email}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {moment(user.createdAt).format("lll")}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className='flex gap-2'>
                                                        <button type="button" className="px-2 py-1">
                                                            <AiFillEdit color='#2493ff' size={22} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(user._id)}
                                                            type="button"
                                                            className="px-3 py-2"
                                                        >
                                                            <AiFillDelete color='#ed5e68' size={22} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }

            {/* <nav className="flex items-center flex-col sm:flex-row gap-2 sm:gap-0 justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                <ul className="inline-flex items-center -space-x-px">
                    <li>
                        <a href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                    </li>
                    <li>
                        <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                    </li>
                    <li>
                        <a href="#" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                    </li>
                </ul>
            </nav> */}
        </div>
    )
}
