import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

import { BiSun, BiMoon, BiDesktop, BiUser, BiSearch } from "react-icons/bi";
import { HiLanguage } from "react-icons/hi2";
import Dropdown from "./Dropdown/Dropdown";
import DropdownItem from "./Dropdown/DropdownItem";
import CreateReviewModal from "./Modals/CreateReviewModal";
import SearchModal from "./Modals/SearchModal";


export default function Navbar() {
    const { auth } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [navOpen, setNavOpen] = useState(false);
    const [dropDownOpen, setDropDownOpen] = useState("");
    const [showCreateReview, setShowCreateReview] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
    );
    const element = document.documentElement;
    const checkDark = window.matchMedia("(prefers-color-scheme: dark)");

    const onWindowMatch = () => {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) && checkDark.matches)
        ) {
            element.classList.add("dark");
        } else {
            element.classList.remove("dark");
        }
    };
    onWindowMatch();

    useEffect(() => {
        switch (theme) {
            case "dark":
                element.classList.add("dark");
                localStorage.setItem("theme", "dark");
                break;
            case "light":
                element.classList.remove("dark");
                localStorage.setItem("theme", "light");
                break;
            default:
                localStorage.removeItem("theme");
                onWindowMatch();
                break;
        }
    }, [theme]);

    // Real time theme change from system
    checkDark.addEventListener("change", (e) => {
        if (!("theme" in localStorage)) {
            if (e.matches) {
                element.classList.add("dark");
            } else {
                element.classList.remove("dark");
            }
        }
    });

    const themeOptions = [
        {
            icon: <BiSun size={20} />,
            value: "light",
        },
        {
            icon: <BiMoon size={20} />,
            value: "dark",
        },
        {
            icon: <BiDesktop size={20} />,
            value: "system",
        },
    ];

    const handleLogout = () => {
        Cookies.remove("auth");
        dispatch({ type: "AUTH_FETCHED", payload: null });
        navigate("/login");
    }

    return (
        <nav className="fixed top-0 w-full px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 z-40">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-1">
                <a href="/" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Reviewer
                    </span>
                </a>
                <button
                    data-collapse-toggle="navbar-dropdown"
                    type="button"
                    className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-dropdown"
                    aria-expanded="false"
                    onClick={() => setNavOpen(!navOpen)}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div
                    className={`${navOpen ? "block" : "hidden"
                        } w-full md:block md:w-auto`}
                    id="navbar-dropdown"
                >
                    <ul className="flex flex-col p-1.5 md:items-center mt-4 border border-gray-100 rounded-lg bg-gray-50 space-y-2 md:space-y-0 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li
                            className="bg-gray-100 dark:bg-slate-800 duration-100 rounded"
                            onClick={() =>
                                setDropDownOpen(dropDownOpen === "theme" ? "" : "theme")
                            }
                        >
                            <Dropdown
                                dropDownOpen={dropDownOpen}
                                titleIcon={
                                    theme === "system" ? (
                                        checkDark.matches ? (
                                            <BiMoon size={20} />
                                        ) : (
                                            <BiSun size={20} />
                                        )
                                    ) : theme === "dark" ? (
                                        <BiMoon size={20} />
                                    ) : (
                                        <BiSun size={20} />
                                    )
                                }
                                dropdownId="theme"
                            >
                                {themeOptions.map((item, i) => (
                                    <button
                                        key={i}
                                        className={`leading-9 text-sm px-4 py-2 block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${theme === item.value && "text-sky-600"
                                            }`}
                                        onClick={() => setTheme(item.value)}
                                    >
                                        {item.icon}
                                    </button>
                                ))}
                            </Dropdown>
                        </li>
                        <li
                            onClick={() =>
                                setDropDownOpen(dropDownOpen === "language" ? "" : "language")
                            }
                        >
                            <Dropdown
                                dropDownOpen={dropDownOpen}
                                titleIcon={<HiLanguage size={20} />}
                                dropdownId="language"
                                title="EN"
                            >
                                <DropdownItem title="EN" />
                                <DropdownItem title="RU" on />
                            </Dropdown>
                        </li>
                        <li
                            onClick={() =>
                                setDropDownOpen(dropDownOpen === "account" ? "" : "account")
                            }
                        >
                            {auth ? (
                                <Dropdown
                                    dropDownOpen={dropDownOpen}
                                    titleIcon={<BiUser size={20} />}
                                    dropdownId="account"
                                >
                                    <DropdownItem title="Account" />
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                                        onClick={() => setShowCreateReview(true)}
                                    >
                                        Create
                                    </button>
                                    {
                                        auth.role === "admin" &&
                                        <Link to="/userslist" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
                                            All users
                                        </Link>
                                    }
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </button>
                                </Dropdown>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                        <li>
                            <div className="flex" onClick={() => setSearchModal(true)}>
                                <input
                                    type="search"
                                    onClick={() => setSearchModal(true)}
                                    id="search-dropdown"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-l-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                    placeholder="Search"
                                    required
                                    autoComplete="off"
                                />
                                <button
                                    type="submit"
                                    className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <BiSearch size={20} />
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <CreateReviewModal
                user={auth}
                showCreateReview={showCreateReview}
                setShowCreateReview={setShowCreateReview}
            />
            <SearchModal
                isOpen={searchModal}
                setIsOpen={setSearchModal}
            />
        </nav>
    );
}
