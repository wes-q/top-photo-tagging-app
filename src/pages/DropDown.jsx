import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DropDownCaret from "../icons/dropdowncaretsmall.svg?react";
import BellIcon from "../icons/bell.svg?react";
import MessengerIcon from "../icons/messenger.svg?react";
import PlusIcon from "../icons/plus.svg?react";
import CogIcon from "../icons/cog.svg?react";
import emailService from "../services/emailService";
import { useNavigate } from "react-router-dom";
import noProfilePhoto from "../icons/noprofile.jpg";

export default function DropDown({ user, setNotification }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const handleClickOutside = (event) => {
        //Set to false if the dropdown is open, the click did not occur inside the dropdown and the click did not occur inside the button that opens the dropdown
        if (open && dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    return (
        <>
            <button className="flex justify-center items-center bg-slate-700 border border-cyan-400 rounded-3xl px-4 py-2 text-sm hover:bg-slate-900 transition-colors duration-300 whitespace-nowrap" onClick={() => setOpen(!open)} ref={buttonRef}>
                <span className="mr-1">{user.firstName || user.displayName}</span>
                <DropDownCaret />
            </button>
            <AnimatePresence>{open && <DropdownMenu user={user} setNotification={setNotification} setOpen={setOpen} handleClickOutside={handleClickOutside} dropdownRef={dropdownRef} />}</AnimatePresence>
        </>
    );
}

function DropdownMenu({ user, handleClickOutside, dropdownRef, setNotification, setOpen }) {
    // TODO: understand why this doesnt work instead of the window.open method + try POST if its better than GET for logouts.
    // const handleLogout = async () => {
    //     try {
    //         // Replace "backend-url" with the actual URL of your backend server
    //         await axios.post("http://localhost:3001/auth/logout");
    //         // Redirect or perform any other actions after successful logout
    //     } catch (error) {
    //         // Handle any errors here
    //         console.error("Logout failed x", error);
    //     }
    // };
    // Remove the event listener when the dropdown is closed
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // window.open(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, "_self");
        window.localStorage.removeItem("loggedUserToken"); //logs out locally signed up user (not using passport sessions)
        window.open("/auth/logout", "_self"); // logs out oauth signed user (using passport sessions)
    };

    // Attach the click event listener when the dropdown is open
    if (open) {
        document.addEventListener("mouseup", handleClickOutside);
    }

    const manageAccount = () => {
        setOpen(!open); // Close the dropdown menu
        // navigate("/update-profile");
        navigate("/update-profile");
        // navigate(0);
    };

    const verifyEmail = async () => {
        const loggedUserToken = window.localStorage.getItem("loggedUserToken");
        const headerConfig = {
            headers: { Authorization: `Bearer ${loggedUserToken}` },
        };

        try {
            await emailService.sendEmail(headerConfig);
            setOpen(!open); // Close the dropdown menu
            setNotification({ message: `Sent verification email to: ${user.email}`, type: "info" });
            setTimeout(() => {
                setNotification(null);
            }, 10000);
        } catch (error) {
            console.log(`VERIFYEMAIL${error}`);
        }
    };

    return (
        <motion.div
            className="h-auto w-72 absolute right-0 flex flex-col border border-cyan-400 bg-gray-800 rounded-lg text-sm z-50"
            // initial={{ opacity: 0, scale: 0.3, x: 50, y: -150 }}
            // animate={{ opacity: 1, scale: 1, x: -22, y: 20 }}
            // exit={{ opacity: 0, scale: 0.3, x: 50, y: -150 }} // Define the exit animation
            // transition={{ duration: 0.2, ease: "easeIn" }}
            initial={{ opacity: 0, scale: 0.3, x: 50, y: 100 }}
            animate={{ opacity: 1, scale: 1, x: -22, y: 300 }}
            exit={{ opacity: 0, scale: 0.3, x: 50, y: 150 }} // Define the exit animation
            transition={{ duration: 0.2, ease: "easeIn" }}
            ref={dropdownRef}
        >
            <div className="flex flex-col items-center gap-6 py-6">
                <img className="rounded-full h-14 w-14 object-cover border border-white" src={user.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                {/* <div>{user.profilePhoto ? <img className="rounded-full h-14 w-14 object-cover border border-white" src={`${user.profilePhoto}?${new Date().getTime()}`} alt="profile photo" referrerPolicy="no-referrer" /> : <CogIcon className="w-6 h-6 fill-current m-3" />}</div> */}
                {/* src={`${user.profilePhoto}?${new Date().getTime()}`}  */}
                {/* This is a hacky technique to prevent cache related error */}
                <div className="flex flex-col items-center justify-center">
                    <span className="text-lg font-bold">{user.firstName || user.displayName}</span>
                    <h3 className="text-xs">{user.email}</h3>
                </div>

                <div>
                    {user.isVerified ? (
                        <button className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-500 transition-colors" onClick={() => manageAccount()}>
                            Manage your account
                        </button>
                    ) : (
                        <button className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-500 transition-colors text-red-500" onClick={() => verifyEmail()}>
                            Verify email
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-start">
                <button className="flex items-center hover:text-cyan-400 hover:bg-slate-700 w-full transition-colors">
                    <BellIcon className="w-6 h-6 fill-current m-3" />
                    <span>Notifications</span>
                </button>
                <button className="flex items-center hover:text-cyan-400 hover:bg-slate-700 w-full transition-colors">
                    <PlusIcon className="w-6 h-6 fill-current m-3" />
                    <span>Support</span>
                </button>
                <button className="flex items-center hover:text-cyan-400 hover:bg-slate-700 w-full transition-colors">
                    <MessengerIcon className="w-6 h-6 fill-current m-3" />
                    <span>Give us Feedback</span>
                </button>
                <button className="flex items-center hover:text-cyan-400 hover:bg-slate-700 w-full transition-colors">
                    <CogIcon className="w-6 h-6 fill-current m-3" />
                    <span>Settings</span>
                </button>

                <div className="h-[1px] relative bg-cyan-400 w-full"></div>
            </div>
            <div className="m-3">
                <span className="cursor-pointer" onClick={handleLogout}>
                    Logout
                </span>
            </div>
        </motion.div>
    );
}
