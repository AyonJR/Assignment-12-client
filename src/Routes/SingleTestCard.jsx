import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";

const SingleTestCard = ({ test }) => {
    const { _id, image, name, details, price, slots } = test;

    return (
        <motion.div
            key={_id}
            className="border rounded-md overflow-hidden bg-white shadow-lg"
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative">
                <img src={image} alt={name} className="w-full h-40 object-cover rounded-t-md" />
                <div className="absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 rounded-br-md">
                    New
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{name}</h3>
                <p className="text-gray-600 mb-4">{details}</p>
                <div className="flex justify-between items-center">
                    <p className="text-gray-800 font-semibold">${price}</p>
                    <p className="text-gray-800">Slots: {slots}</p>
                </div>
                <div className="flex justify-center mt-4">
                    <Link
                        to={`/test/${_id}`}
                        className="btn bg-blue-500 text-white font-semibold flex items-center px-4 py-2"
                    >
                        <FaInfoCircle className="mr-2" />
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default SingleTestCard;
