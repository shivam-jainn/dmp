/*
  Warnings:

  - You are about to drop the column `checkIn` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `checkOut` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `checkin` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkout` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "checkIn",
DROP COLUMN "checkOut",
ADD COLUMN     "checkin" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "checkout" TIMESTAMP(3) NOT NULL;
