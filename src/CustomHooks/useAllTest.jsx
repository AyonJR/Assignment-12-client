import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllTest = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: allTest = [], isLoading, isError, error } = useQuery({
        queryKey: ['allTest'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allTest');
            return res.data;
        }
    });

    // Return the data along with the queryClient to enable invalidation
    return [allTest, isLoading, isError, error, queryClient];
};

export default useAllTest;
