import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import axios from 'axios';
const useClasses = () => {
    const { user, userLoading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes', user?.email],
        enabled: !userLoading,
        queryFn: async () => {
            const res = await axiosSecure(`/classes/${user?.email}`)
            return res.data;
        },
    })

    return [classes, refetch]

}
export default useClasses;


export const useAllClasses = () => {
    const { data: allClasses = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_API_URL}/allClasses`)
            return res.data;
        },
    })
    return [allClasses, refetch]

}
