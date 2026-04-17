const axios = require("axios");

const sendOTP = async (mobile) => {
    try {
        const response = await axios.get(
            `https://api.msg91.com/api/v5/otp`,
            {
                params: {
                    authkey: process.env.MSG91_AUTH_KEY,
                    mobile: mobile,
                    template_id: process.env.MSG91_TEMPLATE_ID,
                },
            }
        );
        return response.data;
    } catch (err) {
        console.error(err.response?.data || err.message);
    }
};


const verifyOTP = async (mobile, otp) => {
    try {
        const response = await axios.get(
            `https://api.msg91.com/api/v5/otp/verify`,
            {
                params: {
                    authkey: process.env.MSG91_AUTH_KEY,
                    mobile: mobile,
                    otp: otp,
                },
            }
        );

        return response.data;
    } catch (err) {
        console.error(err.response?.data || err.message);
    }
};

module.exports = { sendOTP, verifyOTP }