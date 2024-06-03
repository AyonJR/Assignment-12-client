import { Link } from "react-router-dom";

const SingleTestCard = ({ test }) => {
    return (
        <div>
            <div key={test._id} className="border rounded-md p-4 shadow-md">
                <img src={test.image} alt={test.title} className="w-full h-40 object-cover rounded-md" />
                <h3 className="text-xl font-semibold mt-4">{test.title}</h3>
                <p className="mt-2">{test.description}</p>
                <p className="mt-2 text-gray-600">Date: {test.date}</p>
                <p className="mt-2 text-gray-600">Slots: {test.slots.join(", ")}</p>
                <div className="flex justify-center">
                    <Link to={`/test/${test._id}`} className="btn bg-blue-400 text-white font-semibold my-2">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleTestCard;
