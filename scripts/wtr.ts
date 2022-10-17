import { Card, PrismaClient, Variant } from '@prisma/client';
import fs from 'fs';
import yaml from 'yaml';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_SCRIPTING_URL } },
});

const load = async () => {
  const path = './fab_tcg_data/data/images.yaml';
  const file = fs.readFileSync(path, 'utf8');
  const images = yaml.parse(file) as { [key: string]: string };

  const cards: (Card & { variants: Variant[] })[] = [];
  const yamlBasePath = './fab_tcg_data/data/set_cards/002_WTR';

  fs.readdirSync(yamlBasePath).map((f) => {
    const path = `${yamlBasePath}/${f}`;
    const file = fs.readFileSync(path, 'utf8');
    const json = yaml.parse(file);
    delete json.set;
    cards.push({
      ...json,
      setKey: 'WTR',
      supertypes: (json.supertypes as unknown as string[])?.join(','),
      subtypes: (json.subtypes as unknown as string[])?.join(','),
      keywords: (json.keywords as unknown as string[])?.join(','),
      specializations: (json.specializations as unknown as string[])?.join(','),
      resources:
        json.resources !== undefined ? Number(json.resources) : undefined,
      cost: json.cost !== undefined ? Number(json.cost) : undefined,
      intellect:
        json.intellect !== undefined ? Number(json.intellect) : undefined,
      life: json.life !== undefined ? Number(json.life) : undefined,
      attack: json.attack !== undefined ? Number(json.attack) : undefined,
      defense: json.defense !== undefined ? Number(json.defense) : undefined,

      variants: json.variants.map((v: string) => ({
        key: v,
        src: getVariantSrc(v, images),
      })),
    });
  });

  try {
    await prisma.$connect();
    await prisma.set.upsert({
      where: { key: 'WTR' },
      create: { key: 'WTR', name: 'Welcome To Rathe' },
      update: { key: 'WTR', name: 'Welcome To Rathe' },
    });
    cards.forEach(async (c) => {
      await prisma.card.upsert({
        where: { key: c.key },
        create: { ...c, variants: { createMany: { data: c.variants } } },
        update: {
          ...c,
          variants: {
            updateMany: c.variants.map((v) => ({
              where: { key: v.key },
              data: v,
            })),
          },
        },
      });
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

function getVariantSrc(v: string, images: { [key: string]: string }) {
  const split = v.split('-');
  // strip finish from variant key to map to image src
  split.splice(2, 1);
  const key = split.join('-');
  return images[key];
}

load();
