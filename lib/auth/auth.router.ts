import { Router } from "express";
import { AuthController } from "./auth.controller";
import { verifyUser } from "middleware";
import { superAdminGuard } from "shared/guard/superAdmin.guard";
import { createAgentValidation, loginValidation } from "./validation";

const router = Router();
const controller = new AuthController();
/**
 * @openapi
 * /api/v1/auth/onboard-agent:
 *   post:
 *     tags:
 *       - Authentication Management
 *     summary: Onboard a new agent
 *     description: Creates a new agent in the system. This endpoint requires a super admin and user verification.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The agent's email address.
 *                 example: agent@example.com
 *               nin:
 *                 type: string
 *                 minLength: 11
 *                 maxLength: 11
 *                 description: National Identification Number.
 *                 example: 12345678901
 *               firstName:
 *                 type: string
 *                 description: The agent's first name.
 *                 example: John
 *               surName:
 *                 type: string
 *                 description: The agent's last name.
 *                 example: Doe
 *               phoneNumber:
 *                 type: string
 *                 description: The agent's phone number.
 *                 example: +2348012345678
 *               gender:
 *                 type: string
 *                 description: The agent's gender
 *                 example: male
 *               dob:
 *                 type: date
 *               address:
 *                 type: string
 *                 description: The agent's residential address.
 *                 example: 123 Main Street, Lagos
 *               subscriptionType:
 *                 type: string
 *                 enum:
 *                   - BASIC
 *                   - PREMIUM
 *                   - STANDARD
 *                 description: The agent's subscription type.
 *                 example: PREMIUM
 *               stateId:
 *                 type: string
 *                 description: ID of the state where the agent resides.
 *                 example: state123
 *               lgaId:
 *                 type: string
 *                 description: ID of the Local Government Area.
 *                 example: lga456
 *               wardId:
 *                 type: string
 *                 description: ID of the ward
 *                 example: ward123
 *               cdaId:
 *                 type: string
 *                 descrption: ID of the CDA
 *                 example: cda123
 *               carpturNo:
 *                 type: string
 *                 description: Unique Carptur Number.
 *                 example: CARPTUR12345
 *             required:
 *               - email
 *               - nin
 *               - firstName
 *               - surName
 *               - phoneNumber
 *               - address
 *               - subscriptionType
 *               - stateId
 *               - lgaId
 *               - carpturNo
 *     responses:
 *       201:
 *         description: Agent onboarded successfully.
 *       400:
 *         description: Validation error or bad request.
 *       401:
 *         description: Unauthorized access.
 *       403:
 *         description: Forbidden - insufficient permissions.
 *       500:
 *         description: Internal server error.
 */

router
  .route("/onboard-agent")
  .post(
    verifyUser,
    superAdminGuard,
    createAgentValidation,
    controller.onboardAgent
  );

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication Management
 *     summary: User login
 *     description: Authenticates a user using their email or carptur number and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailOrCarpturNo:
 *                 type: string
 *                 description: The user's email address or Carptur number.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: StrongP@ssw0rd
 *             required:
 *               - emailOrCarpturNo
 *               - password
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         description: Validation error or missing required fields.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */

router.route("/login").post(loginValidation, controller.login);

export { router as AuthRouter };
