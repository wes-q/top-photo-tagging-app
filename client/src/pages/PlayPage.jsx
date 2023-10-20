import GameList from "./GameList";

const PlayPage = ({ setGame }) => {
    return (
        <div className="p-6">
            <h2 className="text-2xl mb-8 text-white text-center">Play</h2>
            <GameList setGame={setGame} />
        </div>
    );
};

export default PlayPage;
