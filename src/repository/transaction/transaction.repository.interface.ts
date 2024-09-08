import { CreateTransactionResponse } from "@/models/dtos/transaction.dto";
import { Transaction } from "@prisma/client";

export interface ITransactionRepository {
  createTransactionDeposit(transaction: Transaction): Promise<CreateTransactionResponse>;
  createTransactionWithdrawal(transaction: Transaction): Promise<CreateTransactionResponse>;
  createTransactionTransfer(transaction: Transaction, toAccountId: number): Promise<CreateTransactionResponse>;
  createTransactionRefund(
    transaction: Transaction,
    toAccountId: number,
    originalTxId: number
  ): Promise<CreateTransactionResponse>;
}
