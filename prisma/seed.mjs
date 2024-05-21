import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const employees = [];

  for (let i = 0; i < 20; i++) {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const checkin = faker.date.between('2024-05-19T08:00:00Z', '2024-05-19T10:00:00Z');
    const checkout = new Date(checkin.getTime() + 8 * 60 * 60 * 1000); // 8 hours after check-in

    employees.push({
      name,
      email,
      checkin,
      checkout,
    });
  }

  await prisma.employee.createMany({
    data: employees,
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
