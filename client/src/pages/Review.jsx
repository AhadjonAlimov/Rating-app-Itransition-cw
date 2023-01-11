import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosUrl from '../helpers/api';

import ReviewHeader from '../components/Review/ReviewHeader';
import ReviewList from '../components/Review/ReviewList';
import { toast } from 'react-toastify';
import DotLoader from "react-spinners/DotLoader";


export default function Review() {
    const { auth } = useSelector((state) => state.authReducer);
    const { reviewPage } = useSelector((state) => state.reviewPageReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getReview();
    }, [id]);

    const getReview = async () => {
        try {
            setLoading(true);
            const { data } = await axiosUrl.get(
                `/getreview/${id}`,
                {
                    headers: {
                        Authorization: `AA ${auth.token}`,
                    },
                }
            );
            setLoading(false);
            if (data.ok === false) {
                navigate("/");
            } else {
                dispatch({
                    type: "REVIEW_PAGE_FETCHED",
                    payload: data,
                })
            }
        } catch (error) {
            setLoading(false);
            navigate("/");
            toast(error.response?.data?.message)
        }
    };

    return (
        <div className='max-w-screen-xl mx-auto mt-28'>
            {
                loading ? (
                    <div className='text-center flex justify-center text-gray-900 dark:text-white'>
                        <DotLoader color='gray' loading={loading} size={40} />
                    </div>
                ) : (
                    <>
                        <ReviewHeader reviewData={reviewPage} comments={reviewPage?.comments} />
                        <ReviewList critics={reviewPage?.critics} comments={reviewPage?.comments} reviewId={id} />
                    </>
                )
            }
        </div>
    )
}
