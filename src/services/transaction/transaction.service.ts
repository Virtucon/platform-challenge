import { ITransactionRepository } from "@/repository/transaction/transaction.repository.interface";
import { ITransactionService } from "./transaction.service.interface";
import { CreateTransactionRequest, CreateTransactionResponse } from "@/models/dtos/transaction.dto";
import { Transaction, TransactionType } from "@prisma/client";

export class TransactionService implements ITransactionService {
  private readonly _transactionRepository: ITransactionRepository;

  constructor(transactionRepository: ITransactionRepository) {
    this._transactionRepository = transactionRepository;
  }

  async createTransaction(request: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    const transaction = {
      accountId: request.fromAccountId,
      amount: request.amount,
      type: request.transactionType,
    };

    switch (request.transactionType) {
      case TransactionType.DEPOSIT:
        return this._transactionRepository.createTransactionDeposit(transaction as Transaction);

      case TransactionType.WITHDRAWAL:
        return this._transactionRepository.createTransactionWithdrawal(transaction as Transaction);

      case TransactionType.TRANSFER:
        if (!request.toAccountId) {
          throw new Error("To account ID is required for transfer transactions");
        }
        return this._transactionRepository.createTransactionTransfer(transaction as Transaction, request.toAccountId);

      case TransactionType.REFUND:
        if (!request.toAccountId || !request.originalTxId) {
          throw new Error("toAccountId and originalTxId are required for refund transactions");
        }
        return this._transactionRepository.createTransactionRefund(
          transaction as Transaction,
          request.toAccountId,
          request.originalTxId
        );

      default:
        throw new Error(`Unsupported transaction type: ${request.transactionType}`);
    }
  }
}
