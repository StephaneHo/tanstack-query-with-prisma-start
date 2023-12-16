import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const equipmentData: Prisma.EquipmentCreateInput[] = [
  {
    name: "Nacelle sur vehicule leger",
    description:
      "Nacelle sur porteur VL, pour élever les personnes jusqu’à une hauteur de 18 mètres. La conduite du VL nécessite juste le permis B. Ce matériel est adapté aux interventions en extérieur.",
    isReservedPro: true,
    price: 372.83,
    ref: "049-0049",
    height: 25,
    image: "nacelle-vehicule-leger.jpg",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of equipmentData) {
    const equipment = await prisma.equipment.create({
      data: u,
    });
    console.log(`Created user with id: ${equipment.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
