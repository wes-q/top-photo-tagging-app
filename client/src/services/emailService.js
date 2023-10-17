import axios from "axios";
const baseUrl = `/api/send-verification-email`;

const sendEmail = async (headerConfig) => {
    try {
        const response = await axios.get(baseUrl, headerConfig);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default { sendEmail };
