import { CreateAccountResponse, GetAccountBalanceResponse, GetAccountHistoryResponse } from "@/models/dtos/account.dto";
import { Account } from "@prisma/client";

export interface IAccountRepository {
  createAccount(account: Account): Promise<CreateAccountResponse>;
  getBalance(accountId: number): Promise<GetAccountBalanceResponse>;
  getHistory(accountId: number): Promise<GetAccountHistoryResponse>;
}
