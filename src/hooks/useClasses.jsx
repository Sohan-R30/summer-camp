import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
const useClasses = () => {
    const { user, userLoading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes', user?.email],
        enabled: !userLoading,
        queryFn: async () => {
            const res = await axiosSecure(`/classes/${user?.email}`)
            console.log(res)
            return res.data;
        },
    })

    return [classes, refetch]

}
export default useClasses;
