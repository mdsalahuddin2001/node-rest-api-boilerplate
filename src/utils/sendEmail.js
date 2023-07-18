const nodemailer = require("nodemailer");
const { smtpHost, smtpPort, smtpUsername, smtpPassword } = require("../secret");
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
    console.log("Connected to email server");
  })
  .catch((err) => {
    console.log("Unable to connect to email server", err);
  });
const sendEmail = async (data) => {
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.EMAIL_FROM}>`,
    to: data.email,
    subject: data.subject,
    html: data.html,
  };

  const info = await transport.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

// const sender = {
//   email: "mdahmede442@gmail.com",
//   name: "MD Salahuddin",
// };

module.exports = sendEmail;
