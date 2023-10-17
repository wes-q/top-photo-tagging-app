import { Link } from "react-router-dom";
import ControllerIcon from "../icons/controller.svg?react";

const Play = () => {
    return (
        <div>
            <h2 className="text-4xl p-6">Games</h2>

            <div className="flex flex-col p-6 items-center justify-center gap-6">
                <div className="flex grow flex-col p-6 shadow-md max-w-full w-[350px] h-[350px] bg-gray-800 dark:bg-dark-secondary rounded-lg">
                    <img src="/puzzle1.jpg" alt="game preview" className="h-[70%] object-cover rounded-t-lg" draggable="false" />

                    <div className="flex flex-col justify-around grow items-center">
                        <h2 className="text-lg text-center whitespace-nowrap">Smash Bros 1</h2>
                        <Link className="flex gap-1 items-center justify-center rounded-lg bg-primary text-dark-background px-4 hover:shadow-primary hover:translate-y-[-3px] transition ease-in-out duration-300 active:scale-95 select-none" to="/game-1">
                            <ControllerIcon />
                            <span>Start</span>
                        </Link>
                    </div>
                </div>
                <div className="flex grow flex-col shadow-md max-w-full w-[350px] h-[350px] bg-gray-800 dark:bg-dark-secondary rounded-lg">
                    <img src="/puzzle2.jpg" alt="game preview" className="h-[70%] object-cover rounded-t-lg" draggable="false" />

                    <div className="p-3 flex flex-col justify-between grow items-center">
                        <h2 className="text-lg text-center whitespace-nowrap">Smash Bros 2</h2>
                        <Link className="rounded-lg bg-primary text-dark-background px-6 py-2 hover:shadow-primary hover:translate-y-[-3px] transition ease-in-out duration-300 active:scale-95 select-none" to="/game-2">
                            Start Game
                        </Link>
                    </div>
                </div>
                <div className="flex grow flex-col shadow-md max-w-full w-[350px] h-[350px] bg-gray-800 dark:bg-dark-secondary rounded-lg">
                    <img src="/puzzle3.jpg" alt="game preview" className="h-[70%] object-cover rounded-t-lg" draggable="false" />

                    <div className="p-3 flex flex-col justify-between grow items-center">
                        <h2 className="text-lg text-center whitespace-nowrap">Smash Bros 3</h2>
                        <Link className="rounded-lg bg-primary text-dark-background px-6 py-2 hover:shadow-primary hover:translate-y-[-3px] transition ease-in-out duration-300 active:scale-95 select-none" to="/game-3">
                            Start Game
                        </Link>
                    </div>
                </div>
                <div className="flex grow flex-col shadow-md max-w-full w-[350px] h-[350px] bg-gray-800 dark:bg-dark-secondary rounded-lg">
                    <img src="/puzzle4.jpg" alt="game preview" className="h-[70%] object-cover rounded-t-lg" draggable="false" />

                    <div className="p-3 flex flex-col justify-between grow items-center">
                        <h2 className="text-lg text-center whitespace-nowrap">Anomaly World</h2>
                        <Link className="rounded-lg bg-primary text-dark-background px-6 py-2 hover:shadow-primary hover:translate-y-[-3px] transition ease-in-out duration-300 active:scale-95 select-none" to="/game-4">
                            Start Game
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Play;
