import React from "react";
import { Link } from "react-router-dom";
import ControllerIcon from "../icons/controller.svg?react";

const gamesData = [
    {
        id: 1,
        name: "Smash Bros 1",
        imageSrc: "/puzzle1.jpg",
        link: "/game-1",
    },
    {
        id: 2,
        name: "Smash Bros 2",
        imageSrc: "/puzzle2.jpg",
        link: "/game-2",
    },
    {
        id: 3,
        name: "Smash Bros 3",
        imageSrc: "/puzzle3.jpg",
        link: "/game-3",
    },
    {
        id: 4,
        name: "Anomaly World",
        imageSrc: "/puzzle4.jpg",
        link: "/game-4",
    },
];

function GameCard({ game }) {
    return (
        <div className="flex grow flex-col p-6 shadow-md max-w-full w-[350px] h-[350px] bg-gray-800 dark:bg-dark-secondary rounded-lg">
            <img src={game.imageSrc} alt="game preview" className="h-[70%] object-cover rounded-t-lg" draggable="false" />
            <div className="flex flex-col items-center p-2">
                <h2 className="text-lg text-center whitespace-nowrap mb-6">{game.name}</h2>
                <Link className="flex gap-1 items-center justify-center rounded-lg bg-primary text-dark-background px-4 hover:shadow-primary hover:translate-y-[-3px] transition ease-in-out duration-300 active:scale-95 select-none" to={game.link}>
                    <ControllerIcon />
                    <span>Start</span>
                </Link>
            </div>
        </div>
    );
}

function GameList() {
    return (
        <div className="flex flex-col p-6 items-center justify-center gap-6">
            {gamesData.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    );
}

export default GameList;
