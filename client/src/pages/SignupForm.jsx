import { useState } from "react";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";
import Spinner from "../icons/spinner.svg?react";

const SignupForm = ({ setNotification }) => {
    const navigate = useNavigate();

    const [isDisabled, setIsDisabled] = useState(false);
    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        password: "",
        // profilePhoto: null, // For file input, initialize with null
        // uploadPhoto: null,
    });

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
        setIsDisabled(true);

        try {
            await userService.create(formData);
            setNotification({ message: `You're signed up as ${formData.displayName}!  Redirecting to login page...`, type: "success" });
            setTimeout(() => {
                setNotification(null);
                navigate("/login");
                navigate(0);
            }, 5000);
        } catch (error) {
            if (error.response.data.error) {
                const firstError = error.response.data.error;
                setNotification({ message: firstError, type: "error" });
                setIsDisabled(false);
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            }
        }
    };

    return (
        <>
            <h2 className="text-2xl mb-8 text-white text-center">Signup Form</h2>
            <form className="sm:w-[400px] mx-auto" onSubmit={handleSubmit}>
                <label>
                    <span className="block text-sm font-medium text-white">Display Name</span>
                    <input type="text" name="displayName" value={formData.displayName} onChange={handleChange} className="mt-1 mb-2 px-3 py-2 bg-white text-black border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  valid:border-green-400 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300" placeholder="John Wick" autoComplete="displayName" required autoFocus pattern=".*\S+.*" title="Display name is required" disabled={isDisabled} />
                </label>

                <label>
                    <span className="block text-sm font-medium text-white">Email Address</span>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} className="mt-1 mb-2 px-3 py-2 bg-white text-black border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  valid:border-green-400 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 " placeholder="john@example.com" required disabled={isDisabled} />
                </label>

                <label>
                    <span className="block text-sm font-medium text-white">Password</span>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 mb-2 px-3 py-2 bg-white text-black border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  valid:border-green-400 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300" placeholder="JohnWick@123" autoComplete="current-password" required minLength="8" disabled={isDisabled} />
                </label>

                <label>
                    <span className="block text-sm font-medium text-white">Confirm Password</span>
                    <input
                        className="mt-1 mb-2 px-3 py-2 bg-white text-black border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 valid:border-green-400 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        required
                        pattern={`^${formData.password}$`} // Use a regular expression to match the password
                        title="Passwords must match" // Custom error message
                        disabled={isDisabled}
                    />
                </label>

                {isDisabled ? (
                    <button disabled className="flex items-center bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none mr-2" type="submit">
                        <Spinner />
                        Redirecting...
                    </button>
                ) : (
                    <div className="flex justify-end">
                        <button className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none mt-4" type="submit">
                            Sign Up
                        </button>
                    </div>
                )}
            </form>
        </>
    );
};

export default SignupForm;
