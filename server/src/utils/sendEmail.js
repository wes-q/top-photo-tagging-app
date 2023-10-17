const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const sendEmail = (email, displayName, verificationToken) => {
    const verificationLink = `http://localhost:3001/api/verify-email/?token=${verificationToken}`;
    console.log(verificationLink);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    // Step 2
    transporter.use(
        "compile",
        hbs({
            viewEngine: "express-handlebars",
            viewPath: "./",
        })
    );

    // Step 3
    const mailOptions = {
        from: "tabbnabbers@gmail.com", // TODO: email sender
        to: email, // TODO: email receiver
        subject: "Nodemailer - Test",
        text: "Wooohooo it works!!",
        template: "main",
        context: {
            name: displayName,
            verificationLink: verificationLink,
        }, // send extra values to template
    };

    // Step 4
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log("Error occurs");
            console.log(err);
            return;
        }
        return console.log("Email sent!!!");
    });
};

module.exports = sendEmail;
