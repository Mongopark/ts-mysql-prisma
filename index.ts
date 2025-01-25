import dotenv from "dotenv";
dotenv.config();
import { server } from "./app";
// import { mainSedeer } from "./seeder/main-seeder";
import prisma from "config/prisma-client";
// import { redisClient } from "config/redis-client";
import { checkConfigs } from "config/app.config";
import { MainSeeder } from "seeder/mainSeeder";
// import { DataStore } from "config/datastore";
// import { backgroundServices } from "background-services";
// import { releaseLock } from "helper/redis-lock";
// import { BILLING_LOCK_KEY } from "constants/lock-keys";
// import { appListeners } from "app-events/listeners/payment-listeners";
import { appListeners } from "events/listener";

const port = process.env.PORT || 5500;

const startApplication = async () => {
  try {
    checkConfigs();

    // const datastore = new DataStore(prisma, redisClient);
    // await datastore.connect();

    // await releaseLock(BILLING_LOCK_KEY);
    await MainSeeder();

    appListeners();

    server.listen(port, async () => {
      console.log(`App running on PORT ${port}`);
      // backgroundServices();
    });
  } catch (err) {
    console.log(err);
  }
};

startApplication();
