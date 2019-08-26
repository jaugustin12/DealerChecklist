require('dotenv').config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const details = require("./backend/details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.listen(3500, () => {
  console.log("The server started on port 3500 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  let data = req.body;
  sendMail(data, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  }).catch(err => console.log(err))
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  console.log('processssss===>>', process.env.RACKSPACE_EMAIL);
  let transporter = nodemailer.createTransport({
    host: "secure.emailsrvr.com",
    //requireTLS: true,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.RACKSPACE_EMAIL,
      pass: process.env.RACKSPACE_PASSWORD
    }
  });
  console.log(user.userDetails.email);

  let mailOptions = {
    from: 'augustinj@fitzgeraldautomall.com',/* '"Fitzmall"<example.gimail.com>' */ // sender address
    to: `${user.userDetails.managers}`, // list of receivers
    subject: "Dealer Checklist", // Subject line
    html: `Incoming Dealer Checklist:
    <h4>VIN: ${user.vin}</h4>
    <h4>walk around: ${user.walk}</h4>
    <h4>Scratches/ Nicks/ Dinks: ${user.flaws}</h4>
    <h4>Keys: ${user.keys}</h4>
    <h4>Accessory: ${user.accessory}</h4>
    <h4>SDCard: ${user.sdCard}</h4>
    <h4>Wheel Lock Key: ${user.wheelLockKey}</h4>
    <h4>Miles: ${user.miles}</h4>
    <h4>DX-Driver:${user.dxDriver}</h4>
    <h4>Thanks for joining us</h4>
    <h5>-${user.userDetails.fullName}</h5>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
  console.log("sent");
}

// main().catch(console.error);
