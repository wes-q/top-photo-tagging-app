import { NavLink } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <h2 className="text-4xl mb-8">Page not found!</h2>
            <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia alias cupiditate ad nostrum doloribus iste tempora quisquam excepturi repellat, fugit cumque dolore magni possimus inventore neque provident! Sunt, quo eos?</p>

            <p className="mb-4">
                Go to the <NavLink to="/">Homepage</NavLink>.
            </p>
        </div>
    );
}
