const recommenderInvitation = (recommendrName: string) => {
  return `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .header {
            background-color: #f7f7f7;
            padding: 10px 0;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }
        .footer {
            text-align: center;
            font-size: 0.9em;
            color: #777;
            margin-top: 20px;
        }
        .btn {
            background-color:#007BFF;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Welcome to Devidends!</h2>
        </div>
        <p>Dear ${recommendrName},</p>
        <p>We are thrilled to inform you that you have been selected as a recommender on our platform!</p>
        <p>To learn more about our services, please visit our website:</p>
        <a href="http://www.devidends.org" class="btn">Visit Our Website</a>
        <p>Thank you for joining us. We are excited to have you on board!</p>
        <p>Best regards,</p>
        <p>Devidend Team</p>
        <div class="footer">
            <p>Devidends, Addis Ababa, Ethiopia</p>
            <p>contact.devidends@org</p>
        </div>
    </div>
</body>
</html>
`;
};

export default recommenderInvitation;
