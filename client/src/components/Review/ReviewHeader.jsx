import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';

import { AiFillStar, AiFillHeart, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import CreateReviewModal from '../Modals/CreateReviewModal';
import ReviewCommentModal from '../Modals/ReviewCommentModal';

const colors = {
    orange: "#facc15",
    grey: "#a9a9a9"
};

export default function ReviewHeader({ reviewData, comments }) {
    const { auth } = useSelector((state) => state.authReducer);
    const [reviewInfo, setReviewInfo] = useState(reviewData?.review || [])
    const [criticsInfo, setCriticsInfo] = useState(reviewData?.critics || [])
    const [showCreateReview, setShowCreateReview] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);

    const averageGrade = (value, obj, count) => {
        let val = value;
        let countRating = count;
        obj?.map((elem, i) => {
            val += elem.grade
            countRating += 1
        })
        return (val / countRating).toFixed(1);
    }
    
    const stars = (num) => {
        return Array(num).fill(0);
    }

    return (
        <>
            <div href="#" className="flex flex-col md:flex-row md:mb-6">
                <div className='p-4 md:w-2/4 flex'>
                    {
                        reviewInfo.images && reviewInfo.images.length ?
                            reviewInfo?.images.slice(0, 1).map((image, i) => (
                                <img src={image?.url} key={i} alt="" className="rounded-lg text-center" />
                            ))
                            :
                            <img src="https://res.cloudinary.com/dvn9cqdgy/image/upload/v1673302894/no_image.png" alt="" className="rounded-lg text-center" />
                    }
                </div>
                <div className="p-4 md:w-2/4">
                    <div className='flex flex-col leading-normal'>
                        <h1 className="mb-2 text-3xl font-bold tracking-tight text-blue-500">{reviewInfo?.content_name}</h1>
                        <div className='flex justify-between py-4 border-t border-gray-300 dark:border-gray-600'>
                            <div>
                                <h1 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">CRITIC SCORE</h1>
                                <p className="font-normal text-gray-700 dark:text-gray-400">Average reviews based on {criticsInfo?.length + 1} critic reviews</p>
                            </div>
                            <div className="flex items-end">
                                <AiFillStar size={28} className="text-yellow-400" />
                                <p className="ml-2 text-lg font-medium text-gray-500 dark:text-gray-400">{averageGrade(reviewInfo?.grade, criticsInfo, 1)}/10</p>
                            </div>
                        </div>

                        <div className='flex justify-between py-4 border-t border-gray-300 dark:border-gray-600'>
                            <div>
                                <h1 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">USER SCORE</h1>
                                <p className="font-normal text-gray-700 dark:text-gray-400">Average reviews based on {comments?.length} ratings</p>
                            </div>
                            <div className="flex items-end">
                                <AiFillStar size={28} className="text-yellow-400" />
                                <p className="ml-2 text-lg font-medium text-gray-500 dark:text-gray-400">{comments && comments.length ? averageGrade(0, comments, 0) : 0}/5</p>
                            </div>
                        </div>

                        <div className='flex justify-between py-4 border-t border-gray-300 dark:border-gray-600'>
                            <div>
                                <p className="font-normal text-gray-700 dark:text-gray-400 pb-2">Create your own Review to this content or Vote this review</p>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateReview(true)}
                                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    >
                                        CREATE OWN
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowCommentModal(true)}
                                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    >
                                        VOTE THIS
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-4'>
                <div className="flex items-center mb-4">
                    <button>
                        {false ? <AiFillHeart color='red' size={32} /> : <AiOutlineHeart className='text-gray-500 dark:text-white' size={32} />}
                    </button>
                    <p className="ml-2 text-lg font-medium text-gray-500 dark:text-gray-400">{reviewInfo?.users_likes?.length}</p>
                </div>
                <div className='mb-4'>
                    <span className="text-md tracking-tight text-gray-900 dark:text-white">TAGS: </span>
                    {reviewInfo?.tags?.map((tag, i) => {
                        return (
                            <span
                                key={i}
                                className="uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-3 py-1 mx-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            >
                                {tag}
                            </span>
                        )
                    })}
                </div>
                <div className=''>
                    <span className="text-md tracking-tight text-gray-900 dark:text-white mb-2">GROUP: </span>
                    <span className="text-lg tracking-tight font-bold text-blue-500 uppercase">{reviewInfo?.group}</span>
                    <p className="text-md font-medium text-gray-500 dark:text-gray-400 mb-2">{moment(reviewInfo?.createdAt).format('lll')}</p>
                    <h4 className='text-lg tracking-tight text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
                        <AiOutlineUser /> {reviewInfo?.review_creator?.first_name + ' ' + reviewInfo?.review_creator?.last_name}
                        <span className='text-md text-sm text-gray-500 dark:text-gray-400'>{reviewInfo?.review_creator?.username}</span>
                    </h4>
                    <div className="flex items-end">
                        {
                            stars(10).map((_, index) => {
                                return (
                                    <AiFillStar
                                        key={index}
                                        id="grade"
                                        name='grade'
                                        size={30}
                                        color={reviewInfo?.grade > index ? colors.orange : colors.grey}
                                    />
                                )
                            })
                        }
                        <p className="ml-2 text-lg font-medium text-gray-500 dark:text-gray-400">{reviewInfo?.grade}/10</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row p-4">
                <div className='flex flex-col leading-normal'>
                    <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{reviewInfo?.review_title}</h1>
                    <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-300">{reviewInfo?.review_text} dwadoiawjdawdaw op wjapo japojf aeopfjopjoejfaeoj[ffopaj </p>
                </div>
            </div>
            <CreateReviewModal
                user={auth}
                showCreateReview={showCreateReview}
                setShowCreateReview={setShowCreateReview}
                public_id={reviewInfo?.public_id}
            />
            <ReviewCommentModal
                user={auth}
                showCommentModal={showCommentModal}
                setShowCommentModal={setShowCommentModal}
                reviewId={reviewInfo?._id}
            />
        </>
    )
}
