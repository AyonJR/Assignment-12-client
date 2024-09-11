import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";

const SingleTestCard = ({ test }) => {
    const { _id, image, name, details, price, slots } = test;

    return (
        <motion.div
            key={_id}
            className="relative border rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative">
                <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="absolute top-4 left-4 bg-cyanCustom text-white px-3 py-1 rounded-full text-sm font-semibold">
                    New
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{name}</h3>
                <p className="text-gray-600 mb-4">{details}</p>
                <div className="flex justify-between items-center text-gray-800 mb-4">
                    <p className="text-xl font-semibold">${price}</p>
                    <p className="bg-cyanCustom text-white px-2 py-1 rounded-full text-sm">Slots: {slots}</p>
                </div>
                <div className="flex justify-center">
                    <Link
                        to={`/test/${_id}`}
                        className="btn bg-cyanCustom text-white font-semibold flex items-center px-4 py-2 rounded-lg shadow-md hover:bg-cyan-600 transition-colors duration-300"
                    >
                        <FaInfoCircle className="mr-2 text-xl" />
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default SingleTestCard;
