export default function Navbar() {
    function toggleDarkMode() {
        document.documentElement.classList.toggle("dark");
    }

    return (
        <>
            <nav className="peer fixed bottom-0 sm:top-0 duration-500 ease-in-out bg-zinc-800 h-20 w-screen sm:w-20 sm:min-h-screen group sm:hover:w-64 text-sky-300">
                <ul className="flex flex-row items-center w-full sm:flex-col h-full">
                    <li className="w-full">
                        <a href="#" className="flex justify-center items-center sm:justify-start h-20 grayscale hover:bg-black hover:grayscale-0 transition duration-500">
                            <svg className="inline w-8 mx-6 min-w-0 sm:min-w-[2rem]" data-icon="cat" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <g>
                                    <path className="text-sky-600" fill="currentColor" d="M448 96h-64l-64-64v134.4a96 96 0 0 0 192 0V32zm-72 80a16 16 0 1 1 16-16 16 16 0 0 1-16 16zm80 0a16 16 0 1 1 16-16 16 16 0 0 1-16 16zm-165.41 16a204.07 204.07 0 0 0-34.59 2.89V272l-43.15-64.73a183.93 183.93 0 0 0-44.37 26.17L192 304l-60.94-30.47L128 272v-80a96.1 96.1 0 0 0-96-96 32 32 0 0 0 0 64 32 32 0 0 1 32 32v256a64.06 64.06 0 0 0 64 64h176a16 16 0 0 0 16-16v-16a32 32 0 0 0-32-32h-32l128-96v144a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V289.86a126.78 126.78 0 0 1-32 4.54c-61.81 0-113.52-44.05-125.41-102.4z"></path>
                                    <path className="text-sky-300" fill="currentColor" d="M376 144a16 16 0 1 0 16 16 16 16 0 0 0-16-16zm80 0a16 16 0 1 0 16 16 16 16 0 0 0-16-16zM131.06 273.53L192 304l-23.52-70.56a192.06 192.06 0 0 0-37.42 40.09zM256 272v-77.11a198.62 198.62 0 0 0-43.15 12.38z"></path>
                                </g>
                            </svg>
                            <span className="hidden sm:ml-8 sm:inline sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-500">Cats</span>
                        </a>
                    </li>
                    <li className="w-full">
                        <a href="#" className="flex justify-center items-center sm:justify-start h-20 grayscale hover:bg-black hover:grayscale-0 transition duration-500">
                            <svg className="inline w-8 mx-6 min-w-0 sm:min-w-[2rem]" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="alien-monster" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <g className="">
                                    <path
                                        fill="currentColor"
                                        d="M560,128H528a15.99954,15.99954,0,0,0-16,16v80H480V176a15.99954,15.99954,0,0,0-16-16H416V96h48a16.00079,16.00079,0,0,0,16-16V48a15.99954,15.99954,0,0,0-16-16H432a15.99954,15.99954,0,0,0-16,16V64H368a15.99954,15.99954,0,0,0-16,16v48H224V80a15.99954,15.99954,0,0,0-16-16H160V48a15.99954,15.99954,0,0,0-16-16H112A15.99954,15.99954,0,0,0,96,48V80a16.00079,16.00079,0,0,0,16,16h48v64H112a15.99954,15.99954,0,0,0-16,16v48H64V144a15.99954,15.99954,0,0,0-16-16H16A15.99954,15.99954,0,0,0,0,144V272a16.00079,16.00079,0,0,0,16,16H64v80a16.00079,16.00079,0,0,0,16,16h48v80a16.00079,16.00079,0,0,0,16,16h96a16.00079,16.00079,0,0,0,16-16V432a15.99954,15.99954,0,0,0-16-16H192V384H384v32H336a15.99954,15.99954,0,0,0-16,16v32a16.00079,16.00079,0,0,0,16,16h96a16.00079,16.00079,0,0,0,16-16V384h48a16.00079,16.00079,0,0,0,16-16V288h48a16.00079,16.00079,0,0,0,16-16V144A15.99954,15.99954,0,0,0,560,128ZM224,320H160V224h64Zm192,0H352V224h64Z"
                                        className="text-sky-600"
                                    ></path>
                                    <path fill="currentColor" d="M160,320h64V224H160Zm192-96v96h64V224Z" className="text-sky-300"></path>
                                </g>
                            </svg>
                            <span className="hidden sm:ml-8 sm:inline sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-500">Aliens</span>
                        </a>
                    </li>
                    <li className="w-full">
                        <a href="#" className="flex justify-center items-center sm:justify-start h-20 grayscale hover:bg-black hover:grayscale-0 transition duration-500">
                            <svg className="inline w-8 mx-6 min-w-0 sm:min-w-[2rem]" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="space-station-moon-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <g className="fa-group">
                                    <path className="text-sky-600" fill="currentColor" d="M501.70312,224H448V160H368V96h48V66.67383A246.86934,246.86934,0,0,0,256,8C119.03125,8,8,119.0332,8,256a250.017,250.017,0,0,0,1.72656,28.26562C81.19531,306.76953,165.47656,320,256,320s174.80469-13.23047,246.27344-35.73438A250.017,250.017,0,0,0,504,256,248.44936,248.44936,0,0,0,501.70312,224ZM192,240a80,80,0,1,1,80-80A80.00021,80.00021,0,0,1,192,240ZM384,343.13867A940.33806,940.33806,0,0,1,256,352c-87.34375,0-168.71094-11.46094-239.28906-31.73633C45.05859,426.01953,141.29688,504,256,504a247.45808,247.45808,0,0,0,192-91.0918V384H384Z"></path>
                                    <path className="text-sky-300" fill="currentColor" d="M256,320c-90.52344,0-174.80469-13.23047-246.27344-35.73438a246.11376,246.11376,0,0,0,6.98438,35.998C87.28906,340.53906,168.65625,352,256,352s168.71094-11.46094,239.28906-31.73633a246.11376,246.11376,0,0,0,6.98438-35.998C430.80469,306.76953,346.52344,320,256,320Zm-64-80a80,80,0,1,0-80-80A80.00021,80.00021,0,0,0,192,240Zm0-104a24,24,0,1,1-24,24A23.99993,23.99993,0,0,1,192,136Z"></path>
                                </g>
                            </svg>
                            <span className="hidden sm:ml-8 sm:inline sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-500">Space</span>
                        </a>
                    </li>

                    <li className="w-full sm:mt-auto">
                        <a href="#" onClick={toggleDarkMode} className="flex justify-center items-center sm:justify-start h-20 grayscale hover:bg-black hover:grayscale-0 transition duration-500">
                            <svg className="inline dark:hidden w-8 mx-6 min-w-0 sm:min-w-[2rem]" id="lightIcon" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="moon-stars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <g>
                                    <path className="text-sky-300" fill="currentColor" d="M320 32L304 0l-16 32-32 16 32 16 16 32 16-32 32-16zm138.7 149.3L432 128l-26.7 53.3L352 208l53.3 26.7L432 288l26.7-53.3L512 208z"></path>
                                    <path className="text-sky-600" fill="currentColor" d="M332.2 426.4c8.1-1.6 13.9 8 8.6 14.5a191.18 191.18 0 0 1-149 71.1C85.8 512 0 426 0 320c0-120 108.7-210.6 227-188.8 8.2 1.6 10.1 12.6 2.8 16.7a150.3 150.3 0 0 0-76.1 130.8c0 94 85.4 165.4 178.5 147.7z"></path>
                                </g>
                            </svg>

                            <svg className="hidden dark:inline w-8 mx-6 min-w-0 sm:min-w-[2rem]" id="darkIcon" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="sunglasses" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <g>
                                    <path
                                        className="text-sky-600"
                                        fill="currentColor"
                                        d="M574.09 280.38L528.75 98.66a87.94 87.94 0 0 0-113.19-62.14l-15.25 5.08a16 16 0 0 0-10.12 20.25L395.25 77a16 16 0 0 0 20.22 10.13l13.19-4.39c10.87-3.63 23-3.57 33.15 1.73a39.59 39.59 0 0 1 20.38 25.81l38.47 153.83a276.7 276.7 0 0 0-81.22-12.47c-34.75 0-74 7-114.85 26.75h-73.18c-40.85-19.75-80.07-26.75-114.85-26.75a276.75 276.75 0 0 0-81.22 12.45l38.47-153.8a39.61 39.61 0 0 1 20.38-25.82c10.15-5.29 22.28-5.34 33.15-1.73l13.16 4.39A16 16 0 0 0 180.75 77l5.06-15.19a16 16 0 0 0-10.12-20.21l-15.25-5.08A87.95 87.95 0 0 0 47.25 98.65L1.91 280.38A75.35 75.35 0 0 0 0 295.86v70.25C0 429 51.59 480 115.19 480h37.12c60.28 0 110.38-45.94 114.88-105.37l2.93-38.63h35.76l2.93 38.63c4.5 59.43 54.6 105.37 114.88 105.37h37.12C524.41 480 576 429 576 366.13v-70.25a62.67 62.67 0 0 0-1.91-15.5zM203.38 369.8c-2 25.9-24.41 46.2-51.07 46.2h-37.12C87 416 64 393.63 64 366.11v-37.55a217.35 217.35 0 0 1 72.59-12.9 196.51 196.51 0 0 1 69.91 12.9zM512 366.13c0 27.5-23 49.87-51.19 49.87h-37.12c-26.69 0-49.1-20.3-51.07-46.2l-3.12-41.24a196.55 196.55 0 0 1 69.94-12.9A217.41 217.41 0 0 1 512 328.58z"
                                    ></path>
                                    <path className="text-sky-300" fill="currentColor" d="M64.19 367.9c0-.61-.19-1.18-.19-1.8 0 27.53 23 49.9 51.19 49.9h37.12c26.66 0 49.1-20.3 51.07-46.2l3.12-41.24c-14-5.29-28.31-8.38-42.78-10.42zm404-50l-95.83 47.91.3 4c2 25.9 24.38 46.2 51.07 46.2h37.12C489 416 512 393.63 512 366.13v-37.55a227.76 227.76 0 0 0-43.85-10.66z"></path>
                                </g>
                            </svg>
                            <span className="hidden sm:ml-8 sm:inline sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-500">Themify</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
}
