import React from "react";
import { Link } from "react-router-dom";
import ControllerIcon from "../icons/controller.svg?react";

const gamesData = [
    {
        id: 1,
        name: "Smash Bros 1",
        imageSrc: "/puzzle1.jpg",
        puzzle: "puzzle1",
    },
    {
        id: 2,
        name: "Smash Bros 2",
        imageSrc: "/puzzle2.jpg",
        puzzle: "puzzle2",
    },
    {
        id: 3,
        name: "Super Mario",
        imageSrc: "/puzzle3.webp",
        puzzle: "puzzle3",
    },
    {
        id: 4,
        name: "Anomaly World",
        imageSrc: "/puzzle4.jpg",
        puzzle: "puzzle4",
    },
];

function GameCard({ game, setGame }) {
    return (
        <div className="flex flex-col p-6 shadow-md w-[350px] h-[350px] sm:h-96 bg-gray-800 dark:bg-dark-secondary rounded-lg">
            <img src={game.imageSrc} alt="game preview" className="h-[70%] object-cover rounded-t-lg" draggable="false" />
            <div className="flex flex-col items-center p-2">
                <h2 className="text-lg text-center whitespace-nowrap mb-6">{game.name}</h2>
                <Link className="flex gap-1 items-center justify-center rounded-lg bg-primary text-dark-background px-4 hover:shadow-primary hover:translate-y-[-3px] transition ease-in-out duration-300 active:scale-95 select-none" to="/game" onClick={() => setGame(game)}>
                    <ControllerIcon />
                    <span>Start</span>
                </Link>
            </div>
        </div>
    );
}

function GameList({ setGame }) {
    // console.log(`GamesDATA ${gamesData}`);
    return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-6">
            {gamesData.map((game) => (
                <GameCard key={game.id} game={game} setGame={setGame} />
            ))}
        </div>
    );
}

export default GameList;
