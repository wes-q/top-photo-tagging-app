import GithubLogo from "../icons/githublogo2.svg?react";

const Footer = () => (
    <div className="flex flex-col justify-center items-center bg-gray-800 p-4 text-center h-10 text-xs sm:text-base sm:h-20">
        <div className="flex text-[6px] sm:text-sm">
            <span className="mr-6">Created by: Wes Q.</span>
            <div>
                <span>Icons by </span>
                <a className="text-gray-200 underline" href="https://icons8.com" target="_blank">
                    Icons8
                </a>
            </div>
        </div>
        <div className="flex items-center text-[8px] sm:text-base group">
            <GithubLogo className="w-4 h-4 sm:w-8 sm:h-8 mr-2 fill-current cursor-pointer group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out"></GithubLogo>
            <a className="text-cyan-400 underline" href="https://github.com/iamwesofph/top-photo-tagging-app" target="_blank">
                https://github.com/iamwesofph/top-photo-tagging-app
            </a>
        </div>
    </div>
);

export default Footer;
