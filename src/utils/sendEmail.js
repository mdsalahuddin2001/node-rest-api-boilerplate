const nodemailer = require("nodemailer");
const { smtpHost, smtpPort, smtpUsername, smtpPassword } = require("../secret");
const logger = require("./logger");
var transport = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  auth: {
    user: smtpUsername,
    pass: smtpPassword,
  },
});

transport
  .verify()
  .then(() => {
    logger.log("info", "Connected to email server");
  })
  .catch((err) => {
    logger.log("error", "Unable to connect to email server", err);
  });
const sendEmail = async (data) => {
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.EMAIL_FROM}>`,
    to: data.email,
    subject: data.subject,
    html: data.html,
  };

  const info = await transport.sendMail(message);

  logger.log("info", "Message sent: %s", info.messageId);
};

// const sender = {
//   email: "mdahmede442@gmail.com",
//   name: "MD Salahuddin",
// };

module.exports = sendEmail;
