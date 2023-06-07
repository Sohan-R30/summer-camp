import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,

})

const useAxiosSecure = () => {
    const { logOutUser } = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.request.use((req) => {
            const token = localStorage.getItem("access-token");
            if (token) {
                req.headers.Authorization = `Bearer ${token}`
            }
            return req;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await logOutUser();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );
    }, [logOutUser, navigate]);

    return [axiosSecure];
};

export default useAxiosSecure;