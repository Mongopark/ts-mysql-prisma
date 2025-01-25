import Joi from "@hapi/joi";
import { PropertyType, PropertyUsage } from "@prisma/client";
import { RequestHandler } from "express";

const createProperty = Joi.object({
  countryId: Joi.string().required(),
  stateId: Joi.string().required(),
  lgaId: Joi.string().required(),
  wardId: Joi.string().required(),
  cdaId: Joi.string().optional(),
  streetId: Joi.string().optional(),
  address: Joi.string().required(),
  propertyType: Joi.string()
    .valid(
      PropertyType.Bungalow,
      PropertyType.Estate,
      PropertyType.Land,
      PropertyType.ShoppingPlaza,
      PropertyType.StoreyBuilding
    )
    .required(),
  propertyUsage: Joi.string().valid(
    PropertyUsage.Commercial,
    PropertyUsage.Mixed,
    PropertyUsage.Personal
  ),
  images: Joi.array().items(Joi.string().required).required(),
});

export const createPropertyValidation: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    await createProperty.validateAsync(req.body, { allowUnknown: false });
  } catch (error) {
    next();
  }

  next();
};
