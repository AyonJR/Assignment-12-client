import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { axiosSecure } from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyProfile = () => {
    const { user, loading, updateUserProfile } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        displayName: '',
        email: '',
        photoURL: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setProfile({
                displayName: user.displayName || '',
                email: user.email || '',
                photoURL: user.photoURL || ''
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
        try {
            // Update profile in Firebase
            await updateUserProfile(profile);

            // Update the user profile in MongoDB
            await axiosSecure.put(`/users/${user.uid}`, profile);

            Swal.fire("Success!", "Your profile has been updated.", "success");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire("Error!", "Failed to update your profile.", "error");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-center mb-6">
                    <img
                        src={profile.photoURL || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border"
                    />
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Display Name
                        </label>
                        <input
                            type="text"
                            name="displayName"
                            value={profile.displayName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            disabled={!isEditing} // Email can be editable if required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            name="photoURL"
                            value={profile.photoURL}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                </form>
                <div className="mt-6 flex justify-between">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg transition-colors duration-300 hover:bg-green-700"
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg transition-colors duration-300 hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors duration-300 hover:bg-blue-700"
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
