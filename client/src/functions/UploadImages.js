import axiosUrl from "../helpers/api";


export const uploadImages = async (formData, path, token) => {
    try {
        const { data } = await axiosUrl.post(
            `/uploadImages`,
            formData,
            {
                headers: {
                    Authorization: `AA ${token}`,
                    "content-type": "multipart/form-data",
                },
            }
        );
        return data;
    } catch (error) {
        return error.response.data.message;
    }
};