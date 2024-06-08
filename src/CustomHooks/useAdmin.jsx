import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Pages/Provider/AuthProvider";

const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data : isAdmin} = useQuery({
        queryKey : [user?.email , 'isAdmin'] ,
        queryFn: async()=> {
            const res = await axiosSecure.get(`/loginUsers/admin/${user.email}`)
            console.log(res.data)
            return res.data?.admin
        }
    })
    return [isAdmin]
};

export default useAdmin;