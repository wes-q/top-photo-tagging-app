import { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";

const LeaderboardTable = ({ selectedGame }) => {
    const [scores, setScores] = useState(null);

    const getScores = async () => {
        try {
            const { data } = await axios.get("/api/scores");
            const filteredScores = data.filter((score) => score.puzzle === selectedGame.puzzle);
            console.log(filteredScores);

            filteredScores.sort((a, b) => a.seconds - b.seconds);

            console.log(data);
            setScores(filteredScores);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getScores();
    }, [selectedGame]);

    if (!selectedGame) {
        return;
    }

    return (
        <table className="mx-auto text-xs sm:text-base overflow-hidden border-spacing-0 border-separate text-light-background w-full max-w-[750px] shadow-md select-none">
            <thead className="bg-slate-300 dark:bg-slate-800">
                <tr className="text-light-text dark:text-dark-text">
                    <td className="p-4">Rank</td>
                    <td className="p-4">User</td>
                    <td className="p-4">Time</td>
                    <td className="p-4">Date</td>
                </tr>
            </thead>

            <tbody className="bg-slate-200/70 dark:bg-slate-900">
                {scores?.map((score, index) => {
                    // const formattedDate = format(score.dateFinished, "MMM-dd-yyyy");
                    // console.log(formattedDate);
                    const jsDate = parseISO(score.dateFinished);
                    const formattedDate = format(jsDate, "MMM dd, yyyy"); // Format the date

                    return (
                        // <tr key={index} className="text-black first:text-lg first:bg-cyan-400 even:bg-slate-200">
                        <tr key={index} className="text-black even:bg-slate-200 first:bg-cyan-400">
                            <td className="p-4">{index + 1}</td>
                            <td className="flex items-center p-4 overflow-hidden text-ellipsis max-w-[150px]">
                                <img className="sm:w-10 sm:h-10 w-6 h-6 rounded-full mr-2 whitespace-nowrap object-cover" src={score.user.profilePhoto || "/noprofile.jpg"} alt="profile" />
                                {score.user.displayName || score.user.firstName}
                            </td>
                            <td className="p-4">{score.seconds}s</td>
                            <td className="p-4 text-ellipsis whitespace-nowrap">{formattedDate}</td>
                        </tr>
                    );
                })}
            </tbody>
            {!scores?.length && <div className="p-2">No scores recorded yet</div>}
        </table>
    );
};

export default LeaderboardTable;
