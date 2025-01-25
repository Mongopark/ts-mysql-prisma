import prisma from "config/prisma-client";
import { configs } from "config/app.config";
import { UserTypes } from "@prisma/client";
import { bcryptHashSync } from "utils/hash";

export const createDefaultSuperAdmin = async () => {
  const superAdmin = await prisma.user.findFirst({
    where: {
      UserType: {
        some: {
          type: UserTypes.SUPERADMIN,
        },
      },
    },
  });
  const userType = await prisma.userType.findFirst({
    where: {
      type: UserTypes.SUPERADMIN,
    },
  });
  if (!superAdmin && userType) {
    const hash = bcryptHashSync(configs.DEFAULT_SUPER_ADMIN_PW);
    await prisma.user.create({
      data: {
        email: configs.DEFAULT_SUPER_ADMIN_EMAIL,
        password: hash,
        firstName: "Imprxx",
        surName: "Imprxx",
        UserType: {
          connect: [{ id: userType?.id }],
        },
      },
    });
  }
};
