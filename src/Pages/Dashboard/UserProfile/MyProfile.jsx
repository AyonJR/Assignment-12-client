import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { axiosSecure } from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUserAlt, FaEnvelope, FaImage } from "react-icons/fa";

const MyProfile = () => {
    const { user, loading, updateUserProfile } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        displayName: "",
        email: "",
        photoURL: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setProfile({
                displayName: user.displayName || "",
                email: user.email || "",
                photoURL: user.photoURL || ""
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        Swal.fire("Success!", "Your profile has been updated.", "success");
        try {
            await updateUserProfile(profile);
            await axiosSecure.put(`/users/${user.uid}`, profile);
            Swal.fire("Success!", "Your profile has been updated.", "success");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-cyanCustom/20">
            <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-6 ">
                <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-cyanCustom">My Profile</h2>
                
                <div className="flex justify-center mb-6">
                    <img
                        src={profile.photoURL || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-lg transition-all duration-300 transform hover:scale-110"
                    />
                </div>
                
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                            <FaUserAlt className="mr-2 text-cyan-600" /> Display Name
                        </label>
                        <input
                            type="text"
                            name="displayName"
                            value={profile.displayName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 w-full px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-cyan-500 transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                            <FaEnvelope className="mr-2 text-cyan-600" /> Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 w-full px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-cyan-500 transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                            <FaImage className="mr-2 text-cyan-600" /> Photo URL
                        </label>
                        <input
                            type="text"
                            name="photoURL"
                            value={profile.photoURL}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 w-full px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-cyan-500 transition duration-300"
                        />
                    </div>
                </form>
                
                <div className="mt-6 flex justify-between">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-300 transition duration-300"
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 transition duration-300"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2 bg-cyanCustom text-white rounded-lg shadow-md focus:ring-2 focus:ring-blue-300 transition duration-300"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
