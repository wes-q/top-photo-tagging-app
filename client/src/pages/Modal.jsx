import React from "react";
import { Link } from "react-router-dom";
import ControllerIcon from "../icons/controller.svg?react";

const Modal = ({ seconds }) => {
    return (
        <div className="relative z-10">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

            <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
                <div className="flex flex-col gap-4 px-8 py-4 text-center justify-center items-center w-1/2 h-auto overflow-hidden rounded-lg bg-gray-800 shadow-xl">
                    <div>You finished in {seconds} seconds!</div>
                    <div>Total characters found </div>
                    <Link className="flex gap-1 items-center justify-center rounded-lg bg-primary text-dark-background px-4 hover:shadow-primary hover:translate-y-[-3px] transition ease-in-out duration-300 active:scale-95 select-none" to="/">
                        <ControllerIcon />
                        <span className="whitespace-nowrap">New Game</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Modal;
