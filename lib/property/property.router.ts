import { Router } from "express";
import { PropertyController } from "./property.controller";
import { landlordGuard } from "shared/guard/landlord.guard";
import { createPropertyValidation } from "./validation";

const router = Router();
const controller = new PropertyController();
/**
 * @openapi
 * /api/v1/property:
 *   post:
 *     summary: Create a new property
 *     tags:
 *       - Property Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - countryId
 *               - stateId
 *               - lgaId
 *               - wardId
 *               - address
 *               - propertyType
 *               - images
 *             properties:
 *               countryId:
 *                 type: string
 *                 description: ID of the country where the property is located
 *               stateId:
 *                 type: string
 *                 description: ID of the state where the property is located
 *               lgaId:
 *                 type: string
 *                 description: ID of the local government area where the property is located
 *               wardId:
 *                 type: string
 *                 description: ID of the ward where the property is located
 *               cdaId:
 *                 type: string
 *                 description: ID of the CDA (optional)
 *                 nullable: true
 *               streetId:
 *                 type: string
 *                 description: ID of the street (optional)
 *                 nullable: true
 *               address:
 *                 type: string
 *                 description: Full address of the property
 *               propertyType:
 *                 type: string
 *                 description: Type of the property
 *                 enum:
 *                   - Bungalow
 *                   - Estate
 *                   - Land
 *                   - ShoppingPlaza
 *                   - StoreyBuilding
 *               propertyUsage:
 *                 type: string
 *                 description: Usage of the property
 *                 enum:
 *                   - Commercial
 *                   - Mixed
 *                   - Personal
 *               images:
 *                 type: array
 *                 description: Array of image URLs
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Property successfully created
 *       400:
 *         description: Bad Request
 */

router
  .route("/")
  .post(landlordGuard, createPropertyValidation, controller.createProperty);
  export {router as PropertyRouter}
