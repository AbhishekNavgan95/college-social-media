module.exports = otpTamplate = (email, otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                color: #333333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                border-bottom: 1px solid #dddddd;
            }
            .header h1 {
                margin: 0;
                color: #333333;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content h2 {
                margin: 0 0 20px;
                color: #555555;
            }
            .otp-code {
                display: inline-block;
                background-color: #f0f0f0;
                padding: 10px 20px;
                font-size: 24px;
                letter-spacing: 4px;
                margin: 20px 0;
                border-radius: 4px;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                border-top: 1px solid #dddddd;
                color: #777777;
            }
            .footer p {
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Tutorial Heaven</h1>
            </div>
            <div class="content">
                <h2>OTP Verification</h2>
                <p>Dear User,</p>
                <p>Thank you for registering with Tutorial Heaven. Please use the following OTP to complete your verification process:</p>
                <div class="otp-code">${otp}</div>
                <p>This OTP is valid for the next 5 minutes. Do not share this OTP with anyone.</p>
                <p>Your registered email: <strong>${email}</strong></p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Tutorial Heaven. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
  };