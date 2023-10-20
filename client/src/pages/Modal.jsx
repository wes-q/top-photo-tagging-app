import React from "react";
import { Link } from "react-router-dom";
import ControllerIcon from "../icons/controller.svg?react";

const Modal = ({ seconds, isUserLegit }) => {
    return (
        <div className="relative z-10">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

            <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
                <div className="flex flex-col gap-4 p-4 text-center justify-center items-center w-1/2 h-auto overflow-hidden rounded-lg bg-gray-800 shadow-xl">
                    <div>You finished in {seconds} seconds!</div>
                    {/* <div>Total characters found </div> */}
                    {isUserLegit ? <span className="text-xs text-green-500">Your score is added to the leaderboard</span> : <span className="text-xs text-red-300">Login to get your score added to the leaderboard</span>}
                    <Link className="flex gap-1 items-center justify-center rounded-lg w-32 bg-primary text-dark-background px-4 py-2 hover:shadow-primary hover:translate-y-[-3px] transition ease-in-out duration-300 active:scale-95 select-none" to="/">
                        <span className="whitespace-nowrap">New Game</span>
                    </Link>
                    <Link className="flex gap-1 items-center justify-center rounded-lg w-32 bg-light-secondary text-dark-background px-4 py-2 hover:shadow-primary hover:translate-y-[-3px] transition ease-in-out duration-300 active:scale-95 select-none" to="/leaderboard">
                        <span className="whitespace-nowrap">Leaderboard</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Modal;
