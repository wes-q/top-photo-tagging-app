import { NavLink } from "react-router-dom";

const AnecdoteList = ({ anecdotes }) => {
    return (
        <div>
            <h2 className="text-2xl mb-8">Anecdotes</h2>
            <ul>
                {anecdotes.map((anecdote) => (
                    <li key={anecdote.id} className="mb-6">
                        <NavLink
                            to={`/anecdotes/${anecdote.id}`} // Define the route URL for each anecdote
                            className="list-none bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors duration-300"
                        >
                            {anecdote.content}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnecdoteList;
