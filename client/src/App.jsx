import { useState, useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import RootLayout from "./pages/RootLayout";
import SignupForm from "./pages/SignupForm";
import Login from "./pages/Login";
import VerificationSuccessful from "./pages/VerificationSuccessful";
import VerificationNothing from "./pages/VerificationNothing";
import UpdateProfile from "./pages/UpdateProfile";
import About from "./pages/About";
import Game1 from "./pages/Game1";
import GameList from "./pages/GameList";
// import Game2 from "./pages/Game2";
// import Game3 from "./pages/Game3";
// import Game4 from "./pages/Game4";

import loginService from "./services/login";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
    const [notification, setNotification] = useState(null);
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState("");
    const [showFooter, setShowFooter] = useState(true);
    const [showStartTimer, setShowStartTimer] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const getUserOauth = async () => {
            // console.log("USEEFFECT OAUTH");
            try {
                // const url = `${import.meta.env.VITE_SERVER_URL}/auth/login/success`;
                const { data } = await axios.get("/auth/login/success", { withCredentials: true });
                console.log(data);
                setUser(data);
                setNotification({ message: "Login successful!", type: "success" });
            } catch (err) {
                // if there is no user found, or if there is duplicate record with another provider it will catch error
                // console.log(err);

                if (err.response.data.message) {
                    // if (err.response.data.message && Array.isArray(err.response.data.message) && err.response.data.message.length > 0) {
                    setNotification({ message: err.response.data.message[0], type: "error" });
                    setTimeout(() => {
                        setNotification(null);
                    }, 7000);
                } else {
                    // setNotification({ message: "Hello! Login to gain complete access", type: "info" });
                }
            }
        };

        const getUserLocal = async () => {
            if (loggedUserToken) {
                try {
                    const headerConfig = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${loggedUserToken}`,
                        },
                    };

                    // const response = await axios.get(url, {
                    //     headers: {
                    //         Authorization: `Bearer ${token}`,
                    //         "Content-Type": "application/json", // Set the Content-Type header if needed
                    //     },
                    // });
                    // console.log("Response:", response.data);

                    // console.log(headerConfig);
                    const data = await loginService.loginSuccess(headerConfig);

                    setUser(data.user);
                    setNotification({ message: "Login successful!", type: "success" });
                    setTimeout(() => {
                        setNotification(null);
                    }, 10000);
                } catch (error) {
                    console.log("Automatic relogin: No user session found.");
                    // setNotification({ message: "Login to gain complete access", type: "info" });
                    // setTimeout(() => {
                    //     setNotification(null);
                    // }, 10000);
                    // next(error);
                }
            }
        };

        const loggedUserToken = window.localStorage.getItem("loggedUserToken");

        if (loggedUserToken) {
            getUserLocal();
        } else {
            getUserOauth();
        }
    }, []);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout notification={notification} setNotification={setNotification} user={user} showFooter={showFooter} showStartTimer={showStartTimer} setSeconds={setSeconds} seconds={seconds} />}>
                <Route index element={<GameList />} />
                <Route path="login" element={<Login setNotification={setNotification} setUserToken={setUserToken} />}></Route>
                <Route path="game-1" element={<Game1 setShowFooter={setShowFooter} setShowStartTimer={setShowStartTimer} seconds={seconds} setSeconds={setSeconds} />}></Route>
                {/* <Route path="game-2" element={<Game2 />}></Route>
                <Route path="game-3" element={<Game3 />}></Route>
                <Route path="game-4" element={<Game4 />}></Route> */}
                <Route path="about" element={<About />}></Route>
                <Route path="signup" element={<SignupForm setNotification={setNotification} />}></Route>
                <Route path="verification-successful" element={<VerificationSuccessful />}></Route>
                <Route path="verification-nothing" element={<VerificationNothing />}></Route>
                <Route path="update-profile" element={<UpdateProfile user={user} setUser={setUser} setNotification={setNotification} />}></Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
