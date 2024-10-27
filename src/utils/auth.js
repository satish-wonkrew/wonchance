import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/slices/authSlice";

// Function to check auth status and set user data in redux
export const checkAuthStatus = async (dispatch, token) => {
    if (token) {
        try {
            const response = await axios.get(`${USER_API_END_POINT}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch(setUser(response.data.user));
        } catch (error) {
            console.error("Authentication failed:", error.message);
            dispatch(setUser(null));
        }
    } else {
        dispatch(setUser(null));
    }
};

export const getToken = () => {
    return localStorage.getItem('token');
};