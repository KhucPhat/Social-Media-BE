const path = require("path");
const nodemailer = require("nodemailer");
const handlebars = require("nodemailer-express-handlebars");
const config = require("../config/config");

const host = "smtp.gmail.com";
const port = 465;
const service = "gmail";

const transporter = nodemailer.createTransport({
  service,
  host,
  port,
  secure: true,
  auth: {
    user: config.NODEMAILER_EMAIL,
    pass: config.NODEMAILER_PASS,
  },
});

const viewPath = path.join(__dirname, "../views");
transporter.use(
  "compile",
  handlebars({
    viewEngine: {
      extname: "html",
      layoutsDir: path.join(viewPath, "layouts"),
      defaultLayout: false,
      partialsDir: path.join(viewPath, "partials"),
    },
    viewPath: viewPath,
    extName: ".html",
  })
);

exports.sendEmailUser = async (to, subject, template, context) => {
  const mailOptions = {
    from: config.NODEMAILER_EMAIL,
    to,
    subject,
    template,
    context,
  };

  await transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Gửi email thành công.");
  });
};
