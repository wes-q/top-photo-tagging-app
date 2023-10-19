import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const VerificationSuccessful = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                disableForReducedMotion: true,
            });
        }, 700);

        setTimeout(() => {
            // Log to check if this code block is running
            console.log("Navigating to /login");

            navigate("/login");
            navigate(0);
        }, 5000);
    }, []);

    return (
        <div className="flex flex-col h-full items-center justify-center p-6">
            <div className="text-4xl font-bold mb-4">Verification successful!</div>
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

export default VerificationSuccessful;
