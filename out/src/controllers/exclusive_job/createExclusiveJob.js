"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const sendEmail_1 = __importDefault(require("../../services/notifications/sendEmail"));
const createExclusiveJob = async (req, res) => {
    if (!req.auth)
        return;
    const { title, overview, recommenders_id, closing_date } = req.body;
    const file = req.file?.filename;
    const verifiedBy = req.auth?.id;
    let createdExclusiveJob;
    if (!file)
        return res.status(400).json(new response_1.default(false, "File not provided."));
    try {
        createdExclusiveJob = await prismaClient_1.default.exclusive_job.create({
            data: {
                title,
                overview,
                file,
                verified_by: verifiedBy,
                closing_date,
                recommenders: {
                    connect: JSON.parse(recommenders_id),
                },
            },
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to create exclusive job please try again."));
    }
    const htmlTemplate = () => `
  <html>
    <head>
      <title>Endevour Exclusive Job</title>
    </head>
    <body>
      <h1>${title}</h1>
      <p>${overview}</p>
      <a href = https://endevour.org/exclusive-jobs/recommend/${createdExclusiveJob.id}>Recommend here</>
    </body>
  </html>
`;
    const attachment_file = {
        filename: "detail.pdf",
        path: `https://api.endevour.org/public/files/exclusive_job/${file}`,
    };
    try {
        const recommenders = await prismaClient_1.default.exclusive_job.findUnique({
            where: { id: createdExclusiveJob.id },
            include: {
                recommenders: true,
            },
        });
        const recommendersEmail = recommenders?.recommenders
            .map((recommender) => recommender.email)
            .join(", ");
        await (0, sendEmail_1.default)(recommendersEmail ? recommendersEmail : "", "Recommend your best for the best.", htmlTemplate(), [attachment_file]);
        return res
            .status(201)
            .json(new response_1.default(true, "Emails send successfully to the recommenders.", createdExclusiveJob));
    }
    catch (error) {
        console.log(error);
        await prismaClient_1.default.exclusive_job.delete({
            where: {
                id: createdExclusiveJob.id,
            },
        });
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to send email for recommenders please try again!"));
    }
};
exports.default = createExclusiveJob;
