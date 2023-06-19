//import { createTransport } from "nodemailer";

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendConfirmationEmail(userEmail, hash) {
  const msg = {
    //to: "markodimic023@gmail.com",
    to: userEmail,
    from: "test@test.luka-korolija.com",
    subject: "Activate Your Account",
    text: "by clicking on link",
    html: `<p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/auth/user/${hash}">Activate Link</a></p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("EMAIL SENT");
    })
    .catch((error) => {
      console.log(error);
    });

  /// OLD NODEMAILER CODE

  // console.log("BEFORE PROMISE: ");
  // return new Promise((res, rej) => {
  //   const transporter = createTransport({
  //     service: "Yandex",
  //     auth: {
  //       user: process.env.YANDEX_USER,
  //       pass: process.env.YANDEX_PASSWORD,
  //     },
  //     //secure: true,
  //     // host: "mail.luka-korolija.com",
  //     // port: 465,
  //     // auth: {
  //     //   user: process.env.EMAIL_USER,
  //     //   pass: process.env.EMAIL_PASSWORD,
  //     // },
  //   });

  //   console.log("EMAILUSER");
  //   console.log(process.env.YANDEX_USER);

  //   const message = {
  //     from: process.env.EMAIL_USER,
  //     //to: userEmail,
  //     // to: process.env.GOOGLE_USER,
  //     to: "markodimic023@gmail.com",
  //     subject: "Activate Your Account",
  //     html: `
  //           <h3>Hello</h3>
  //           <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/auth/user/${hash}">Activate Link</a></p>
  //       `,
  //   };
  //   transporter.sendMail(message, function (error, info) {
  //     if (error) {
  //       rej(error);
  //     } else {
  //       res(info);
  //     }
  //   });
  //   console.log("AFTER PROMISE: ");
  // });
}

export default sendConfirmationEmail;
