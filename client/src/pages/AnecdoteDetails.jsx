import { useParams } from "react-router-dom";

const AnecdoteDetails = ({ anecdotes }) => {
    const id = useParams().id;
    const anecdote = anecdotes.find((anecdote) => anecdote.id === Number(id));
    return (
        <div>
            <h2 className="text-4xl mb-8">Anecdote Details</h2>
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                <p>Author: {anecdote.author}</p>
                <p>Content: {anecdote.content}</p>
                <p>Has {anecdote.votes} likes</p>
                <p>
                    For more info see:{" "}
                    <a className="text-black underline" href={anecdote.info}>
                        {anecdote.info}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default AnecdoteDetails;
