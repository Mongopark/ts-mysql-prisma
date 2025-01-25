import { Category, UserTypes } from "@prisma/client";
import prisma from "config/prisma-client";

const Types = [
  {
    type: UserTypes.AGENT,
    category: Category.VENDOR,
  },
  {
    type: UserTypes.LANDLORD,
    category: Category.VENDOR,
  },
  {
    type: UserTypes.LAWFIRM,
    category: Category.VENDOR,
  },
  {
    type: UserTypes.LOCALGOVT,
    category: Category.VENDOR,
  },
  {
    type: UserTypes.SUBADMIN,
    category: Category.MARKETPLACE,
  },
  {
    type: UserTypes.SUPERADMIN,
    category: Category.MARKETPLACE,
  },
  {
    type: UserTypes.TENANT,
    category: Category.AUDIENCE,
  },
];
export const createUserType = async () => {
  await prisma.$transaction(async (tx) => {
    await Promise.all(
      Types.map(async (type) => {
        const exist = await tx.userType.findFirst({
          where: {
            type: type.type,
          },
        });
        if (!exist) {
          const cat = await tx.userCategory.findFirst({
            where: {
              category: type.category,
            },
          });
          if (cat) {
            await tx.userType.create({
              data: {
                type: type.type,
                userCategory: {
                  connect: {
                    id: cat.id,
                  },
                },
              },
            });
          }
        }
      })
    );
  });
};
