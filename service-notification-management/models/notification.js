const mongoose = require("mongoose");
const moment = require('moment-timezone');

const notificationSchema = mongoose.Schema(
  {
    message: { type: String, required: true },
    recipient: { type: String, required: true },
    emailSubject:{type: String},
    notificationType:{type: String, required: true},
    dateTime: { type: String, default: () =>moment().tz('Asia/Colombo').format('YYYY-MM-DD HH:mm:ss') }
  },

);

module.exports = mongoose.model("notification", notificationSchema);
