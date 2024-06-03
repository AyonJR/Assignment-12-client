import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllTest = () => {
    
    const axiosSecure = useAxiosSecure();
    const { data: allTest = [], isLoading, isError, error } = useQuery({
        queryKey: ['allTest'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allTest');
            return res.data;
        }
    });

    return [allTest, isLoading, isError, error];
};

export default useAllTest;
