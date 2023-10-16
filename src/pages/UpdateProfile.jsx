import { useState, useEffect } from "react";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";
import Spinner from "../icons/spinner.svg?react";
import ProfilePhotoUpload from "./ProfilePhotoUpload";

const UpdateProfile = ({ user, setNotification, setUser }) => {
    const navigate = useNavigate();
    const [displayNameDisabled, setDisplayNameDisabled] = useState(true);
    const [firstNameDisabled, setFirstNameDisabled] = useState(true);
    const [lastNameDisabled, setLastNameDisabled] = useState(true);
    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        // password: "",
        // profilePhoto: null, // For file input, initialize with null
        // uploadPhoto: null,
    });

    useEffect(() => {
        // Set the initial values of email and displayName from the user object
        if (user) {
            setFormData({
                displayName: user.displayName,
                email: user.email,
                profilePhoto: user.profilePhoto,
                firstName: user.firstName,
                lastName: user.lastName,
            });
        }
    }, [user]);

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        // If the input is a file input, use `files` to get the selected file(s)
        const newValue = type === "file" ? files[0] : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisplayNameDisabled(true);
        setLastNameDisabled(true);
        setFirstNameDisabled(true);
        try {
            const userData = await userService.update(user.id, formData);
            console.log(`USERDATA: ${JSON.stringify(userData)}`);
            // if DB was successfully updated then update the state also
            setUser(userData);
            setNotification({ message: `User profile updated`, type: "success" });
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        } catch (error) {
            if (error.response.data.error) {
                const firstError = error.response.data.error;
                setNotification({ message: firstError, type: "error" });
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            }
        }
    };

    return (
        <>
            <h2 className="text-2xl mb-8 text-white text-center">Update Profile</h2>
            <div className="flex justify-around">
                {user && <ProfilePhotoUpload user={user} profilePhoto={user.profilePhoto} setNotification={setNotification} />}
                <form className="sm:w-[400px] mx-auto h-40" onSubmit={handleSubmit}>
                    <label>
                        <span className="block text-sm font-medium text-white">Email Address</span>
                        <input type="text" name="email" value={formData.email || ""} onChange={handleChange} className="mt-1 mb-2 px-3 py-2 bg-white text-black border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  valid:border-green-400 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300 " placeholder="john@example.com" required disabled />
                    </label>

                    {user && user.displayName && (
                        <label>
                            <span className="block text-sm font-medium text-white">Display Name</span>
                            <div className="relative">
                                <input type="text" name="displayName" value={formData.displayName || ""} onChange={handleChange} className="mt-1 mb-2 px-3 py-2 bg-white text-black border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  valid:border-green-400 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300" placeholder="John Wick" autoComplete="displayName" required autoFocus pattern=".*\S+.*" title="Display name is required" disabled={displayNameDisabled} spellCheck="false" />
                                <button type="button" className="absolute top-[9px] right-4 text-sm text-gray-600 hover:text-cyan-600" onClick={() => setDisplayNameDisabled(false)}>
                                    Change
                                </button>
                            </div>
                        </label>
                    )}

                    <label>
                        <span className="block text-sm font-medium text-white">Last Name</span>
                        <div className="relative">
                            <input type="text" name="lastName" value={formData.lastName || ""} onChange={handleChange} className="mt-1 mb-2 px-3 py-2 bg-white text-black border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  valid:border-green-400 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300" placeholder="John Wick" autoComplete="displayName" required autoFocus pattern=".*\S+.*" title="Display name is required" disabled={lastNameDisabled} spellCheck="false" />
                            <button type="button" className="absolute top-[9px] right-4 text-sm text-gray-600 hover:text-cyan-600" onClick={() => setLastNameDisabled(false)}>
                                Change
                            </button>
                        </div>
                    </label>
                    <label>
                        <span className="block text-sm font-medium text-white">First Name</span>
                        <div className="relative">
                            <input type="text" name="firstName" value={formData.firstName || ""} onChange={handleChange} className="mt-1 mb-2 px-3 py-2 bg-white text-black border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  valid:border-green-400 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300" placeholder="John Wick" autoComplete="displayName" required autoFocus pattern=".*\S+.*" title="Display name is required" disabled={firstNameDisabled} spellCheck="false" />
                            <button type="button" className="absolute top-[9px] right-4 text-sm text-gray-600 hover:text-cyan-600" onClick={() => setFirstNameDisabled(false)}>
                                Change
                            </button>
                        </div>
                    </label>

                    <label>
                        <span className="block text-sm font-medium text-white">Password</span>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 mb-2 px-3 py-2 bg-white text-black border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  valid:border-green-400 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300" placeholder="JohnWick@123" autoComplete="current-password" required minLength="8" disabled />
                    </label>

                    <label>
                        <span className="block text-sm font-medium text-white">Confirm Password</span>
                        <input
                            className="mt-1 mb-2 px-3 py-2 bg-white text-black border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 valid:border-green-400 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            required
                            pattern={`^${formData.password}$`} // Use a regular expression to match the password
                            title="Passwords must match" // Custom error message
                            disabled
                        />
                    </label>

                    <div className="flex justify-end">
                        <button className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none mt-4" type="submit">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateProfile;
