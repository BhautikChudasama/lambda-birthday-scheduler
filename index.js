// Copyright 2020 Bhautik
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const moment = require("moment")();
const AWS = require("aws-sdk");
const sgMail = require("@sendgrid/mail");

AWS.config.getCredentials((err) => {
    if (err) return err;
});

sgMail.setApiKey(
    process.env.SG_KEY
);
AWS.config.update({ region: "us-east-1" });
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    var currentDate = `${moment.date()}/${moment.month() + 1}`;
    console.log(`EXECUTION DATE: ${currentDate}`);

    // 1) Match with Dynamodb birthday table
    var params = {
        FilterExpression: "#cg = :data",
        ExpressionAttributeNames: {
            "#cg": "birthDate",
        },

        ExpressionAttributeValues: {
            ":data": currentDate,
        },
        TableName: "Users",
    };

    try {
        // 2) Result
        var result = await ddb.scan(params).promise();
        if(result.Count > 0) {
            console.log(`Today Birthdays: ${result.Count}`);
            
            let final = await Promise.all(
                result.Items.map(async (user) => {
                    console.log(`Sending mail to ${user.mail}`);
                    const msg = {
                        to: user.mail,
                        from: {
                            email: "hello@bhautik.me",
                            name: "Bhautik",
                        },
                        reply_to: {
                            email: "hello@bhautik.me",
                            name: "Bhautik",
                        },
                        subject: `Happy Birthday, ${user.name} 😊`,
                        text: "I hope you have a great day today...",
                        html:
                            '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"> <meta http-equiv="X-UA-Compatible" content="IE=Edge"><!--[if (gte mso 9)|(IE)]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if (gte mso 9)|(IE)]> <style type="text/css"> body{width: 600px;margin: 0 auto;}table{border-collapse: collapse;}table, td{mso-table-lspace: 0pt;mso-table-rspace: 0pt;}img{-ms-interpolation-mode: bicubic;}</style><![endif]--> <style type="text/css"> body, p, div{font-family: arial,helvetica,sans-serif; font-size: 14px;}body{color: #000000;}body a{color: #1188E6; text-decoration: none;}p{margin: 0; padding: 0;}table.wrapper{width:100% !important; table-layout: fixed; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}img.max-width{max-width: 100% !important;}.column.of-2{width: 50%;}.column.of-3{width: 33.333%;}.column.of-4{width: 25%;}@media screen and (max-width:480px){.preheader .rightColumnContent, .footer .rightColumnContent{text-align: left !important;}.preheader .rightColumnContent div, .preheader .rightColumnContent span, .footer .rightColumnContent div, .footer .rightColumnContent span{text-align: left !important;}.preheader .rightColumnContent, .preheader .leftColumnContent{font-size: 80% !important; padding: 5px 0;}table.wrapper-mobile{width: 100% !important; table-layout: fixed;}img.max-width{height: auto !important; max-width: 100% !important;}a.bulletproof-button{display: block !important; width: auto !important; font-size: 80%; padding-left: 0 !important; padding-right: 0 !important;}.columns{width: 100% !important;}.column{display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; margin-left: 0 !important; margin-right: 0 !important;}.social-icon-column{display: inline-block !important;}}</style> </head> <body> <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;"> <div class="webkit"> <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF"> <tr> <td valign="top" bgcolor="#FFFFFF" width="100%"> <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td width="100%"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td><!--[if mso]> <center> <table><tr><td width="600"><![endif]--> <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center"> <tr> <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;"> <tr> <td role="module-content"> <p>I hope you have a great day today...</p></td></tr></table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="64efa4d4-043b-4982-a412-9d010d10b043"> <tbody> <tr> <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center"> <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="512" alt="" data-proportionally-constrained="true" data-responsive="false" src="http://cdn.mcauto-images-production.sendgrid.net/82cf15c98221d9d9/1cf0943b-5037-4305-bd81-551fb7d3e346/512x496.png" height="496"> </td></tr></tbody> </table></td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table> </td></tr></table> </div></center> </body> </html>',
                    };
                    await sgMail.send(msg);
                })
            );
            
        }
        
    } catch (e) {
        console.log(e);
        return `Error: ${e}`;
    }
};
