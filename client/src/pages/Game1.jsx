import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimCheck from "../icons/anim-check.svg?react";
import axios from "axios";
import ModalDeactivate from "./ModalDeactivate";
import Modal from "./Modal";

const Game1 = ({ setShowFooter, setShowStartTimer, seconds, setSeconds }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [open, setOpen] = useState(false);
    const [dotSize, setDotSize] = useState(0);
    const audioRefCoin = useRef(null);
    const audioRefHit = useRef(null);
    const audioRefWin = useRef(null);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const imageRef = useRef(null);
    const [characterLocations, setCharacterLocations] = useState([]);
    const [characterFound, setCharacterFound] = useState({});

    const totalCharactersFound = useRef(null);
    const totalCharacters = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getCharacterLocations = async () => {
        try {
            const characterLocations = await axios.get("http://localhost:3001/api/characterLocations/");
            // console.log(characterLocations.data);
            setCharacterLocations(characterLocations.data);
            totalCharacters.current = characterLocations.data.length;
            console.log(`totalCharacters ${totalCharacters.current}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCharacterLocations();
        // Set showFooter to false when the component mounts
        setShowFooter(false);
        setSeconds(0);
        setShowStartTimer(true);

        // Return a cleanup function to set showFooter to true when the component unmounts
        return () => {
            setShowFooter(true);
            setShowStartTimer(false);
        };
    }, []);

    const handleSubmit = async (charIndex) => {
        const xMin = characterLocations[charIndex].xMin;
        const xMax = characterLocations[charIndex].xMax;
        const yMin = characterLocations[charIndex].yMin;
        const yMax = characterLocations[charIndex].yMax;

        if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
            // Set state which displays character markers and dropdown list
            setCharacterFound((prevFound) => ({
                ...prevFound,
                [charIndex]: true,
            }));

            // Set variable which checks if game is won
            totalCharactersFound.current = totalCharactersFound.current + 1;

            // Play successful sound que
            if (audioRefCoin.current) {
                audioRefCoin.current.currentTime = 0;
                audioRefCoin.current.play();
            }

            // Collapse dropdown
            setOpen(false);
        } else {
            // Shake animation and sound and red flash
            if (audioRefHit.current) {
                audioRefHit.current.currentTime = 0;
                audioRefHit.current.play();
            }
            setOpen(false);
        }

        // console.log(totalCharactersFound.current);
        // console.log(totalCharacters.current);
        console.log(characterFound);
        if (totalCharacters.current === totalCharactersFound.current) {
            // console.log(`seconds: ${seconds}`);
            // Stop the timer, save the time to user record
            setShowStartTimer(false);
            setIsModalOpen(true);

            if (audioRefWin.current) {
                audioRefWin.current.currentTime = 0;
                audioRefWin.current.play();
            }

            // Save score to database
            const endpoint = "http://localhost:3001/api/scores/";

            const newScore = {
                puzzle: "puzzle1", //TODO remove hardcoded game
                seconds: seconds,
            };

            const loggedUserToken = window.localStorage.getItem("loggedUserToken");
            const headerConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${loggedUserToken}`,
                },
            };

            try {
                await axios.post(endpoint, newScore, headerConfig);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleClickOutside = (event) => {
        if (open && dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    const handleClick = (event) => {
        setOpen(!open);

        const image = imageRef.current;
        const rect = image.getBoundingClientRect();

        const imageWidth = image.width;
        const imageHeight = image.height;

        // Calculate the dotSize as a percentage of the image's dimensions
        setDotSize(Math.min(imageWidth, imageHeight) * 0.05); // Adjust as needed

        const x = ((event.clientX - rect.left - dotSize / 2) / imageWidth) * 100;
        const y = ((event.clientY - rect.top - dotSize / 2) / imageHeight) * 100;

        setX(x);
        setY(y);
    };

    return (
        <>
            <audio ref={audioRefCoin}>
                <source src="/mixkit-retro-game-notification-212.wav" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio ref={audioRefHit}>
                <source src="/mixkit-small-hit-in-a-game-2072.wav" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <audio ref={audioRefWin}>
                <source src="/mixkit-small-win-2020.wav" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {isModalOpen && <Modal seconds={seconds}></Modal>}

            <div className="relative w-fit mx-auto">
                <img className="cursor-crosshair" src="/puzzle1.jpg" alt="" onClick={handleClick} ref={imageRef} />

                {/* Markers for found characters */}
                {characterLocations.map(
                    (character, index) =>
                        characterFound[index] && (
                            <div
                                key={character.id}
                                className="absolute bg-gray-600 opacity-70 border sm:border-2 border-dashed border-white rounded-full animate-spin-slow"
                                style={{
                                    width: dotSize + "px",
                                    height: dotSize + "px",
                                    left: (character.xMin + character.xMax) / 2 + "%",
                                    top: (character.yMin + character.yMax) / 2 + "%",
                                }}
                            ></div>
                        )
                )}

                {/* Circle pointer selector */}
                {open && (
                    <>
                        <AnimatePresence>
                            <DropdownMenu x={x} y={y} dotSize={dotSize} setOpen={setOpen} handleClickOutside={handleClickOutside} dropdownRef={dropdownRef} handleSubmit={handleSubmit} characterFound={characterFound} characterLocations={characterLocations} />
                        </AnimatePresence>
                        <div
                            className="absolute bg-gray-600 opacity-50 border sm:border-2 border-dashed border-white rounded-full cursor-crosshair"
                            style={{
                                width: dotSize + "px",
                                height: dotSize + "px",
                                left: x + "%",
                                top: y + "%",
                            }}
                        ></div>
                    </>
                )}
            </div>

            {/* Characters to find (bottom bar) */}
            <div className="fixed h-20 w-full bottom-0 bg-gray-800 p-4 text-xs">
                <div className="flex items-center justify-center">
                    {characterLocations.map((character, index) => (
                        <div className="flex gap-1 items-center w-full transition-colors" key={character.id}>
                            <img className="h-auto max-h-12 w-10 select-none" src={character.imageSrc} alt={character.charName} />
                            <div className="flex flex-col justify-start w-20 items-start text-left">
                                <div>
                                    {characterFound[index] ? (
                                        <motion.div initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeIn" }}>
                                            <AnimCheck className="w-5 h-5" />
                                        </motion.div>
                                    ) : (
                                        <div className="w-5 h-5"></div>
                                    )}
                                </div>
                                <span>{character.charName}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

function DropdownMenu({ dropdownRef, x, y, dotSize, handleSubmit, characterFound, characterLocations }) {
    // Dropdown conditionally appears to the left or right to avoid overflow
    const menuAdjustX = x > 80 ? -dotSize * 2.5 : dotSize * 1.5;

    return (
        <motion.div
            className="absolute flex flex-col border border-black bg-gray-800 rounded-lg text-sm z-50 overflow-hidden"
            style={{
                left: x + "%",
                top: y + "%",
                width: dotSize * 2,
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1, x: menuAdjustX }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
            ref={dropdownRef}
        >
            <div className="flex flex-col items-start">
                {characterLocations.map((character, index) => (
                    <div key={character.id}>
                        {!characterFound[index] && (
                            <button className="flex items-center hover:text-cyan-400 hover:bg-slate-700 w-full transition-colors" onClick={() => handleSubmit(index)}>
                                <img src={character.imageSrc2} alt={character.charName} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default Game1;
