const axios = require('axios');

const sendConfirmationSMS = async (course_id) => {
  try {
    const response = await axios.post('https://app.notify.lk/api/v1/send', {
        api_key: 'oiT5uPpsidQm2h4pL16i',
        user_id:"27107",
        sender_id:"NotifyDEMO",
        message:`Dear student, you have successfully enrolled in course ${course_id}`,
        to:"94771138876"
    });
    console.log(response.data);
    return response.data; // Return the response from Notify.lk
  } catch (error) {
    console.error(error.response.data);
    throw new Error('Failed to send notification');
}
};


module.exports = { sendConfirmationSMS};
