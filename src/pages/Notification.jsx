// const Notification = ({ notification }) => {
//     if (notification === null) {
//         return null;
//     }
//     if (notification.type === "success") {
//         return <div className="w-full px-4 py-2 rounded-md bg-gray-800 border-black text-green-400 mb-4 whitespace-pre-line">{notification.message}</div>;
//     } else if (notification.type === "error") {
//         return <div className="w-full px-4 py-2 rounded-md bg-gray-800 border border-black text-red-400 mb-4 whitespace-pre-line">{notification.message}</div>;
//     } else if (notification.type === "warning") {
//         return <div className="w-full px-4 py-2 rounded-md bg-gray-800 border border-black text-amber-400 mb-4 whitespace-pre-line">{notification.message}</div>;
//     } else if (notification.type === "info") {
//         return <div className="w-full px-4 py-2 rounded-md bg-gray-800 border border-black text-cyan-400 mb-4 whitespace-pre-line">{notification.message}</div>;
//     }
// };

// export default Notification;
const Notification = ({ notification, setNotification }) => {
    if (notification === null) {
        return null;
    }

    const typeToColorClass = {
        success: "text-green-400",
        error: "text-red-400",
        warning: "text-amber-400",
        info: "text-cyan-400",
    };

    const colorClass = typeToColorClass[notification.type] || "text-gray-400";

    return (
        <div>
            <div className={`flex justify-between items-center w-full px-4 py-2 text-justify rounded-md bg-gray-800 border-black border ${colorClass} mb-4 whitespace-pre-line`}>
                <div>{notification.message}</div>
                <button className="font-bold text-xl pl-4" onClick={() => setNotification(null)}>
                    X
                </button>
            </div>
        </div>
    );
};

export default Notification;
