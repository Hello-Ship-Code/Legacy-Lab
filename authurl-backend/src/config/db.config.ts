import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// if (process.env.NODE_ENV === "development") {
//   (async () => {
//     try {
//       await prisma.$connect();
//       console.log("✅ Connected to the database successfully!");
//     } catch (err) {
//       console.error("❌ Database connection failed:", err);
//     }
//   })();
// }

export { prisma }
