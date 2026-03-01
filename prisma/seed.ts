import { Prisma } from "@prisma/client";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";
import { faker } from "@faker-js/faker";

// создаёт тестовые данные
async function up() {
  const users = await prisma.user.createManyAndReturn({
    data: [
      {
        activated: true,
        email: "user@test.com",
        username: "user",
        password: hashSync("user", 10),
        imageUrl: 'https://entih8fu65opczku.public.blob.vercel-storage.com/Cat%20with%20soviet%20hat-jbfx9QycFSP9EjdYKwjOTfNsXdvuMv.jpg'
      },

      {
        activated: true,
        email: "admin@test.com",
        username: "admin",
        password: hashSync("admin", 10),
        role: "ADMIN",
        imageUrl: 'https://entih8fu65opczku.public.blob.vercel-storage.com/hRLB3BWK-avAhmdYJfkuoGnzDW8JBqAex4KiAFE.jpg'
      },
    ],
  });

  let restUsers: Prisma.UserCreateInput[] = [];
  for (let i = 0; i < 50; i++) {
    restUsers.push({
      activated: true,
      email: crypto.randomUUID() + '@test.com',
      username: faker.person.firstName(),
      createdAt: faker.date.between({
        from: "2020-01-01T00:00:00.000Z",
        to: "2025-01-01T00:00:00.000Z",
      }),
      password: hashSync("user", 10)
    });
  }

  const chat = await prisma.chat.create({
    data: {
      type: 'PRIVATE',
    }
  })
  console.log('created chat')

  await prisma.chatMember.createMany({
    data: [
      {
        chatId: chat.id,
        userId: users[0].id
      },

      {
        chatId: chat.id,
        userId: users[1].id
      }
    ]
  })
  console.log('created chat members')
  let messages = [] 

  for (let i = 0; i < 100; i++) {
    messages.push({
        chatId: chat.id,
        content: faker.lorem.paragraph(5),
        userId: users[0].id,
        createdAt: faker.date.between({
        from: "2020-01-01T00:00:00.000Z",
        to: "2025-01-01T00:00:00.000Z",
      }),
      })
  }
  
  await prisma.message.createMany({
    data: messages
  })
  console.log('created messages')

  

  await prisma.user.createMany({
    data: restUsers,
  });

  console.log("created users");

  let posts = [{
    authorId: users[0].id,
    title: 'linkin park',
    content: 'some text about the band history',
    createdAt: new Date()
  }];
  for (let i = 0; i < 70; i++) {
    posts.push({
      authorId: users[0].id,
      content: faker.lorem.paragraph({ min: 3, max: 5 }),
      title: faker.lorem.words({ min: 3, max: 5 }),
      createdAt: faker.date.between({
        from: "2020-01-01T00:00:00.000Z",
        to: "2025-01-01T00:00:00.000Z",
      }),
    });
  }

  const createdPosts = await prisma.post.createManyAndReturn({
    data: posts,
  });
  console.log("created posts");

  let comments = [];
  for (let i = 0; i < 40; i++) {
    comments.push({
      authorId: users[0].id,
      content: faker.lorem.words({ min: 3, max: 20 }),
      // @ts-ignore
      postId: createdPosts[0].id,
      createdAt: faker.date.between({
        from: "2020-01-01T00:00:00.000Z",
        to: "2025-01-01T00:00:00.000Z",
      }),
    });
  }

  await prisma.comment.createMany({
    data: comments,
  });

  console.log("created comments");
}

// зачищает таблицы в базе данных
async function down() {
  await prisma.reaction.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.verificationCode.deleteMany();
  await prisma.message.deleteMany();
  await prisma.chatMember.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  await down();
  await up();
}

main()
  .then(() => {
    console.log("Test data has been pushed to database succesfully!");
  })
  .catch(async (error) => {
    console.error("Database SEED ERROR", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
