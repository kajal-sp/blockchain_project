const nodemailer = require("nodemailer");
const util = require("util");
var smtpTransport = require('nodemailer-smtp-transport');
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");


class Common {
  static async sendMail(email, htmlBody, subject) {
    try {
      var smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: 'gmail',
        port: 465,
      auth: {
          user: "kajal.kashyap.henceforth@gmail.com",
          pass: "efvtrhzvoacrtpnw"
       }
     });
      var mailOptions = {
        from: 'kajal.kashyap.henceforth@gmail.com',
        to: email,
        subject: subject,
        html: htmlBody
      };
      let mail = smtpTransport.sendMail(mailOptions)
      return mail;
    }
    catch (err) {
      console.log('err');
      console.log(err);
      throw err;
    }
  }

  //  return { msg: "email sent successfully" };

  //   var transporter = nodemailer.createTransport({
  // service: "Godaddy",
  // //host: "smtp.office365.com",
  // host: "smtp-mail.outlook.com",
  // secureConnection: true,
  // // port: 587,
  // port: 465,
  // auth: {
  //   user: process.env.EMAIL,
  //   pass: process.env.EMAIL_PASS
  // }
  //   host: "smtpout.secureserver.net",  
  //   secure: true,
  //   secureConnection: false, // TLS requires secureConnection to be false
  //   tls: {
  //       ciphers:'SSLv3'
  //   },
  //   requireTLS:true,
  //   port: 465,
  //   debug: true,
  //   auth: {
  //       user: process.env.EMAIL,
  //       pass: process.env.EMAIL_PASS 
  //   }
  // });
  // console.log('Email...2')

  // var mailOptions = {
  //   from: 'info@pocketstudioapp.com',
  //   to: email,
  //   subject: subject,
  //   text: verificationLink.toString() 
  // };
  // let mail = transporter.sendMail(mailOptions)
  // return mail;


  static async editEmailTemplate(path, editableData) {
    const readFile = util.promisify(fs.readFile);
    try {
      const content = await readFile(path, {
        encoding: "utf-8",
      });
      const template = handlebars.compile(content);
      return template(editableData);
    } catch (err) {
      console.log("Error==>", err);
      throw err;
    }
  }

  // static async forgotpassword(email) {
  //   let digits = '0123456789';
  //   let email_val = "";
  //   let reset_token = '';
  //   const result = await query('select * from users_data where email=?', [email]);
  //   email_val = result[0] ? result[0].email : null
  //   if (result.length > 0) {
  //     for (let i = 0; i < 6; i++) {
  //       reset_token += digits[Math.floor(Math.random() * 10)];
  //     }
  //     const result = await query('update users_data set reset_token=? where email=?', [reset_token, email]);
  //     var smtpTransport = nodemailer.createTransport({
  //       host: "smtp.gmail.com",
  //       service: 'gmail',
  //       port: 465,
  //       auth: {
  //         user: "kajal.kashyap.henceforth@gmail.com",
  //         pass: "efvtrhzvoacrtpnw"

  //       }

  //     });
  //     var mailOptions = {
  //       from: 'passwordreset@demo.com',
  //       to: email_val,
  //       subject: 'Password Reset Link',
  //       text: 'Reset password token' + ' ' + reset_token

  //     };
  //     smtpTransport.sendMail(mailOptions)
  //     return { msg: "email sent successfully" };



  //   } else {
  //     throw "Email does not exits";
  //   }


  // }
  static async generateRandomNumber(length) {
    var text = "";
    const possible = "123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    var random = parseInt(text);
    return random;
  }

  static async calculateSkipOffset(page = 0, limit = 20, default_limit = null) {
    return await this.minPage(page) * await this.minLimit(limit, default_limit);

  }

  static async minPage(page = 0) {
    if (!page || page <= 0) {
      page = 0;
    }
    return page;
  }
  static async minLimit(limit = 20, default_limit = null) {
    if (!limit || limit <= 0) {
      limit = default_limit ? default_limit : 20;
    }
    return limit;
  }

  static getData(data, limit, offset) {
    let start = offset;
    let end = start + limit;
    let result = data.slice(start, end);
    return result;
  }
}
module.exports = Common;