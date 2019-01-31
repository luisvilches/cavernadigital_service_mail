const express = require('express');
const bodyParser = require('connect-multiparty')();
const NodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.post('/',bodyParser, (req,res) => {

    let remitente = req.body.mail
    let name = req.body.name
    let message = req.body.message
    let phone = req.body.phone;

    let template = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head> </head>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
      </head>
      <body class="body" style="margin: 0; width: 100%;">
      <table style="font-family:Verdana;font-size:12px;color:#333;max-width:600px;" align="center" cellpadding="0" width="" cellspacing="0" border="0">
      <tr>
      <td align="right" style="width:100px;"><img src="http://subirimagen.me/uploads/20181227172011.png" style="max-width:200px"></td>
      </tr>
      <tr><td height="20"></td></tr>
      <tr>
      <td style="padding:0 20px;">
      <h3 style="font-size:18px;margin:0;">Formulario de contacto web</h3>
      <br>
      <p style="margin:0;">Nombre: ${name}</p>
      <p style="margin:0;">Email: ${remitente}</p>
      <p style="margin:0;">Telefono: ${phone},</p>
      <br>
      <p style="margin:0;">Mensaje:</p>
      </td>
      </tr>
      <tr>
      <td style="padding:10px 10px 0 10px;margin:0;">
      <div style="background-color:#F7F7F7;border:1px solid #D7D7D7;padding:10px;font-size:12px;color:#333;">
      <p style="margin:0;">${message}</p>
      </div>
      </td>
      </tr>
      <tr></tr>
     <tr>
   </tr>
   </table>
      </body>
    </html>
    `;


    let mailOptions = {
        from: remitente + "<" + remitente + ">",
        to: ['luis@cavernadigital.cl','javier@cavernadigital.cl','hola@cavernadigital.cl'],
        subject: 'Formulario de contacto Caverna Digital',
        html: template
    };

    let smtp = {
        host: 'hosty16.dnshosty.net',
        port: 465,
        secure: true,
        auth: {
            user: 'no-reply@cavernadigital.cl',
            pass: '-xB8PnjSmA?2'
        },
        tls: {
            rejectUnauthorized: false
        }
    }

    let transporter = NodeMailer.createTransport(smtpTransport(smtp));

    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            res.status(500).json({error:error});
        } else {
            console.log("Email sent");
            res.status(200).json({success:true,message:"Formulario enviado con exito"});
        }
    })
})


app.listen(port, function(err){
    if(err) throw err;
    console.log('server running in port ' + port);
});
