import { Transaction } from "@prisma/client";
import { IsString } from "class-validator";

export class CreateAccountRequest {
  @IsString()
  accountName: string;

  constructor(accountName: string) {
    this.accountName = accountName;
  }
}

export class CreateAccountResponse {
  accountId: number;
  accountName: string;

  constructor(accountId: number, accountName: string) {
    this.accountId = accountId;
    this.accountName = accountName;
  }
}

export class GetAccountBalanceRequest {
  accountId: number;

  constructor(accountId: number) {
    this.accountId = accountId;
  }
}

export class GetAccountBalanceResponse {
  accountId: number;
  accountName: string;
  balance: number;

  constructor(accountId: number, accountName: string, balance: number) {
    this.accountId = accountId;
    this.accountName = accountName;
    this.balance = balance;
  }
}

export class GetAccountHistoryRequest {
  accountId: number;

  constructor(accountId: number) {
    this.accountId = accountId;
  }
}

export class GetAccountHistoryResponse {
  accountId: number;
  accountName: string;
  balance: number;
  transactions: Transaction[];

  constructor(accountId: number, accountName: string, balance: number, transactions: Transaction[]) {
    this.accountId = accountId;
    this.accountName = accountName;
    this.balance = balance;
    this.transactions = transactions;
  }
}
