const recommendForJob = (description: string, recommendationLink: string) => {
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
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        display: inline-block;
        margin-top: 20px;
      }
      .job-list {
        list-style-type: none;
        padding: 0;
      }
      .job-list li {
        background-color: #f9f9f9;
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ddd;
      }
      .job-list a {
        text-decoration: none;
        color: #007bff;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Welcome to Devidends!</h2>
      </div>
      <p>Dear Devidends Recommender,</p>
      <p>We are excited to have you as a recommender at Devidends!</p>
      <p>
        Your insights are invaluable to us. Here are the current job openings
        for which we are seeking your recommendations:
      </p>
      <h1>Job Description</h1>
      <p>${description}</p>
      <a href='${recommendationLink}' class="job-list">Recommend here</a>
      <p>
        If you know someone who would be a great fit for any of these positions,
        please click on the links above to submit your recommendation.
      </p>
      <p>
        Thank you for being a part of our community. Your recommendations are
        highly valued!
      </p>
      <p>Best regards,</p>
      <p>Devidend Team</p>
      <div class="footer">
        <p>Devidends, Addis Ababa, Ethiopia</p>
        <p>contact.devidends@org</p>
        <p><a href="http://www.devidends.org">www.devidends.org</a></p>
      </div>
    </div>
  </body>
</html>
`;
};

export default recommendForJob;
