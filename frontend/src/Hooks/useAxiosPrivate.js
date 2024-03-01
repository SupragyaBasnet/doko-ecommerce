import { axiosPrivate } from "../API/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = ()=>{
     const {auth} = useAuth();

    useEffect(()=>{
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization'] && auth?.accessToken){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        // const responseInterceptors = axiosPrivate.interceptors.response.use();

        return ()=>{
            axiosPrivate.interceptors.request.eject(requestInterceptor)
        }
    },[auth]);

     return axiosPrivate;
}

export default useAxiosPrivate;