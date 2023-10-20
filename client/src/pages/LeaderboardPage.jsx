import LeaderboardTable from "./LeaderboardTable";
import GameListForLeaderboard from "./GameListForLeaderboard";
import { useState } from "react";

const LeaderboardPage = () => {
    const [selectedGame, setSelectedGame] = useState(null);

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-8 text-white text-center">Leaderboard</h2>
            <GameListForLeaderboard setSelectedGame={setSelectedGame} selectedGame={selectedGame} />
            <LeaderboardTable selectedGame={selectedGame} />
        </div>
    );
};

export default LeaderboardPage;
