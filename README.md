# express-ts-mysql-prisma-server-setup

Express Ts MySQL Prisma Server SetUp



# How to run the app locally in 5 steps

#### step 1; create and populate your .env file with the samples from the .env.example file


#### step 2; Install dependencies and create the dist file and verify type correctness with 'npm run build'
``` bash
npm run build
```

#### step 3; populate your database with prisma migrate, to do so, run 'npm run migrate', this command creates the tables, populates the tables and also initializes the database
``` bash
npm run migrate
```

#### step 4; skip this step in development; When it is time for production, the prisma migrate will be 'npm run db:deploy', used to deploy the database
``` bash
npm run db:deploy
```

#### step 5; Run your webapp in the terminal with 'npm run dev'
``` bash
npm run dev
```

### Your App is Ready!

#### step 6; visit the app locally on your browser at localhost:5500
http://localhost:5500/api/v1

#### step 7; visit the app swagger documentation on your browser at localhost:5500
http://localhost:5500/api/v1/swagger

#### step 8; alternatively visit the app on your browser at https://carptur-api-typescript.onrender.com/api/v1
https://carptur-api-typescript.onrender.com/api/v1




## Build Setup Summary

``` bash
# install dependencies
npm run build

# database migration
npm run migrate

# serve with hot reload at localhost:5500
# http://localhost:5500
npm run dev

```

# express-ts-mysql-prisma-server-setup