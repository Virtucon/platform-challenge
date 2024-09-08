import {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountBalanceRequest,
  GetAccountBalanceResponse,
  GetAccountHistoryRequest,
  GetAccountHistoryResponse,
} from "@/models/dtos/account.dto";

export interface IAccountService {
  createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse>;
  getBalance(accountId: GetAccountBalanceRequest): Promise<GetAccountBalanceResponse>;
  getHistory(accountId: GetAccountHistoryRequest): Promise<GetAccountHistoryResponse>;
}
