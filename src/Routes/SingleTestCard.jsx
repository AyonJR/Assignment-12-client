import { Link } from "react-router-dom";

const SingleTestCard = ({ test }) => {
    const {_id , image , title , name , details , price , slots } = test ;
    console.log(test)
    return (
        <div>
            <div key={test._id} className="border rounded-md p-4 shadow-md">
                <img src={image} alt={title} className="w-full h-40 object-cover rounded-md" />
                <h3 className="text-xl font-semibold mt-4">{name}</h3>
                <p className="mt-2">{details}</p>
                <p className="mt-2 text-gray-600">Price: ${price}</p>
                <p className="mt-2 text-gray-600">
                    Slots: {slots}
                </p>
                <div className="flex justify-center">
                    <Link to={`/test/${_id}`} className="btn bg-blue-400 text-white font-semibold my-2">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleTestCard;
