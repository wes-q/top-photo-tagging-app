import axios from "axios";
// const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/anecdotes`;
const baseUrl = `/api/users`;

const getAll = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        // Handle any errors here
        throw error;
    }
};

const create = async (newObject) => {
    try {
        const response = await axios.post(baseUrl, newObject);
        return response.data;
    } catch (error) {
        console.log("USERS SERVICE ERROR");
        console.log(error);
        // Handle any errors here
        throw error;
    }
};

// const update = async (id, newObject) => {
//     try {
//         const response = await axios.put(`${baseUrl}/${id}`, newObject);
//         return response.data;
//     } catch (error) {
//         // Handle any errors here
//         throw error;
//     }
// };

const update = async (id, newObject, customHeaders) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, newObject, { headers: customHeaders });
        return response.data;
    } catch (error) {
        // Handle any errors here
        throw error;
    }
};

const remove = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        console.log("Status Code:", response.status);
        console.log("Data:", response.data);
        return response.data;
    } catch (error) {
        // Handle any errors here
        throw error;
    }
};

export default {
    getAll,
    create,
    update,
    remove,
};

// import axios from "axios";

// const getAll = () => {
//     const request = axios.get(baseUrl);
//     return request.then((response) => response.data);
// };

// const create = (newObject) => {
//     const request = axios.post(baseUrl, newObject);
//     return request.then((response) => response.data);
// };

// const update = (id, newObject) => {
//     const request = axios.put(`${baseUrl}/${id}`, newObject);
//     return request.then((response) => response.data);
// };

// const remove = (id) => {
//     const request = axios.delete(`${baseUrl}/${id}`);
//     return request.then((response) => {
//         console.log("Status Code:", response.status); // Logging the status code
//         console.log("Data:", response.data); // Logging the status code
//         return response.data;
//     });
// };

// export default {
//     getAll,
//     create,
//     update,
//     remove,
// };
