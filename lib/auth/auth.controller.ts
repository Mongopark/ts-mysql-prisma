import { RequestHandler } from "express";
import { AuthService } from "./auth.service";
import { successHandler } from "middleware";

export class AuthController {
  private authService = new AuthService();

  onboardAgent: RequestHandler = async (req, res, next) => {
    try {
      const data = await this.authService.onboardAgent(req.body, req.user.id);
      successHandler(res, {
        data: data,
        message: "agent created successful",
        statusCode: 201,
      });
    } catch (error) {
      next(error);
    }
  };
  login: RequestHandler = async (req, res, next) => {
    try {
      const data = await this.authService.login(req.body);
      successHandler(res, {
        data,
        message: "login successfully",
        statusCode: 201,
      });
    } catch (error) {
      next(error);
    }
  };
}
