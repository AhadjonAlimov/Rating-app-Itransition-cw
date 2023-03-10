import React from 'react'


export default function Dropdown({ dropDownOpen, dropdownId, titleIcon, title, children }) {
    return (
        <div className="relative">
            <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
            >
                <div className="flex items-center">
                    {titleIcon}
                    <p>{title}</p>
                </div>
                <svg
                    className="w-4 h-4 ml-1"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </button>
            {/* Dropdown menu */}
            <div
                id="dropdownNavbar"
                className={`z-10 font-normal bg-white divide-y divide-gray-100 rounded w-max shadow dark:bg-gray-700 dark:divide-gray-600 absolute ${dropDownOpen === dropdownId ? "block" : "hidden"}`}
            >
                <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                >
                    {children}
                </ul>
            </div>
        </div>
    );
}