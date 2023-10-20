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

function GameCard({ game, setSelectedGame, selectedGame }) {
    const handleGameSelect = () => {
        setSelectedGame(game);
        console.log(game);
    };

    const isSelectedGame = Object.is(selectedGame, game);

    return (
        <div className={`flex flex-col p-3 w-36 h-36 bg-gray-800 dark:bg-dark-secondary rounded-lg cursor-pointer sm:w-60 sm:h-60 shadow-cyan-400/60 transition-shadow ${isSelectedGame && "shadow-lg"}`} onClick={handleGameSelect}>
            <img src={game.imageSrc} alt="game preview" className="h-[70%] object-cover rounded-t-lg" draggable="false" />
            <div className="flex flex-col items-center p-2">
                <h2 className={`text-sm sm:text-lg text-center whitespace-nowrap ${isSelectedGame && "text-cyan-400"}`}>{game.name}</h2>
            </div>
        </div>
    );
}

function GameList({ setSelectedGame, selectedGame }) {
    // console.log(`GamesDATA ${gamesData}`);
    return (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 select-none">
            {gamesData.map((game) => (
                <GameCard key={game.id} game={game} setSelectedGame={setSelectedGame} selectedGame={selectedGame} />
            ))}
        </div>
    );
}

export default GameList;
