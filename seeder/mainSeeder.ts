import { createDefaultSuperAdmin } from "./createDefaultSuperAdmin";
import { createUserCategory } from "./userCategory";
import { createUserType } from "./userType";

export const MainSeeder = async () => {
  await createUserCategory();
  await createUserType();
  await createDefaultSuperAdmin();
  console.log("seeder successful");
};
