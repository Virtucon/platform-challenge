import { CreateAccountRequest, GetAccountBalanceRequest, GetAccountHistoryRequest } from "@/models/dtos/account.dto";
import { AccountRepository } from "@/repository/account/account.repository";
import { AccountService } from "@/services/account/account.service";
import { RequestValidator } from "@/utils/request-validator";
import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

export const accountService = new AccountService(new AccountRepository(new PrismaClient()));

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = new CreateAccountRequest(req.body.accountName);
    const { error } = await RequestValidator(CreateAccountRequest, request);
    if (error) return res.status(400).json({ message: error });
    const result = await accountService.createAccount(request);
    return res.json(result);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
});

router.get("/balance/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accountId = parseInt(req.params.id) || 0;
    const request = new GetAccountBalanceRequest(accountId);
    const result = await accountService.getBalance(request);
    return res.json(result);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
});

router.get("/history/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accountId = parseInt(req.params.id) || 0;
    const request = new GetAccountHistoryRequest(accountId);
    const result = await accountService.getHistory(request);
    return res.json(result);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
});

export default router;
