import { Prisma, PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.get("/equipments", async (req, res) => {
  const { max, search } = req.query;
  let equipments = await prisma.equipment.findMany();
  if (search && typeof search === "string") {
    equipments = equipments.filter((equipment) => {
      const searchableText = `${equipment.name} ${equipment.description}`;
      return searchableText.toLowerCase().includes(search.toLowerCase());
    });
  }

  if (max) {
    equipments = equipments.slice(
      equipments.length - Number(max),
      equipments.length
    );
  }
  res.json(equipments);
});

app.get("/equipment/:id", async (req, res) => {
  const { id } = req.params;
  const equipment = await prisma.equipment.findUnique({
    where: { id: Number(id) },
  });
  res.json(equipment);
});

app.post(`/equipments/new`, async (req, res) => {
  console.log(req);

  const { equipment } = req.body;

  if (!equipment) {
    return res.status(400).json({ message: "Event is required" });
  }

  const {
    name,
    description,
    ref,
    image,
    price,
    weight,
    height,
    isReservedPro,
  } = equipment;

  if (!equipment.name?.trim() || !equipment.ref?.trim()) {
    return res.status(400).json({ message: "Invalid data provided." });
  }

  const result = await prisma.equipment.create({
    data: {
      name,
      description,
      ref,
      image,
      price: parseFloat(price),
      weight: parseInt(weight),
      height: parseInt(height),
      isReservedPro: isReservedPro === "true" ? true : false,
    },
  });
  res.json(result);
});

app.get("/equipments/images", async (req, res) => {
  let images = await prisma.image.findMany();
  console.log(images);
  res.json(images);
});

app.delete(`/equipment/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.equipment.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(post);
});

app.put("/equipment/:id", async (req, res) => {
  const { id } = req.params;
  const { equipment } = req.body;

  const {
    name,
    description,
    ref,
    image,
    price,
    weight,
    height,
    isReservedPro,
  } = equipment;

  try {
    const updatedPost = await prisma.equipment.update({
      where: { id: Number(id) || undefined },
      data: {
        name,
        description,
        ref,
        image,
        price: parseFloat(price),
        weight: parseInt(weight),
        height: parseInt(height),
        isReservedPro: isReservedPro === "true" ? true : false,
      },
    });
    res.json(updatedPost);
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
});

/* app.put("/post/:id/views", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    res.json(post);
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
});

app.put("/publish/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postData = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        published: true,
      },
    });

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) || undefined },
      data: { published: !postData?.published },
    });
    res.json(updatedPost);
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
});



app.get("/user/:id/drafts", async (req, res) => {
  const { id } = req.params;

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .posts({
      where: { published: false },
    });

  res.json(drafts);
});

app.get(`/post/:id`, async (req, res) => {
  const { id }: { id?: string } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  res.json(post);
});

app.get("/feed", async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query;

  const or: Prisma.PostWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString as string } },
          { content: { contains: searchString as string } },
        ],
      }
    : {};

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...or,
    },
    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy as Prisma.SortOrder,
    },
  });

  res.json(posts);
}); */

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
