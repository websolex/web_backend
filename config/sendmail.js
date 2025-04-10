const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "developerwebsolex@gmail.com",
        pass: "cobz djsh aekz zxvx",
    },
});

const sendemail = async (email, name, password) => {
    try {
        const info = await transporter.sendMail({
            from: '"Websolex infotech" <developerwebsolex@gmail.com>',
            to: email, // list of receivers
            subject: "Admin Access", // Subject line
            text: "websolex infotech admin", // plain text body
            html: `<div style="background-color:#ffffff; margin:30px auto; padding:20px; border-radius:10px; box-shadow:0 2px 4px rgba(0, 0, 0, 0.1); max-width:600px; width:100%;">
  <div style="text-align:center; padding-bottom:20px;">
    <img src="https://www.t3bucket.com/f/0-WebSolexInfotech-FullStackDevelopment20240624_154346.jpg" alt="WebSolex Logo" style="width:100px; border-radius:50%;" />
    <h1 style="margin:10px 0; font-size:24px; color:#333;">Admin Panal access</h1>
    <p style="margin:0; color:#666;">your email registed successfully Email: ${email}</p>
  </div>

  <div style="margin:20px 0;">
    <h2 style="font-size:20px; color:#333; border-bottom:2px solid #f4f4f4; padding-bottom:10px;">Submission Details</h2>
    <p style="font-size:16px; color:#555;"><strong>Name:</strong> ${name}</p>
    <p style="font-size:16px; color:#555;"><strong>Email:</strong> ${email}</p>
    <p style="font-size:16px; color:#555;"><strong>Password:</strong> ${password}</p>
    <p style="font-size:16px; color:#555;"><strong>Link:</strong> <a href="https://websolex-admin-panal.vercel.app">Your Link</a></p>
  </div>

  <div style="text-align:center; padding-top:20px; border-top:1px solid #f4f4f4;">
    <p style="font-size:14px; color:#aaa;">&copy; 2024 Websolex Infotech. All rights reserved.</p>
  </div>
</div>
`, // html body
        });
        console.log(info);
    } catch (error) {
        console.log(error);
    }
};
const subscribeEmail = async (email) => {
    try {
        const info = await transporter.sendMail({
            from: '"Websolex infotech" <developerwebsolex@gmail.com>',
            to: email, // list of receivers
            subject: "your email is subscribe succesfully", // Subject line
            text: "websolex infotech admin", // plain text body
            html: `<div style="background-color:#ffffff; margin:30px auto; padding:20px; border-radius:10px; box-shadow:0 2px 4px rgba(0, 0, 0, 0.1); max-width:600px; width:100%;">
  <div style="text-align:center; padding-bottom:20px;">
    <img src="https://www.t3bucket.com/f/0-WebSolexInfotech-FullStackDevelopment20240624_154346.jpg" alt="WebSolex Logo" style="width:100px; border-radius:50%;" />
    <h1 style="margin:10px 0; font-size:24px; color:#333;">Contact Form Received</h1>
    <p style="margin:0; color:#666;">Trying to connect with Websolex Infotech. Email: ${email}</p>
  </div>

  <div style="margin:20px 0;">
    <h2 style="font-size:20px; color:#333; border-bottom:2px solid #f4f4f4; padding-bottom:10px;">Your email subscibed successfully!</h2>
    <p style="font-size:16px; color:#555;"><strong>Email:</strong> ${email}</p>

    <p style="font-size:16px; color:#555;">Thank You!</p>

  </div>

  <div style="text-align:center; padding-top:20px; border-top:1px solid #f4f4f4;">
    <p style="font-size:14px; color:#aaa;">&copy; 2024 Websolex Infotech. All rights reserved.</p>
  </div>
</div>
`, // html body
        });
        subscribeownEmail(email)
        console.log(info);
    } catch (error) {
        console.log(error);
    }
};
const subscribeownEmail = async (email) => {
    try {
        const info = await transporter.sendMail({
            from: '"Websolex infotech" <developerwebsolex@gmail.com>',
            to: "websolexinfotech@gmail.com", // list of receivers
            subject: "your email is subscribe succesfully", // Subject line
            text: "websolex infotech admin", // plain text body
            html: `<div style="background-color:#ffffff; margin:30px auto; padding:20px; border-radius:10px; box-shadow:0 2px 4px rgba(0, 0, 0, 0.1); max-width:600px; width:100%;">
  <div style="text-align:center; padding-bottom:20px;">
    <img src="https://www.t3bucket.com/f/0-WebSolexInfotech-FullStackDevelopment20240624_154346.jpg" alt="WebSolex Logo" style="width:100px; border-radius:50%;" />
    <h1 style="margin:10px 0; font-size:24px; color:#333;">Contact Form Received</h1>
    <p style="margin:0; color:#666;">Trying to connect with Websolex Infotech. Email: ${email}</p>
  </div>

  <div style="margin:20px 0;">
    <h2 style="font-size:20px; color:#333; border-bottom:2px solid #f4f4f4; padding-bottom:10px;">Subsciber recived successfully!</h2>
    <p style="font-size:16px; color:#555;"><strong>Email:</strong> ${email}</p>

    <p style="font-size:16px; color:#555;">Thank You!</p>

  </div>

  <div style="text-align:center; padding-top:20px; border-top:1px solid #f4f4f4;">
    <p style="font-size:14px; color:#aaa;">&copy; 2024 Websolex Infotech. All rights reserved.</p>
  </div>
</div>
`, // html body
        });
        console.log(info);
    } catch (error) {
        console.log(error);
    }
};

