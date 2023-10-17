import React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BellIcon from "../icons/bell.svg?react";
import MessengerIcon from "../icons/messenger.svg?react";
import PlusIcon from "../icons/plus.svg?react";
import CogIcon from "../icons/cog.svg?react";

// const Game1 = () => {
//     // const [isTargeting, setIsTargeting] = useState(false);
//     const [x, setX] = useState(0);
//     const [y, setY] = useState(0);
//     const dotSize = 40; // Adjust as needed

//     const [open, setOpen] = useState(false);
//     const dropdownRef = useRef(null);
//     const buttonRef = useRef(null);

//     const handleClickOutside = (event) => {
//         //Set to false if the dropdown is open, the click did not occur inside the dropdown and the click did not occur inside the button that opens the dropdown
//         if (open && dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
//             setOpen(false);
//         }
//     };

//     const handleClick = (event) => {
//         // setIsTargeting(!isTargeting);
//         setOpen(!open);
//         const image = event.target;
//         const rect = image.getBoundingClientRect();

//         // Take into account the width and height depending on the viewport
//         const targetWidth = rect.width;
//         const targetHeight = rect.height;

//         // Calculate the dot's position, taking into account the dot's size
//         const x = event.clientX - rect.left - dotSize / 2;
//         const y = event.clientY - rect.top - dotSize / 2;
//         // const x = ((event.clientX - rect.left - dotSize / 2) / targetWidth) * 100;
//         // const y = ((event.clientY - rect.top - dotSize / 2) / targetHeight) * 100;

//         setX(x);
//         setY(y);
//         console.log(`X: ${x}`);
//         console.log(`Y: ${y}`);
//     };

//     const handleImageClick = (event) => {
//         // Get the click coordinates relative to the image
//         const image = event.target;
//         const rect = image.getBoundingClientRect();
//         const x = event.clientX - rect.left;
//         const y = event.clientY - rect.top;
//     };

//     return (
//         <>
//             <div>Game1</div>
//             <div className="relative">
//                 <img className="cursor-crosshair" src="/puzzle1.jpg" alt="" onClick={handleClick} />
//                 {/* {isTargeting && <div className={`absolute text-2xl font-bold left-${x}px`}>Hello!</div>} */}
//                 {/* {isTargeting && <div className={`absolute text-2xl font-bold left-[${x}px]`}>Hello!</div>} */}
//                 {/* {isTargeting && <div className="absolute text-2xl font-bold left-[50px]">Hello!</div>} */}
//                 {open && (
//                     <>
//                         <div
//                             className="absolute bg-gray-600 opacity-50 border-2 border-dashed border-white rounded-full cursor-crosshair"
//                             style={{
//                                 width: dotSize + "px",
//                                 height: dotSize + "px",
//                                 left: x + "px",
//                                 top: y + "px",
//                             }}
//                         ></div>
//                         <AnimatePresence>{open && <DropdownMenu x={x} y={y} setOpen={setOpen} handleClickOutside={handleClickOutside} dropdownRef={dropdownRef} />}</AnimatePresence>
//                     </>
//                 )}
//             </div>
//         </>
//     );
// };

const Game1 = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [open, setOpen] = useState(false);
    const [dotSize, setDotSize] = useState(0);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const imageRef = useRef(null);

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
        //718 - 24 - 39.6/2 / 792 - maxwidth viewport
        //543 - 24 - 29.5/2 / 591 - smallwidth viewport
        const x = ((event.clientX - rect.left - dotSize / 2) / imageWidth) * 100;
        const y = ((event.clientY - rect.top - dotSize / 2) / imageHeight) * 100;
        // const x = event.clientX - rect.left - dotSize / 2;
        // const y = event.clientY - rect.top - dotSize / 2;
        console.log(`ClientX: ${event.clientX}`);
        console.log(`Rect.left: ${rect.left}`);
        console.log(`Dotsize: ${dotSize}`);
        console.log(`imageWidth: ${imageWidth}`);
        console.log(`X: ${x}`);
        console.log(`Y: ${y}`);
        // console.log(`Rect.top: ${rect.top}`);
        setX(x);
        setY(y);
    };

    return (
        <>
            <div>Game1</div>
            <div className="relative w-fit">
                <img className=" cursor-crosshair" src="/puzzle1.jpg" alt="" onClick={handleClick} ref={imageRef} />
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
                        <AnimatePresence>{open && <DropdownMenu x={x} y={y} dotSize={dotSize} setOpen={setOpen} handleClickOutside={handleClickOutside} dropdownRef={dropdownRef} />}</AnimatePresence>
                    </>
                )}
            </div>
        </>
    );
};
//80.7 88.03 53.51 58.56
function DropdownMenu({ dropdownRef, x, y, dotSize }) {
    const handleSubmit = (character) => {
        if (character === "mrgame") {
            //if x is between 650 and 692
            //and y is between 662 and 700
            if (x >= 80.7 && x <= 88.03 && y >= 53.51 && y <= 58.56) {
                alert("You have found mr. Game");
            } else {
                // shake animation and sound and red flash
                alert("Thats not mr. Game");
            }
        }
    };

    return (
        <motion.div
            className="absolute flex flex-col border border-black bg-gray-800 rounded-lg text-sm z-50 overflow-hidden"
            style={{
                left: x + "%",
                top: y + "%",
                width: dotSize * 2,
            }}
            initial={{ opacity: 0, scale: 0.3, x: dotSize * 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
            ref={dropdownRef}
        >
            <div className="flex flex-col items-start">
                <button className="flex items-center hover:text-cyan-400 hover:bg-slate-700 w-full transition-colors" onClick={() => handleSubmit("pichu")}>
                    <img className="" src="/pichu.jpg" alt="pichu" />
                </button>
                <button className="flex items-center hover:text-cyan-400 hover:bg-slate-700 w-full transition-colors" onClick={() => handleSubmit("iceclimbers")}>
                    <img className="" src="/iceclimbers.jpg" alt="ice climbers" />
                </button>
                <button className="flex items-center hover:text-cyan-400 hover:bg-slate-700 w-full transition-colors" onClick={() => handleSubmit("mrgame")}>
                    <img className="" src="/mrgame.jpg" alt="mr game" />
                </button>
            </div>
            {/* style={{ height: dotSize * 5, width: dotSize * 5 }} */}
        </motion.div>
    );
}

export default Game1;
