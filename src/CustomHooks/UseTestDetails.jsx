// UseTestDetails.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UseTestDetails = (id) => {
    return useQuery(['test', id], async () => {
        const { data } = await axios.get(`http://localhost:5000/allTest/${id}`);
        return data;
    });
};

export default UseTestDetails;
