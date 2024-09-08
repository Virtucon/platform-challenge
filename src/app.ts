import express from "express";
import accountRouter from "./routes/account.routes";
import transactionRouter from "./routes/transaction.routes";

const app = express();

app.use(express.json());

app.use("/account", accountRouter);
app.use("/transaction", transactionRouter);

export default app;
