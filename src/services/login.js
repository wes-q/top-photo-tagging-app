import axios from "axios";
const baseUrl = "/api/login-local";

const login = async (credentials) => {
    try {
        const response = await axios.post(baseUrl, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const loginSuccess = async (headerConfig) => {
    try {
        const response = await axios.get(`${baseUrl}/success`, headerConfig);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default { login, loginSuccess };
