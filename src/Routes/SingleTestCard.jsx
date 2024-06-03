
const SingleTestCard = ({test}) => {
    console.log(test)
    return (
        <div>
              <div key={test.id} className="border rounded-md p-4 shadow-md">
                        <img src={test.image} alt={test.title} className="w-full h-40 object-cover rounded-md" />
                        <h3 className="text-xl font-semibold mt-4">{test.title}</h3>
                        <p className="mt-2">{test.description}</p>
                        <p className="mt-2 text-gray-600">Date: {test.date}</p>
                        <p className="mt-2 text-gray-600">Slots: {test.slots.join(", ")}</p>
                       <div className="flex justify-center">
                       <button className="btn bg-blue-400 text-white font-semibold my-2">Details</button>
                       </div>
                    </div>
        </div>
    );
};

export default SingleTestCard;