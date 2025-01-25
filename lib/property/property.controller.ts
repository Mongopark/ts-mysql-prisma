import { RequestHandler } from "express";
import { PropertyService } from "./property.service";
import { successHandler } from "middleware";
import { propertyQuery } from "./type";
import { Prisma } from "@prisma/client";

export class PropertyController {
  private propertyService = new PropertyService();

  createProperty: RequestHandler = async (req, res, next) => {
    try {
      const data = await this.propertyService.createProperty(
        req.body,
        req.user.id
      );
    } catch (error) {
      next(error);
    }
  };
  getPropertyByCarprtuNo: RequestHandler = async (req, res, next) => {
    try {
      const data = await this.propertyService.getPropertyByCarpturNo(
        req.params.carprtuNo
      );
      successHandler(res, {
        data,
        message: "okay",
        statusCode: 200,
      });
    } catch (error) {
      next(error);
    }
  };
  getMyProperties: RequestHandler = async (req, res, next) => {
    try {
      const { page, limit, search } = req.query as unknown as propertyQuery;
      const where: Prisma.PropertyWhereInput = {
        landlordId: req.user.id,
      };
      const include: Prisma.PropertyInclude = {
        ApartMent: true,
      };

      const data = await this.propertyService.getMyProperty(
        Number(page),
        Number(limit),
        where,
        include
      );
      successHandler(res, {
        data,
        message: "okay",
        statusCode: 200,
      });
    } catch (error) {
      next(error);
    }
  };
  getPublishedProperty: RequestHandler = async (req, res, next) => {
    const { page, limit, search } = req.query as unknown as propertyQuery;

    const where: Prisma.PublishApartmentWhereInput = {};
    const include: Prisma.PublishApartmentInclude = {
      apartment: {
        include: {
          property: {
            include: {
              street: true,
              Lga: true,

              state: true,
              country: true,
              landlord: {
                select: {
                  User: {
                    select: {
                      firstName: true,
                      surName: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
  };
  assignPropertyToAgent: RequestHandler = async (req, res, next) => {
    try {
      const data = await this.propertyService.assignPropertyToAgent(
        req.params.propertyId,
        req.params.agentId,
        req.user.id
      );
      successHandler(res, {
        data,
        message: "okay",
        statusCode: 200,
      });
    } catch (error) {
      next(error);
    }
  };
}
