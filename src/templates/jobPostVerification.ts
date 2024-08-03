const jobPostVerificatoin = (userName: any) => {
  return `<html>
<head>
    <title>Job Posting Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 10px;
        }
        .header, .footer {
            text-align: left;
            padding: 10px 0;
        }
        .logo {
            width: 100%;
            height: 100px; /* Set a specific height */
            object-fit: cover; /* Maintain aspect ratio and cover the area */
            margin-bottom: 20px;
        }
        .message {
            margin-top: 20px;
            font-size: 14px;
            color: #555;
        }
        .signature {
            margin-top: 30px;
        }
        .footer p {
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://www.endevour.org/_next/static/media/Main%20black%20.faeff295.png" alt="Company Logo" class="logo">
            <h2>Job Posting Confirmation</h2>
        </div>

        <p>Dear ${userName},</p>

        <div class="message">
            <p>We are pleased to inform you that your job posting has been reviewed and successfully posted on our website.</p>
            <p>You may check it at your convenience by visiting our website.</p>
            <p>If you have any further questions or require additional assistance, please contact us at <a href="mailto:helpdesk@devidends.org">helpdesk@devidends.org</a>.</p>
        </div>

        <div class="signature">
            <p>Best regards,</p>
            <p><strong>Devidends Team</strong></p>
        </div>

        <div class="footer">
            <p>&copy; 2024 Devidends. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};
export default jobPostVerificatoin;
