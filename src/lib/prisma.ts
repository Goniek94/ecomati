// Prisma Client singleton for Next.js
// Prevents multiple instances in development due to hot reloading

import { PrismaClient } from "@prisma/client";

// 👇 TO JEST TA MAGICZNA LINIJKA NAPRAWIAJĄCA BŁĄD "SERIALIZE BIGINT" 👇
// Bez tego JavaScript nie umie wysłać numerów ID (BigInt) do przeglądarki
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};
// 👆 KONIEC FIXA 👆

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
