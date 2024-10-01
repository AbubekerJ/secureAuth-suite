const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const posts = [];

  for (let i = 1; i <= 10; i++) {
    posts.push({
      title: `Post ${i}`,
      desc: `This is the description for post number ${i}.`,
    });
  }

  await prisma.post.createMany({
    data: posts,
  });
}

main()
  .then(() => {
    console.log('Database seeded with 10 posts successfully');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
