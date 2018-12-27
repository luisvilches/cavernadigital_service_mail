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
    let nombre = req.body.name
    let mensaje = req.body.mensaje

    let template = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head> </head>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <style type="text/css">
          * {
            text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
          }
    
          html {
            height: 100%;
            width: 100%;
          }
    
          body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            mso-line-height-rule: exactly;
          }
    
          div[style*="margin: 16px 0"] {
            margin: 0 !important;
          }
    
          table,
          td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
    
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
    
          .ReadMsgBody,
          .ExternalClass {
            width: 100%;
          }
    
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }
        </style>
        <!--[if gte mso 9]>
          <style type="text/css">
          li { text-indent: -1em; }
          table td { border-collapse: collapse; }
          </style>
          <![endif]-->
        <title> </title>
        <!-- content -->
        <!--[if gte mso 9]><xml>
           <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
          </xml><![endif]-->
      </head>
      <body class="body" style="margin: 0; width: 100%;">
        <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; margin: 0;">
          <tr>
            <td class="body__content" align="left" width="100%" valign="top" style="color: #000000; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px;">
              <div class="container" style="margin: 0 auto; width: 100%; max-width: 400px;"> <!--[if mso | IE]>
                <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 400px" width="400" align="center">
                  <tr>
                    <td> <![endif]-->
                      <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                        <tr class="container__row">
                          <td class="container__cell" width="100%" align="left" valign="top" style="background-color: #FFFFFF; border: 1px solid #222222;" bgcolor="#FFFFFF">
                            <div class="row" style="background-color: #222222;">
                              <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                <tr class="row__row">
                                  <td class="column col-sm-12" width="400" style="width: 100%" align="left" valign="top">
                                    <h4 class="header h4" style="margin: 20px 0; font-family: Helvetica,Arial,sans-serif; color: #FFFFFF; text-align: center;">Nuevo mensaje enviado desde el formulario web</h4>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <div class="row">
                              <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                <tr class="row__row">
                                  <td class="column col-sm-12" width="400" style="padding: 20px;width: 100%" align="left" valign="top">
                                    <p class="text p" style="display: block; margin: 14px 0; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; color: #44484F; font-weight: 200; text-align: left;">Nombre: ${nombre}</p>
                                    <p class="text p" style="display: block; margin: 14px 0; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; color: #44484F; font-weight: 200; text-align: left;">Correo: <a href="mailto:${remitente}" class="a"><span class="a__text">${remitente}</span></a></p>
                                    <p class="text p" style="display: block; margin: 14px 0; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; color: #44484F; font-weight: 200; text-align: left;">Mensaje:</p>
                                    <p class="text p" style="display: block; margin: 14px 0; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; color: #44484F; font-weight: 200; text-align: left;">${mensaje}</p>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <div class="row">
                              <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                <tr class="row__row">
                                  <td class="column col-sm-12" width="400" style="background-color: #222222;width: 100%" align="left" valign="top" bgcolor="#222222"> <img src="http://subirimagen.me/uploads/20181204204147.png" alt="head" border="0" class="img__block" width="611" style="max-width: 100%; width: 50%; margin: 20px auto; font-family: Arial; font-color: #000000; display: block;"
                                    /> </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </table> <!--[if mso | IE]> </td>
                  </tr>
                </table> <![endif]--> </div>
            </td>
          </tr>
        </table>
        <div style="display:none; white-space:nowrap; font-size:15px; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
      </body>
    </html>
    `;


    let mailOptions = {
        from: remitente + "<" + remitente + ">",
        to: ['luis@cavernadigital.cl','javier@cavernadigital.cl','nicolas@cavernadigital.cl'],
        subject: 'Formulario de contacto Caverna Digital',
        html: template
    };

    let smtp = {
        host: 'mail.cavernadigital.cl',
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
