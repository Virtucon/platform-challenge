import { PrismaClient, Transaction } from "@prisma/client";
import { ITransactionRepository } from "./transaction.repository.interface";
import { CreateTransactionResponse } from "@/models/dtos/transaction.dto";

export class TransactionRepository implements ITransactionRepository {
  private _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async createTransactionDeposit(transaction: Transaction): Promise<CreateTransactionResponse> {
    return this._prisma.$transaction(async (tx) => {
      const account = await tx.account.findUnique({
        where: { id: transaction.accountId },
      });

      if (!account) {
        throw new Error("Account not found");
      }

      // Create the transaction
      const result = await tx.transaction.create({
        data: transaction,
      });

      const balance: number = account.balance + transaction.amount;

      await tx.account.update({
        where: { id: transaction.accountId },
        data: { balance: balance, updatedAt: new Date() },
      });

      // Return a structured response
      return new CreateTransactionResponse(result.id, result.accountId, result.amount, result.type);
    });
  }

  async createTransactionWithdrawal(transaction: Transaction): Promise<CreateTransactionResponse> {
    return this._prisma.$transaction(async (tx) => {
      const account = await tx.account.findUnique({
        where: { id: transaction.accountId },
      });

      if (!account) {
        throw new Error("Account not found");
      }

      // Create the transaction
      const result = await tx.transaction.create({
        data: transaction,
      });

      const balance: number = account.balance - transaction.amount;

      await tx.account.update({
        where: { id: transaction.accountId },
        data: { balance: balance, updatedAt: new Date() },
      });

      // Return a structured response
      return new CreateTransactionResponse(result.id, result.accountId, result.amount, result.type);
    });
  }

  async createTransactionTransfer(transaction: Transaction, toAccountId: number): Promise<CreateTransactionResponse> {
    return this._prisma.$transaction(async (tx) => {
      const fromAccount = await tx.account.findUnique({
        where: { id: transaction.accountId },
      });

      if (!fromAccount) {
        throw new Error("From account not found");
      }

      const toAccount = await tx.account.findUnique({
        where: { id: toAccountId },
      });

      if (!toAccount) {
        throw new Error("To account not found");
      }

      // Create the transaction
      const result = await tx.transaction.create({
        data: transaction,
      });

      const fromBalance: number = fromAccount.balance - transaction.amount;
      const toBalance: number = toAccount.balance + transaction.amount;

      await tx.account.update({
        where: { id: transaction.accountId },
        data: { balance: fromBalance, updatedAt: new Date() },
      });

      await tx.account.update({
        where: { id: toAccountId },
        data: { balance: toBalance, updatedAt: new Date() },
      });

      // Return a structured response
      return new CreateTransactionResponse(result.id, result.accountId, result.amount, result.type);
    });
  }

  async createTransactionRefund(
    transaction: Transaction,
    toAccountId: number,
    originalTxId: number
  ): Promise<CreateTransactionResponse> {
    return this._prisma.$transaction(async (tx) => {
      const originalTx = await tx.transaction.findUnique({
        where: { id: originalTxId },
      });

      if (!originalTx) {
        throw new Error("Original transaction not found");
      }

      const fromAccount = await tx.account.findUnique({
        where: { id: transaction.accountId },
      });

      if (!fromAccount) {
        throw new Error("From account not found");
      }

      const toAccount = await tx.account.findUnique({
        where: { id: toAccountId },
      });

      if (!toAccount) {
        throw new Error("To account not found");
      }

      // Create the transaction
      const result = await tx.transaction.create({
        data: transaction,
      });

      const fromBalance: number = fromAccount.balance - transaction.amount;
      const toBalance: number = toAccount.balance + transaction.amount;

      await tx.account.update({
        where: { id: transaction.accountId },
        data: { balance: fromBalance, updatedAt: new Date() },
      });

      await tx.account.update({
        where: { id: toAccountId },
        data: { balance: toBalance, updatedAt: new Date() },
      });

      // Return a structured response
      return new CreateTransactionResponse(result.id, result.accountId, result.amount, result.type);
    });
  }
}
