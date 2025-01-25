import { Category } from "@prisma/client";
import prisma from "config/prisma-client";

const categories = [Category.AUDIENCE, Category.MARKETPLACE, Category.VENDOR];

export const createUserCategory = async () => {
  await prisma.$transaction(async (tx) => {
    const existingCategories = await tx.userCategory.findMany({
      where: {
        category: { in: categories },
      },
      select: { category: true },
    });

    const existingCategoryNames = new Set(
      existingCategories.map((cat) => cat.category)
    );

    const newCategories = categories.filter(
      (cat) => !existingCategoryNames.has(cat)
    );

    if (newCategories.length > 0) {
      await tx.userCategory.createMany({
        data: newCategories.map((cat) => ({ category: cat })),
        skipDuplicates: true,
      });
    }
  });
};
