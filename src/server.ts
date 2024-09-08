import app from "./app";
import { prismaClient } from "./prisma-client";

prismaClient
  .createConnection()
  .then(async () => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log(err));
