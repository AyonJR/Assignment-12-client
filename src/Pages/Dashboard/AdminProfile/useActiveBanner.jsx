import { useState, useEffect } from 'react';
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const useActiveBanner = () => {
    const [banner, setBanner] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchActiveBanner = async () => {
            try {
                const response = await axiosSecure.get('/activeBanner');
                setBanner(response.data);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchActiveBanner();
    }, [axiosSecure]);

    return { banner, isLoading, isError };
};

export default useActiveBanner;
