import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { uploadImages } from '../../functions/UploadImages';
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { createContentReview } from '../../functions/Review';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from "react-toastify";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import DotLoader from "react-spinners/DotLoader";


const colors = {
    orange: "#facc15",
    grey: "#a9a9a9"
};

export default function CreateReviewModal({ user, showCreateReview, setShowCreateReview, public_id }) {
    const { reviews } = useSelector((state) => state.reviewReducer);
    const dispatch = useDispatch();
    const [reviewInfo, setReviewInfo] = useState({
        review_title: "",
        review_text: "",
        content_name: "",
        group: "",
        tags: [],
        grade: 0,
    })
    const [images, setImages] = useState(null);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const stars = Array(10).fill(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewInfo({ ...reviewInfo, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reviewInfo.grade > 0) return toast("Please rate this content.")
        if (images) {
            setLoading(true);
            const postImages = await dataURItoBlob(images);
            const path = `${user.username}/review_images`;
            let formData = new FormData();
            formData.append("path", path);
            formData.append("file", postImages);
            const response = await uploadImages(formData, path, user.token);
            const res = await createContentReview(
                reviewInfo,
                user.id,
                user.token,
                response,
                public_id
            );
            setLoading(false);
            if (res.status === "ok") {
                dispatch({
                    type: "REVIEW_FETCHED",
                    payload: [res.data, ...reviews],
                });
                setReviewInfo({
                    review_title: "",
                    review_text: "",
                    content_name: "",
                    group: "",
                    tags: [],
                    grade: 0,
                });
                setImages(null);
                setShowCreateReview(false)
            } else {
                toast(res);
            }
        } else if (!images) {
            setLoading(true);
            const response = await createContentReview(
                reviewInfo,
                user.id,
                user.token,
                null,
                public_id
            );
            setLoading(false);
            if (response.status === "ok") {
                dispatch({
                    type: "REVIEW_FETCHED",
                    payload: [response.data, ...reviews],
                });
                setReviewInfo({
                    review_title: "",
                    review_text: "",
                    content_name: "",
                    group: "",
                    tags: [],
                    grade: 0,
                });
                setImages(null);
                setShowCreateReview(false)
            } else {
                toast(response);
            }
        } else {
            console.log("nothing");
        }
    }

    const handleImageChange = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (readerEvent) => {
            setImages(readerEvent.target.result);
        };
    }

    const handleTypeError = (error) => {
        toast(error);
    }

    return (
        <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className={`${showCreateReview ? "" : "hidden"} h-screen fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center`}
        >
            <div className="relative w-full h-full max-w-lg md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-hide="authentication-modal"
                        onClick={() => setShowCreateReview(false)}
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-4 py-6 md:px-6">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create Review</h3>
                        <form className="space-y-2" action="#" onSubmit={handleSubmit}>
                            <div className='flex gap-2'>
                                <div className='w-full'>
                                    <label htmlFor="content_name" className="block text-sm font-medium text-gray-900 dark:text-white">Content name</label>
                                    <input
                                        type="text"
                                        name="content_name"
                                        id="content_name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Content name"
                                        required
                                        value={reviewInfo.content_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="review_title" className="block text-sm font-medium text-gray-900 dark:text-white">Review title</label>
                                    <input
                                        type="text"
                                        name="review_title"
                                        id="review_title"
                                        placeholder="Review title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required
                                        value={reviewInfo.review_title}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="review_text" className="block text-sm font-medium text-gray-900 dark:text-white">Review text</label>
                                <textarea
                                    type="text"
                                    name="review_text"
                                    id="review_text"
                                    placeholder="Review text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                    rows="5"
                                    value={reviewInfo.review_text}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='flex gap-2'>
                                <div className='w-full'>
                                    <select
                                        id="tags"
                                        name="tags"
                                        required
                                        onChange={handleChange}
                                        value={reviewInfo?.tags.toString()}
                                        multiple={false}
                                        className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    >
                                        <option value="">Choose a tag</option>
                                        <option value="best">Best</option>
                                        <option value="bestseller">Bestseller</option>
                                        <option value="worst">Worst</option>
                                    </select>
                                </div>
                                <div className='w-full'>
                                    <select
                                        id="group"
                                        name="group"
                                        required
                                        onChange={handleChange}
                                        value={reviewInfo.group}
                                        multiple={false}
                                        className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    >
                                        <option value="">Choose a group</option>
                                        <option value="movie">Movie</option>
                                        <option value="game">Game</option>
                                        <option value="book">Book</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="grade" className="block text-sm font-medium text-gray-900 dark:text-white">Rate content</label>
                                <div className='flex gap-1'>
                                    {
                                        stars.map((_, index) => {
                                            return (
                                                <FaStar
                                                    key={index}
                                                    id="grade"
                                                    name='grade'
                                                    size={24}
                                                    onClick={() => setReviewInfo({ ...reviewInfo, grade: index + 1 })}
                                                    onMouseOver={() => setHoverValue(index + 1)}
                                                    onMouseLeave={() => setHoverValue(undefined)}
                                                    color={(hoverValue || reviewInfo.grade) > index ? colors.orange : colors.grey}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <br />
                            {
                                images ? (
                                    <div className='flex justify-center relative'>
                                        <div className='w-1/3'>
                                            <img src={images} alt="" />
                                        </div>
                                        <button
                                            type="button"
                                            className="absolute top-0 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                            onClick={() => setImages(null)}
                                        >
                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                ) : (
                                    <FileUploader
                                        handleChange={handleImageChange}
                                        onTypeError={handleTypeError}
                                        types={["jpg", "jpeg", "png", "gif", "webp"]}
                                    >
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="p-2 flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500 dark:text-gray-400">
                                                    <AiOutlineCloudUpload size={24} />
                                                    <p className="text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs">JPG, PNG, or GIF (MAX 1280x720px & 5 MB)</p>
                                                </div>
                                            </label>
                                        </div>
                                    </FileUploader>
                                )
                            }
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                disabled={loading}
                            >
                                {!loading ? "CREATE" : <DotLoader color='white' loading={loading} size={14} />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
