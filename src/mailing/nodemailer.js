import nodemailer from 'nodemailer'
import logger from '../logs/logger.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false,
  auth: {
    user: "lewosfera@gmail.com",
    pass: "ctbd mzey asic mldg",
  },
});

export async function sendProductDeletedMail(receiverEmail, receiverName, productName) {
  const info = await transporter.sendMail({
    from: '"Lewi de LyJ Accesorios" <lewosfera@gmail.com>',
    to: receiverEmail,
    subject: "Producto eliminado",
    html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
        <title></title>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--[if !mso]>-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="x-apple-disable-message-reformatting" content="" />
        <meta content="target-densitydpi=device-dpi" name="viewport" />
        <meta content="true" name="HandheldFriendly" />
        <meta content="width=device-width" name="viewport" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
        <style type="text/css">
        table {
        border-collapse: separate;
        table-layout: fixed;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt
        }
        table td {
        border-collapse: collapse
        }
        .ExternalClass {
        width: 100%
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
        line-height: 100%
        }
        body, a, li, p, h1, h2, h3 {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        }
        html {
        -webkit-text-size-adjust: none !important
        }
        body, #innerTable {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale
        }
        #innerTable img+div {
        display: none;
        display: none !important
        }
        img {
        Margin: 0;
        padding: 0;
        -ms-interpolation-mode: bicubic
        }
        h1, h2, h3, p, a {
        line-height: inherit;
        overflow-wrap: normal;
        white-space: normal;
        word-break: break-word
        }
        a {
        text-decoration: none
        }
        h1, h2, h3, p {
        min-width: 100%!important;
        width: 100%!important;
        max-width: 100%!important;
        display: inline-block!important;
        border: 0;
        padding: 0;
        margin: 0
        }
        a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important
        }
        u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
        }
        a[href^="mailto"],
        a[href^="tel"],
        a[href^="sms"] {
        color: inherit;
        text-decoration: none
        }
        img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}
        </style>
        <style type="text/css">
        @media (min-width: 481px) {
        .hd { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .hm { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (min-width: 481px) {
        h1,img,p{margin:0;Margin:0}.t24,.t4{overflow:hidden!important}img,p{font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}h1{font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2,h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-weight:400;font-style:normal;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{line-height:30px;font-size:24px}h3{line-height:26px;font-size:20px}.t3{mso-line-height-alt:100px!important;line-height:100px!important;display:block!important}.t4{border-top-left-radius:14px!important;border-top-right-radius:14px!important;width:600px!important}.t11,.t15,.t19,.t22,.t24,.t7{width:540px!important}.t24{border-bottom-right-radius:14px!important;border-bottom-left-radius:14px!important}
        }
        </style>
        <style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}.moz-text-html h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t3{mso-line-height-alt:100px!important;line-height:100px!important;display:block!important}.moz-text-html .t4{border-top-left-radius:14px!important;border-top-right-radius:14px!important;overflow:hidden!important;width:600px!important}.moz-text-html .t24{border-bottom-right-radius:14px!important;border-bottom-left-radius:14px!important;overflow:hidden!important;width:540px!important}.moz-text-html .t11,.moz-text-html .t15,.moz-text-html .t19,.moz-text-html .t22,.moz-text-html .t7{width:540px!important}</style>
        <!--[if !mso]>-->
        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400&amp;display=swap" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <!--[if mso]>
        <style type="text/css">
        img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}div.t3{mso-line-height-alt:100px !important;line-height:100px !important;display:block !important}td.t4{border-top-left-radius:14px !important;border-top-right-radius:14px !important;overflow:hidden !important}td.t24{border-bottom-right-radius:14px !important;border-bottom-left-radius:14px !important;overflow:hidden !important}
        </style>
        <![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        </head>
        <body id="body" class="t28" style="min-width:100%;Margin:0px;padding:0px;background-color:#292929;"><div class="t27" style="background-color:#292929;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t26" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#292929;" valign="top" align="center">
        <!--[if mso]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
        <v:fill color="#292929"/>
        </v:background>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t3" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;&nbsp;</div></td></tr><tr><td>
        <!--[if mso]>
        <table class="t5" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t5" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t4" style="background-color:#FF8FB8;width:600px;padding:40px 0 40px 0;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t4" style="background-color:#FF8FB8;width:480px;padding:40px 0 40px 0;">
        <!--<![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
        <!--[if mso]>
        <table class="t2" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t2" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t1" style="width:60px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t1" style="width:60px;">
        <!--<![endif]-->
        <div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="60" height="60" alt="" src="https://babcb34f-98e3-4c15-ab83-e13b6ca68592.b-cdn.net/e/aefd30b6-ed4c-4743-b8e7-63e9d91052a4/ae60a536-f84c-4fcb-8854-474a04a93530.png"/></div></td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td></tr><tr><td>
        <!--[if mso]>
        <table class="t25" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t25" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t24" style="background-color:#FFFFFF;width:600px;padding:40px 30px 40px 30px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t24" style="background-color:#FFFFFF;width:420px;padding:40px 30px 40px 30px;">
        <!--<![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
        <!--[if mso]>
        <table class="t8" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t8" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t7" style="width:540px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t7" style="width:420px;">
        <!--<![endif]-->
        <p class="t6" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;">Hola ${receiverName},</p></td>
        </tr></table>
        </td></tr><tr><td><div class="t9" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td>
        <!--[if mso]>
        <table class="t12" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t12" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t11" style="width:540px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t11" style="width:420px;">
        <!--<![endif]-->
        <p class="t10" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Le informamos que el producto "${productName}" publicado por usted en la web de L&J Accesorios fué removido.</p></td>
        </tr></table>
        </td></tr><tr><td><div class="t14" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td>
        <!--[if mso]>
        <table class="t16" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t16" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t15" style="width:540px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t15" style="width:420px;">
        <!--<![endif]-->
        <p class="t13" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Si crees que esto es un error por favor comunicate con nosotros desde la web.</p></td>
        </tr></table>
        </td></tr><tr><td><div class="t17" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td>
        <!--[if mso]>
        <table class="t20" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t20" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t19" style="width:540px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t19" style="width:420px;">
        <!--<![endif]-->
        <p class="t18" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Gracias!</p></td>
        </tr></table>
        </td></tr><tr><td>
        <!--[if mso]>
        <table class="t23" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t23" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t22" style="width:540px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t22" style="width:420px;">
        <!--<![endif]-->
        <p class="t21" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">El equipo de L&amp;J Accesorios</p></td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td></tr></table></td></tr></table></div></body>
        </html>
    `
  });
  if (info) {
    return true
  }
}

export async function sendAccountDeletedForInactivityMail(receiverEmail, receiverName) {
  const info = await transporter.sendMail({
    from: '"Lewi de LyJ Accesorios" <lewosfera@gmail.com>',
    to: receiverEmail,
    subject: "Inactividad de cuenta",
    html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
        <title></title>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--[if !mso]>-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="x-apple-disable-message-reformatting" content="" />
        <meta content="target-densitydpi=device-dpi" name="viewport" />
        <meta content="true" name="HandheldFriendly" />
        <meta content="width=device-width" name="viewport" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
        <style type="text/css">
        table {
        border-collapse: separate;
        table-layout: fixed;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt
        }
        table td {
        border-collapse: collapse
        }
        .ExternalClass {
        width: 100%
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
        line-height: 100%
        }
        body, a, li, p, h1, h2, h3 {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        }
        html {
        -webkit-text-size-adjust: none !important
        }
        body, #innerTable {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale
        }
        #innerTable img+div {
        display: none;
        display: none !important
        }
        img {
        Margin: 0;
        padding: 0;
        -ms-interpolation-mode: bicubic
        }
        h1, h2, h3, p, a {
        line-height: inherit;
        overflow-wrap: normal;
        white-space: normal;
        word-break: break-word
        }
        a {
        text-decoration: none
        }
        h1, h2, h3, p {
        min-width: 100%!important;
        width: 100%!important;
        max-width: 100%!important;
        display: inline-block!important;
        border: 0;
        padding: 0;
        margin: 0
        }
        a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important
        }
        u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
        }
        a[href^="mailto"],
        a[href^="tel"],
        a[href^="sms"] {
        color: inherit;
        text-decoration: none
        }
        img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}
        </style>
        <style type="text/css">
        @media (min-width: 481px) {
        .hd { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .hm { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (min-width: 481px) {
        h1,img,p{margin:0;Margin:0}.t24,.t4{overflow:hidden!important}img,p{font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}h1{font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2,h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-weight:400;font-style:normal;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{line-height:30px;font-size:24px}h3{line-height:26px;font-size:20px}.t3{mso-line-height-alt:100px!important;line-height:100px!important;display:block!important}.t4{border-top-left-radius:14px!important;border-top-right-radius:14px!important;width:600px!important}.t11,.t15,.t19,.t22,.t24,.t7{width:540px!important}.t24{border-bottom-right-radius:14px!important;border-bottom-left-radius:14px!important}
        }
        </style>
        <style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}.moz-text-html h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t3{mso-line-height-alt:100px!important;line-height:100px!important;display:block!important}.moz-text-html .t4{border-top-left-radius:14px!important;border-top-right-radius:14px!important;overflow:hidden!important;width:600px!important}.moz-text-html .t24{border-bottom-right-radius:14px!important;border-bottom-left-radius:14px!important;overflow:hidden!important;width:540px!important}.moz-text-html .t11,.moz-text-html .t15,.moz-text-html .t19,.moz-text-html .t22,.moz-text-html .t7{width:540px!important}</style>
        <!--[if !mso]>-->
        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400&amp;display=swap" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <!--[if mso]>
        <style type="text/css">
        img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}div.t3{mso-line-height-alt:100px !important;line-height:100px !important;display:block !important}td.t4{border-top-left-radius:14px !important;border-top-right-radius:14px !important;overflow:hidden !important}td.t24{border-bottom-right-radius:14px !important;border-bottom-left-radius:14px !important;overflow:hidden !important}
        </style>
        <![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        </head>
        <body id="body" class="t28" style="min-width:100%;Margin:0px;padding:0px;background-color:#292929;"><div class="t27" style="background-color:#292929;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t26" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#292929;" valign="top" align="center">
        <!--[if mso]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
        <v:fill color="#292929"/>
        </v:background>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t3" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;&nbsp;</div></td></tr><tr><td>
        <!--[if mso]>
        <table class="t5" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t5" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t4" style="background-color:#FF8FB8;width:600px;padding:40px 0 40px 0;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t4" style="background-color:#FF8FB8;width:480px;padding:40px 0 40px 0;">
        <!--<![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
        <!--[if mso]>
        <table class="t2" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t2" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t1" style="width:60px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t1" style="width:60px;">
        <!--<![endif]-->
        <div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="60" height="60" alt="" src="https://babcb34f-98e3-4c15-ab83-e13b6ca68592.b-cdn.net/e/aefd30b6-ed4c-4743-b8e7-63e9d91052a4/ae60a536-f84c-4fcb-8854-474a04a93530.png"/></div></td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td></tr><tr><td>
        <!--[if mso]>
        <table class="t25" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t25" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t24" style="background-color:#FFFFFF;width:600px;padding:40px 30px 40px 30px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t24" style="background-color:#FFFFFF;width:420px;padding:40px 30px 40px 30px;">
        <!--<![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
        <!--[if mso]>
        <table class="t8" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t8" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t7" style="width:540px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t7" style="width:420px;">
        <!--<![endif]-->
        <p class="t6" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;">Hola ${receiverName},</p></td>
        </tr></table>
        </td></tr><tr><td><div class="t9" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td>
        <!--[if mso]>
        <table class="t12" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t12" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t11" style="width:540px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t11" style="width:420px;">
        <!--<![endif]-->
        <p class="t10" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Lamentamos informarte que tu cuenta ha sido removida de L&amp;J Accesorios por inactividad.</p></td>
        </tr></table>
        </td></tr><tr><td><div class="t14" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td>
        <!--[if mso]>
        <table class="t16" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t16" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t15" style="width:540px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t15" style="width:420px;">
        <!--<![endif]-->
        <p class="t13" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Si crees que esto es un error por favor comunicate con nosotros desde la web.</p></td>
        </tr></table>
        </td></tr><tr><td><div class="t17" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td>
        <!--[if mso]>
        <table class="t20" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t20" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t19" style="width:540px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t19" style="width:420px;">
        <!--<![endif]-->
        <p class="t18" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Gracias!</p></td>
        </tr></table>
        </td></tr><tr><td>
        <!--[if mso]>
        <table class="t23" role="presentation" cellpadding="0" cellspacing="0" align="center">
        <![endif]-->
        <!--[if !mso]>-->
        <table class="t23" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
        <!--<![endif]-->
        <tr>
        <!--[if mso]>
        <td class="t22" style="width:540px;">
        <![endif]-->
        <!--[if !mso]>-->
        <td class="t22" style="width:420px;">
        <!--<![endif]-->
        <p class="t21" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">El equipo de L&amp;J Accesorios</p></td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td></tr></table></td></tr></table></div></body>
        </html>
      `
  });
  if (info) {
    return true
  }
}
export async function sendForgotPwMail(receiver, link) {
  const info = await transporter.sendMail({
    from: '"Lewi de LyJ Accesorios" <lewosfera@gmail.com>',
    to: receiver,
    subject: "Reseteando tu contraseña",
    html: `
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
        <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="x-apple-disable-message-reformatting">
          <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
          <title></title>
            
            <style type="text/css">
              @media only screen and (min-width: 620px) {
          .u-row {
            width: 600px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
        
          .u-row .u-col-50 {
            width: 300px !important;
          }
        
          .u-row .u-col-100 {
            width: 600px !important;
          }
        
        }
        
        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col > div {
            margin: 0 auto;
          }
        }
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
        
        a[x-apple-data-detectors='true'] {
          color: inherit !important;
          text-decoration: none !important;
        }
        
        table, td { color: #000000; } #u_body a { color: #161a39; text-decoration: underline; }
            </style>
        
        
        
        <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
        
        </head>
        
        <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
          <!--[if IE]><div class="ie-container"><![endif]-->
          <!--[if mso]><div class="mso-container"><![endif]-->
          <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
          <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
            
        
        
        <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9">
          <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->
              
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div style="height: 100%;width: 100% !important;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
        <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Lato',sans-serif;" align="left">
                
          <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #f9f9f9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <tbody>
              <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                  <span>&#160;</span>
                </td>
              </tr>
            </tbody>
          </table>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
          </div>
        
        
        
        
        
        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #161a39;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #161a39;"><![endif]-->
              
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div style="height: 100%;width: 100% !important;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
        <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px;font-family:'Lato',sans-serif;" align="left">
                
          <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
            <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;">Please reset your password </span></p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
          </div>
        
        
        
        
        
        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
              
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div style="height: 100%;width: 100% !important;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
        <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left">
                
          <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
            <p style="line-height: 140%; margin: 0px; color: #000000; font-family: Lato, sans-serif; font-size: 14px; text-align: left; white-space: normal; background-color: #ffffff;"><span style="line-height: 25.2px; font-size: 18px; color: #666666;">Hola,</span></p>
        <p style="line-height: 140%; margin: 0px; color: #000000; font-family: Lato, sans-serif; font-size: 14px; text-align: left; white-space: normal; background-color: #ffffff;"> </p>
        <p style="line-height: 140%; margin: 0px; color: #000000; font-family: Lato, sans-serif; font-size: 14px; text-align: left; white-space: normal; background-color: #ffffff;"><span style="line-height: 25.2px; font-size: 18px; color: #666666;">Te mandamos este mail como respuesta a tu solicitud para cambiar el password en LyJ Accesorios.</span></p>
        <p style="line-height: 140%; margin: 0px; color: #000000; font-family: Lato, sans-serif; font-size: 14px; text-align: left; white-space: normal; background-color: #ffffff;"> </p>
        <p style="line-height: 140%; margin: 0px; color: #000000; font-family: Lato, sans-serif; font-size: 14px; text-align: left; white-space: normal; background-color: #ffffff;"><span style="line-height: 25.2px; font-size: 18px; color: #666666;">Para continuar, por favor clickea el siguiente enlace:</span></p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px;font-family:'Lato',sans-serif;" align="left">
                
          <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
        <div align="left">
          <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:52px; v-text-anchor:middle; width:241px;" arcsize="2%"  stroke="f" fillcolor="#18163a"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
<!--LINK-->         <a href="${link}" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #18163a; border-radius: 1px;-webkit-border-radius: 1px; -moz-border-radius: 1px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
              <span style="display:block;padding:15px 40px;line-height:120%;"><span style="font-size: 18px; line-height: 21.6px;">Reiniciar contraseña</span></span>
            </a>
            <!--[if mso]></center></v:roundrect><![endif]-->
        </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left">
                
          <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
            <p style="font-size: 14px; line-height: 140%;"><span style="color: #888888; font-size: 14px; line-height: 19.6px;"><em><span style="font-size: 16px; line-height: 22.4px;"><span style="line-height: 19.6px; font-family: Lato, sans-serif; font-size: 14px; text-align: left; white-space: normal; background-color: #ffffff; color: #888888;"><em style="line-height: inherit;"><span style="line-height: 22.4px; font-size: 16px;">Ignora este mail si no solicitaste ningún cambio.</span></em></span><br style="line-height: inherit; color: #000000; font-family: Lato, sans-serif; font-size: 14px; text-align: left; white-space: normal; background-color: #ffffff;" /> </span></em></span></p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
          </div>
        
        
        
        
        
        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #18163a;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #18163a;"><![endif]-->
              
        <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 20px 20px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
        <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
          <div style="height: 100%;width: 100% !important;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 20px 20px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
        <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;" align="left">
                
          <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
            <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px; color: #ecf0f1;">Contact</span></p>
        <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px; color: #ecf0f1;">1912  Mcwhorter Road, FL 11223</span></p>
        <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px; color: #ecf0f1;">+111 222 333 | Info@company.com</span></p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px 0px 0px 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
        <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
          <div style="height: 100%;width: 100% !important;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px 0px 0px 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
        <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:'Lato',sans-serif;" align="left">
                
          <div style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
            <p style="line-height: 140%; font-size: 14px;"><span style="font-size: 14px; line-height: 19.6px;"><span style="color: #ecf0f1; font-size: 14px; line-height: 19.6px;"><span style="line-height: 19.6px; font-size: 14px;">Company ©  All Rights Reserved</span></span></span></p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
          </div>
        
        
        
        
        
        <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9">
          <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #1c103b;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #1c103b;"><![endif]-->
              
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div style="height: 100%;width: 100% !important;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
        <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Lato',sans-serif;" align="left">
                
          <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #1c103b;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <tbody>
              <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                  <span>&#160;</span>
                </td>
              </tr>
            </tbody>
          </table>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
          </div>
        
        
        
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
          </tbody>
          </table>
          <!--[if mso]></div><![endif]-->
          <!--[if IE]></div><![endif]-->
        </body>
        
        </html>
        
        `
  });
  if (info) {
    return true
  }
}