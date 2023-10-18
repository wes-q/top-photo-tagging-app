import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimCheck from "../icons/anim-check.svg?react";
import axios from "axios";

const Game1 = ({ setShowFooter }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [open, setOpen] = useState(false);
    const [dotSize, setDotSize] = useState(0);
    const audioRefCoin = useRef(null);
    const audioRefHit = useRef(null);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const imageRef = useRef(null);
    const [characterLocations, setCharacterLocations] = useState([]);
    const [characterFound, setCharacterFound] = useState({});

    useEffect(() => {
        const getCharacterLocations = async () => {
            try {
                const characterLocations = await axios.get("http://localhost:3001/api/characterLocations/");
                console.log(characterLocations.data);
                setCharacterLocations(characterLocations.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCharacterLocations();
    }, []);

    const handleSubmit = (charIndex) => {
        console.log(characterLocations[charIndex].charName);
        console.log(characterLocations[charIndex].xMin);
        console.log(characterLocations[charIndex].xMax);

        const xMin = characterLocations[charIndex].xMin;
        const xMax = characterLocations[charIndex].xMax;
        const yMin = characterLocations[charIndex].yMin;
        const yMax = characterLocations[charIndex].yMax;

        //if x is between 650 and 692
        //and y is between 662 and 700
        if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
            //alert("You have found mr. Game");
            setCharacterFound((prevFound) => ({
                ...prevFound,
                [charIndex]: true,
            }));
            // Play successful sound que
            if (audioRefCoin.current) {
                audioRefCoin.current.currentTime = 0;
                audioRefCoin.current.play();
            }
            // Collapse dropdown
            setOpen(false);
        } else {
            // shake animation and sound and red flash
            if (audioRefHit.current) {
                audioRefHit.current.currentTime = 0;
                audioRefHit.current.play();
            }
            setOpen(false);
        }
    };

    useEffect(() => {
        // Set showFooter to false when the component mounts
        setShowFooter(false);

        // Return a cleanup function to set showFooter to true when the component unmounts
        return () => {
            setShowFooter(true);
        };
    }, []);

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

            <div className="relative w-fit mx-auto">
                <img className="cursor-crosshair" src="/puzzle1.jpg" alt="" onClick={handleClick} ref={imageRef} />
                {open && (
                    <>
                        <div
                            className="absolute bg-gray-600 opacity-50 border sm:border-2 border-dashed border-white rounded-full cursor-crosshair"
                            style={{
                                width: dotSize + "px",
                                height: dotSize + "px",
                                left: x + "%",
                                top: y + "%",
                            }}
                        ></div>
                        <AnimatePresence>{open && <DropdownMenu x={x} y={y} dotSize={dotSize} setOpen={setOpen} handleClickOutside={handleClickOutside} dropdownRef={dropdownRef} handleSubmit={handleSubmit} characterFound={characterFound} />}</AnimatePresence>
                    </>
                )}
            </div>
            <div className="fixed h-20 w-full bottom-0 bg-gray-800 p-4 text-xs">
                <div className="flex items-center justify-center">
                    <div className="flex gap-1 items-center w-full transition-colors">
                        <img className="h-auto max-h-12 w-10 select-none" src="/mrgame-vector.png" alt="mr game" />
                        <div className="flex flex-col justify-start w-20 items-start text-left">
                            <div>
                                {characterFound[0] ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeIn" }}>
                                        <AnimCheck className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <div className="w-5 h-5"></div>
                                )}
                            </div>
                            <span>Mr. Game</span>
                        </div>
                    </div>
                    <div className="flex gap-1 items-center w-full transition-colors">
                        <img className="h-auto max-h-12 w-10" src="/ice-climbers-vector.png" alt="ice climbers" />
                        <div className="flex flex-col justify-start w-20 items-start text-left">
                            <div>
                                {characterFound[1] ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeIn" }}>
                                        <AnimCheck className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <div className="w-5 h-5"></div>
                                )}
                            </div>
                            <span>Ice Climbers</span>
                        </div>
                    </div>
                    <div className="flex gap-1 items-center w-full transition-colors">
                        <img className="h-auto max-h-12 w-10" src="/pichu-vector.png" alt="pichu" />
                        <div className="flex flex-col justify-start w-20 items-start text-left">
                            <div>
                                {characterFound[2] ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeIn" }}>
                                        <AnimCheck className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <div className="w-5 h-5"></div>
                                )}
                            </div>
                            <span>Pichu</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

//80.7 88.03 53.51 58.56
function DropdownMenu({ dropdownRef, x, y, dotSize, handleSubmit, characterFound }) {
    // Dropdown should conditionally appear to the left or right to avoid overflow
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
                {!characterFound[0] && (
                    <button className="flex items-center hover:text-cyan-400 hover:bg-slate-700 w-full transition-colors" onClick={() => handleSubmit(0)}>
                        <img className="" src="/mrgame.jpg" alt="mr game" />
                    </button>
                )}
                {!characterFound[1] && (
                    <button className="flex items-center hover:text-cyan-400 hover:bg-slate-700 w-full transition-colors" onClick={() => handleSubmit(1)}>
                        <img className="" src="/iceclimbers.jpg" alt="ice climbers" />
                    </button>
                )}
                {!characterFound[2] && (
                    <button className="flex items-center hover:text-cyan-400 hover:bg-slate-700 w-full transition-colors" onClick={() => handleSubmit(2)}>
                        <img className="" src="/pichu.jpg" alt="pichu" />
                    </button>
                )}
            </div>
        </motion.div>
    );
}

export default Game1;
