import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTest = () => {

    const axiosSecure = useAxiosSecure()
    const { data : recommendations = [] } = useQuery({
        queryKey : ['recommendations'] ,
        queryFn : async()=> {
            const res = await axiosSecure.get('/recommendations')
            return res.data
        }
    })

    return [recommendations]
};

export default useTest;