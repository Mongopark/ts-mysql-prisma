import Joi from "@hapi/joi";
import { SubscriptionType } from "@prisma/client";
import { RequestHandler } from "express";

const createAGent = Joi.object({
  email: Joi.string().email().required(),
  nin: Joi.string().length(11).required(),
  firstName: Joi.string().required(),
  surName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
  subscriptionType: Joi.string()
    .valid(
      SubscriptionType.BASIC,
      SubscriptionType.PREMIUM,
      SubscriptionType.STANDARD
    )
    .required(),
  stateId: Joi.string().required(),
  lgaId: Joi.string().required(),
  wardId:Joi.string().required(),
  cdaId:Joi.string().optional(),
  carpturNo: Joi.string().required(),
  dob:Joi.date().required(),
  gender:Joi.string().required(),

});
export const createAgentValidation: RequestHandler = async (req, res, next) => {
  try {
    await createAGent.validateAsync(req.body, { allowUnknown: false });
  } catch (error) {
    next();
  }

  next();
};
const login = Joi.object({
  emailOrCarpturNo:Joi.string().required(),
  password:Joi.string().required()
})
export const loginValidation :RequestHandler =  async (req ,res , next) =>{

try {
  await login.validateAsync(req.body, {
    allowUnknown:false
  })
  
} catch (error) {
  next(error)
  
}
  next()
}
