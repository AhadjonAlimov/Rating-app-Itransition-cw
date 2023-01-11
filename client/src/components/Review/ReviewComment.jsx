import React, { useState } from 'react';
import moment from 'moment/moment';

import { AiFillStar, AiFillHeart, AiOutlineHeart } from "react-icons/ai";


const colors = {
    orange: "#facc15",
    grey: "#a9a9a9",
};

export default function ReviewComment({ reviewComments, comment, type }) {
    const [data, setData] = useState({
        first_name: type === "review" ? reviewComments.review_creator.first_name : comment.comment_creator.first_name,
        last_name: type === "review" ? reviewComments.review_creator.last_name : comment.comment_creator.last_name,
        username: type === "review" ? reviewComments.review_creator.username : comment.comment_creator.username,
        grade: type === "review" ? reviewComments.grade : comment.grade,
        title: type === "review" ? reviewComments.review_title : comment.comment_title,
        text: type === "review" ? reviewComments.review_text : comment.comment_text,
        createdAt: type === "review" ? reviewComments.createdAt : comment.createdAt,
        likes: type === "review" ? reviewComments.createdAt : comment.createdAt,
        likes: type === "review" ? reviewComments.users_likes : comment.comment_likes,
    })

    const stars = (num) => {
        return Array(num).fill(0);
    }

    return (
        <article className='border-t border-gray-300 dark:border-gray-600 py-6'>
            <div className="flex items-center mb-4 space-x-4">
                <div className="space-y-1 font-medium dark:text-white">
                    <p>
                        {data.first_name + " " + data.last_name}
                        <span className="block text-sm text-gray-500 dark:text-gray-400">
                            {data.username}
                        </span>
                    </p>
                </div>
            </div>
            <div className=" mb-1">
                <div className='flex items-center'>
                    {
                        stars(type === "review" ? 10 : 5).map((_, index) => {
                            return (
                                <AiFillStar
                                    key={index}
                                    id="grade"
                                    name='grade'
                                    color={data.grade > index ? colors.orange : colors.grey}
                                />
                            )
                        })
                    }
                    <p className="ml-2 text-md font-medium text-gray-500 dark:text-gray-400">{data.grade}/{type === "review" ? 10 : 5}</p>
                </div>
                <h3 className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{data.title}</h3>
            </div>
            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>{moment(data.createdAt).format('lll')}</p></footer>
            <p className="mb-2 font-light text-gray-500 dark:text-gray-400">{data.text}</p>
            {false && <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read full review</a>}
            <aside>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{data.likes.length} people liked</p>
                <button className='mt-2'>
                    {false ? <AiFillHeart color='red' size={24} /> : <AiOutlineHeart className='text-gray-500 dark:text-white' size={24} />}
                </button>
            </aside>
        </article>
    )
}
