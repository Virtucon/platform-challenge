import { CreateTransactionRequest, CreateTransactionResponse } from "@/models/dtos/transaction.dto";

export interface ITransactionService {
  createTransaction(request: CreateTransactionRequest): Promise<CreateTransactionResponse>;
}
