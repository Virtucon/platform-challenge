import { CreateTransactionRequest } from "@/models/dtos/transaction.dto";
import { TransactionRepository } from "@/repository/transaction/transaction.repository";
import { TransactionService } from "@/services/transaction/transaction.service";
import { RequestValidator } from "@/utils/request-validator";
import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

export const transactionService = new TransactionService(new TransactionRepository(new PrismaClient()));

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fromAccountId, toAccountId, amount, transactionType, originalTxId } = req.body;
    const request = new CreateTransactionRequest(fromAccountId, toAccountId, amount, transactionType, originalTxId);
    const { error } = await RequestValidator(CreateTransactionRequest, request);
    if (error) return res.status(400).json({ message: error });
    const result = await transactionService.createTransaction(request);
    return res.json(result);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
});

export default router;
