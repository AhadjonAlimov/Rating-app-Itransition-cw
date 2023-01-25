import axiosUrl from "../helpers/api";


export const search = async (searchTerm, token) => {
    try {
        const { data } = await axiosUrl.post(
            `/search/${searchTerm}`,
            {},
        );
        return data;
    } catch (error) {
        return error.response.data.message;
    }
};

export const deleteUser = async (user_id, token) => {
    try {
        const { data } = await axiosUrl.delete(
            `/deleteuser/${user_id}`,
            {
                headers: {
                    Authorization: `AA ${token}`,
                },
            }
        );
        return data;
    } catch (error) {
        return error.response.data.message;
    }
};
