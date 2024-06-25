const otp = (otp: number) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            padding: 10px 20px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            color: #ffffff;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            color: #333333;
            margin: 20px 0;
        }
        .otp {
            display: inline-block;
            background-color: #f4f4f4;
            padding: 10px 20px;
            font-size: 24px;
            letter-spacing: 4px;
            border: 1px solid #cccccc;
            border-radius: 4px;
        }
        .footer {
            padding: 10px 20px;
            text-align: center;
            color: #777777;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>One-Time Password (OTP)</h1>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>Your One-Time Password (OTP) for completing your transaction is:</p>
            <p class="otp">${otp}</p>
            <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
        </div>
        <div class="footer">
            <p>If you did not request this OTP, please ignore this email.</p>
            <p>Thank you,</p>
            <p>Your Company Name</p>
        </div>
    </div>
</body>
</html>
`;
};

export default otp;
