import { Prisma } from "@prisma/client";
import prisma from "config/prisma-client";
import { BadRequestError } from "errors";
import { paginate } from "shared/pagination/paginate";
import { PropertyRepository } from "shared/repository/property.repository";

export class PropertyService extends PropertyRepository {
  createProperty = async (body: any, userId: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    await prisma.property.create({
      data: {
        ...body,
        landlordId: user?.landlordId,
      },
    });
  };
  getPropertyByCarpturNo = async (carpturNo: string) => {
    const property = await prisma.property.findFirst({
      where: {
        landlord: {
          carpturNo,
        },
      },
      include: {
        ApartMent: true,
      },
    });
    if (!property) {
      throw new BadRequestError("property not found");
    }
    return property;
  };
  getMyProperty = async (
    page: number,
    limit: number,
    where: Prisma.PropertyWhereInput,
    include: Prisma.PropertyInclude
  ) =>
    await paginate("property", {
      page,
      limit,
      where,
      include,
      orderBy: {
        createdAt: "desc",
      },
    });

  getPublishedApartment = async (
    page: number,
    limit: number,
    where: Prisma.PublishApartmentWhereInput,
    include: Prisma.PublishApartmentInclude
  ) =>
    await paginate("publishApartment", {
      page,
      limit,
      where,
      include,
      orderBy: {
        createdAt: "desc",
      },
    });
  assignPropertyToAgent = async (
    propertyId: string,
    agentId: string,
    userId: string
  ) => {
    const property = await this.findOne({
      id: propertyId,
      landlord: {
        userId,
      },
    });
    if (property?.agentId) {
      throw new BadRequestError("property already assigned to an agent");
    }
    const agent = await prisma.agent.findUnique({
      where: {
        id: agentId,
      },
      include: {
        AgencyProfiling: true,
      },
    });
    if (!agentId) {
      throw new BadRequestError("agent not found");
    }
    if (!agent?.AgencyProfiling) {
      throw new BadRequestError(
        "This agent does not have agency coverage profiling record"
      );
    }
    if (agent.AgencyProfiling.assignedWardId !== property?.wardId) {
      throw new BadRequestError(
        "agent assigned ward must be the same with property ward"
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.propertyAssignment.create({
        data: {
          propertyId,
          agentId: agentId,
          landlordId: property?.landlordId!,
        },
      });
    });
  };
}
