import cron from "node-cron";
import prisma from "../lib/prisma";

cron.schedule("0 0 * * *", async () => {
  console.log("[CRON] Checking leave expiration...");

  const today = new Date();

  const expiredCategories = await prisma.leaveCategory.findMany({
    where: {
      expires_at: {
        lte: today,
      },
    },
  });

  for (const category of expiredCategories) {
    // Reset saldo semua employee
    await prisma.employeeLeaveBalance.updateMany({
      where: { category_id: category.id },
      data: { remaining_days: category.quota_days },
    });

    // Auto set expires_at ke 1 tahun berikutnya
    const nextExpire = new Date(category.expires_at);
    nextExpire.setFullYear(nextExpire.getFullYear() + 1);

    await prisma.leaveCategory.update({
      where: { id: category.id },
      data: { expires_at: nextExpire },
    });

    console.log(
      `[CRON] Reset leave category ${category.name}, next expire: ${nextExpire}`
    );
  }
});