const contactEmail = async (name, email, contactnumber, subject, message) => {
    try {
        const info = await transporter.sendMail({
            from: '"Websolex infotech" <developerwebsolex@gmail.com>',
            to: "websolexinfotech@gmail.com", // list of receivers
            subject: subject, // Subject line
            text: "websolex infotech admin", // plain text body
            html: `<div style="background-color:#ffffff; margin:30px auto; padding:20px; border-radius:10px; box-shadow:0 2px 4px rgba(0, 0, 0, 0.1); max-width:600px; width:100%;">
  <div style="text-align:center; padding-bottom:20px;">
    <img src="https://www.t3bucket.com/f/0-WebSolexInfotech-FullStackDevelopment20240624_154346.jpg" alt="WebSolex Logo" style="width:100px; border-radius:50%;" />
    <h1 style="margin:10px 0; font-size:24px; color:#333;">Contact Form Received</h1>
    <p style="margin:0; color:#666;">Trying to connect with Websolex Infotech. Email: ${email}</p>
  </div>

  <div style="margin:20px 0;">
    <h2 style="font-size:20px; color:#333; border-bottom:2px solid #f4f4f4; padding-bottom:10px;">Submission Details</h2>
    <p style="font-size:16px; color:#555;"><strong>Name:</strong> ${name}</p>
    <p style="font-size:16px; color:#555;"><strong>Email:</strong> ${email}</p>
    <p style="font-size:16px; color:#555;"><strong>phone no:</strong> ${contactnumber}</p>
    <p style="font-size:16px; color:#555;"><strong>Message:</strong> ${message}</p>
   
  </div>

  <div style="text-align:center; padding-top:20px; border-top:1px solid #f4f4f4;">
    <p style="font-size:14px; color:#aaa;">&copy; 2024 Websolex Infotech. All rights reserved.</p>
  </div>
</div>

`, // html body
        });
        contactuserEmail(name, email)
        console.log(info);
    } catch (error) {
        console.log(error);
    }
};
const contactuserEmail = async (name, email) => {
    try {
        const info = await transporter.sendMail({
            from: '"Websolex infotech" <developerwebsolex@gmail.com>',
            to: email, // list of receivers
            subject: `Your contact from send websolex infotech contact will be soon`, // Subject line
            text: "your contact from send websolex infotech contact will be soon", // plain text body
            html: `<div style="background-color:#ffffff; margin:30px auto; padding:20px; border-radius:10px; box-shadow:0 2px 4px rgba(0, 0, 0, 0.1); max-width:600px; width:100%;">
  <div style="text-align:center; padding-bottom:20px;">
    <img src="https://www.t3bucket.com/f/0-WebSolexInfotech-FullStackDevelopment20240624_154346.jpg" alt="WebSolex Logo" style="width:100px; border-radius:50%;" />
    <h1 style="margin:10px 0; font-size:24px; color:#333;">Contact Form Received</h1>
    <p style="margin:0; color:#666;">Trying to connect with Websolex Infotech. Email: ${email}</p>
  </div>

  <div style="margin:20px 0;">
    <h2 style="font-size:20px; color:#333; border-bottom:2px solid #f4f4f4; padding-bottom:10px;">Submission Details</h2>
    <p style="font-size:16px; color:#555;"><strong>Name:</strong> ${name}</p>
    <p style="font-size:16px; color:#555;"><strong>Email:</strong> ${email}</p>
  </div>

  <div style="text-align:center; padding-top:20px; border-top:1px solid #f4f4f4;">
    <p style="font-size:14px; color:#aaa;">&copy; 2024 Websolex Infotech. All rights reserved.</p>
  </div>
</div>

`, // html body
        });
        console.log(info);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { sendemail, subscribeEmail, contactEmail };
