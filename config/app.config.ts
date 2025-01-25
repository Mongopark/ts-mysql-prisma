import { BaseError } from "errors";
import * as envVars from "./environment-variables";

export const configs = {
  ...envVars,
};

export const checkConfigs = () => {
 
  for (const [key, value] of Object.entries(configs)) {
    if (!value) {
      throw new BaseError(`Environment variable: ${key} missing.`);
    }
  }
};
