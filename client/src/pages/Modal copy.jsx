import React from "react";
import { Link } from "react-router-dom";
import ControllerIcon from "../icons/controller.svg?react";

const Modal = () => {
    return (
        <div className="relative">
            <div className="fixed top-0 w-screen h-screen bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 w-64 h-64 mx-auto overflow-y-auto bg-gray-800">
                <div>You finished in !</div>
                <div>You have found: </div>
                <Link className="flex gap-1 items-center justify-center rounded-lg bg-primary text-dark-background px-4 hover:shadow-primary hover:translate-y-[-3px] transition ease-in-out duration-300 active:scale-95 select-none" to="/">
                    <ControllerIcon />
                    <span>Play</span>
                </Link>
            </div>
        </div>
    );
};

export default Modal;
