const invoiceHtml = require("../templates/invoice");
const pdf = require("html-pdf");
const createError = require("http-errors");
const demo = async (req, res, next) => {
  console.log("requested");
  pdf
    .create(invoiceHtml(), {
      format: "A4",
      childProcessOptions: {
        env: {
          OPENSSL_CONF: "/dev/null",
        },
      },
    })
    .toFile("invoice.pdf", (err) => {
      if (err) {
        console.log("err");
        return res.send(err.message);
      }
      console.log("success");
      return res.sendFile(`${__dirname}/invoice.pdf`);
    });
};

module.exports = { demo };
