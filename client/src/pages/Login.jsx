import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axiosUrl from '../helpers/api';

import { toast } from 'react-toastify';
import FormInput from "../components/FormInput";
import DotLoader from "react-spinners/DotLoader";
import GoogleBtn from "../components/Buttons/Google";
import FacebookBtn from "../components/Buttons/Facebook";


export default function Login() {
    const { isAuthPending } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginInfos = {
        email: "",
        password: "",
    };
    const [login, setLogin] = useState(loginInfos);
    const { email, password } = login;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: "AUTH_FETCHING" });
            const { data } = await axiosUrl.post(
                "/login",
                {
                    email,
                    password,
                }
            );
            const { message, ...rest } = data;
            setTimeout(() => {
                dispatch({ type: "AUTH_FETCHED", payload: rest });
                Cookies.set("auth", JSON.stringify(rest));
                navigate("/");
            }, 2000);
        } catch (error) {
            dispatch({ type: "AUTH_FETCHING_ERROR" });
            console.log(error.response?.data);
            toast.error(error.response?.data.message);
            return false;
        }
    };

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    Reviewer
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Log in to your account
                        </h1>
                        <div className="flex">
                            <GoogleBtn />
                            <FacebookBtn />
                        </div>
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-800">or</span>
                        </div>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={loginSubmit}>
                            <FormInput
                                name="email"
                                label="Email"
                                placeholder="name@company.com"
                                type="email"
                                required
                                onChange={handleChange}
                            />
                            <FormInput
                                name="password"
                                label="Password"
                                placeholder="••••••••"
                                type="password"
                                required
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                disabled={isAuthPending}
                            >
                                {!isAuthPending ? "Log in" : <DotLoader color='white' loading={isAuthPending} size={14} />}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <Link
                                    to="/signup"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
