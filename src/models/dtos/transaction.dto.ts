import { TransactionType } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional } from "class-validator";

export class CreateTransactionRequest {
  @IsNumber()
  fromAccountId: number;

  @IsOptional()
  @IsNumber()
  toAccountId?: number;

  @IsNumber()
  amount: number;

  @IsEnum(TransactionType, { message: "Invalid transaction type" })
  transactionType: TransactionType;

  @IsOptional()
  @IsNumber()
  originalTxId?: number;

  constructor(
    fromAccountId: number,
    toAccountId: number,
    amount: number,
    transactionType: TransactionType,
    originalTxId?: number
  ) {
    this.fromAccountId = fromAccountId;
    this.toAccountId = toAccountId;
    this.amount = amount;
    this.transactionType = transactionType;
    this.originalTxId = originalTxId;
  }
}

export class CreateTransactionResponse {
  @IsNumber()
  id: number;

  @IsNumber()
  accountId: number;

  @IsNumber()
  amount: number;

  transactionType: TransactionType;

  constructor(id: number, accountId: number, amount: number, transactionType: TransactionType) {
    this.id = id;
    this.accountId = accountId;
    this.amount = amount;
    this.transactionType = transactionType;
  }
}
