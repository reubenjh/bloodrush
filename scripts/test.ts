import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const load = async () => {
  await prisma.$connect();
  const card = await prisma.card.findFirst({
    select: { variants: true },
  });
  console.log(card);

  const set = await prisma.set.findFirst({
    select: { cards: true },
  });
  console.log(set);

  const variant = await prisma.variant.findFirst({
    select: { card: true },
  });
  console.log(variant);
  await prisma.$disconnect();
};

load();
