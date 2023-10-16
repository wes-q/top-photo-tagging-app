import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const VerificationNothing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            // Log to check if this code block is running
            console.log("Navigating to /login");

            navigate("/login");
            navigate(0);
        }, 5000);
    }, []);

    return (
        <div className="flex flex-col h-full items-center justify-center">
            <div className="text-4xl font-bold mb-4">Sorry! No more confetti cause you're already verified.</div>
            <span>Redirecting you to the login page... </span>
            <span>
                Or click here to{" "}
                <Link className="underline hover:text-cyan-400" to="/login">
                    login
                </Link>
            </span>
        </div>
    );
};

export default VerificationNothing;
