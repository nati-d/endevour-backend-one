import cron from "node-cron";
import prisma from "../../prisma/client/prismaClient";

const closeExpiredTenders = async () => {
  try {
    const now = new Date();

    const expiredTenders = await prisma.tender.updateMany({
      where: {
        status: "open",
        closing_date: { lt: now },
      },
      data: {
        status: "closed",
      },
    });

    console.log(`Closed ${expiredTenders.count} expired tenders.`);
  } catch (error) {
    console.error("Error closing expired tenders:", error);
  }
};

const startCronJob = () => {
  cron.schedule("0 0 * * *", closeExpiredTenders);
};

export { startCronJob };
