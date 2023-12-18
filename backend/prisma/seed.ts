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

const imageData: Prisma.ImageCreateInput[] = [
  {
    name: "049-0041-Nacelle-autom-art-diesel-16m-h474.jpg",
  },
  {
    name: "059-0070-main-bionique-ironhand-2-h474.jpg",
  },
  {
    name: "1410-FS-450-F-sans-disque-1-h474.jpg",
  },
  {
    name: "3410-ROXYFLAM-h474.jpg",
  },
  {
    name: "0050066-LOX-HUSQVARNA-DR350T-D-h474.jpg",
  },
  {
    name: "6829-ROBEND-3000-1-h474.jpg",
  },
  {
    name: "0150009-LOX-HUSQVARNA-TS350E-D-h474.jpg",
  },
  {
    name: "0330010-LOX-SDMO-VX200-D-h474.jpg",
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
  for (const i of imageData) {
    const image = await prisma.image.create({
      data: i,
    });
    console.log(`Created image with id: ${image.id}`);
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
