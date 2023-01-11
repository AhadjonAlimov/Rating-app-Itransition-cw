import React from "react";


export default function DropdownItem({ title }) {
    return (
        <li>
            <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
            >
                {title}
            </a>
        </li>
    );
}
