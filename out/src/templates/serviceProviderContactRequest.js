"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serviceProviderContactRequest = (name, phone, email, about, company, website, address) => {
    return `<html>
<head>
    <title>Service Provider Contact Information</title>
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
            text-align: center;
            padding: 10px 0;
        }
        .logo {
            width: 100%;
            height: 100px; /* Set a specific height */
            object-fit: cover; /* Maintain aspect ratio and cover the area */
            margin-bottom: 20px;
        }
        .contact-details {
            margin-top: 20px;
        }
        .contact-details h3 {
            margin-bottom: 10px;
            color: #333;
        }
        .contact-details p {
            margin: 5px 0;
        }
        .signature {
            margin-top: 30px;
        }
        .ps {
            margin-top: 20px;
            font-style: italic;
        }
        .welcome-message {
            margin-top: 20px;
            font-size: 14px;
            color: #555;
            text-align: center;
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
            <h2>Service Provider Contact Information</h2>
        </div>

        <p>Dear ${name},</p>

        <p>Thank you for reaching out to us through our website. We are pleased to provide you with the contact information for the service provider you requested.</p>

        <div class="contact-details">
            <h3>Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}"</a>${email}</p>
            <p><strong>Phone:</strong> <a href="tel:${phone}</a></p>
            <p><strong>Website:</strong> ${website}</p>
            <p><strong>Company Address:</strong> ${address}</p>
            <p><strong>Work Details:</strong> ${about}</p>
        </div>

        <p>Please feel free to reach out to them directly to discuss your needs.</p>

        <p>If you have any further questions or require additional assistance, do not hesitate to contact us.</p>

        <p>If there is any problem, please contact us at <a href="mailto:helpdesk@devidends.org">helpdesk@devidends.org</a>.</p>

        <div class="signature">
            <p>Best regards,</p>
            <p><strong>Devidends Team</strong></p>
        </div>

   
        <div class="footer">
            <p>&copy; 2024 Devidends. All rights reserved.</p>
            <div class="welcome-message">
                <p>Thank you for choosing our service. At Devidends, your gateway to meaningful endeavors in international development, you can find everything you need.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
};
exports.default = serviceProviderContactRequest;
