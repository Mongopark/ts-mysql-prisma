import { ApartMent, Landlord, Prisma, Property } from "@prisma/client";
import prisma from "config/prisma-client";
import { BadRequestError } from "errors";

export class PropertyRepository {
  findOne = async (
    where: Prisma.PropertyWhereInput
  ): Promise<Property & { ApartMent: ApartMent[]; landlord: { userId: string } } | null> => {
    const property = await prisma.property.findFirst({
      where,
      include: {
        ApartMent: true,
        landlord:{
            select:{
                userId:true
            }
        }
      },
    });
    if (!property) {
      throw new BadRequestError("property not found");
    }
    return property;
  };
}
