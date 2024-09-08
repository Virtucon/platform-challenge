import {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountBalanceRequest,
  GetAccountBalanceResponse,
  GetAccountHistoryRequest,
  GetAccountHistoryResponse,
} from "@/models/dtos/account.dto";
import { IAccountRepository } from "@/repository/account/account.repository.interface";
import { Account } from "@prisma/client";
import { IAccountService } from "./account.service.interface";

export class AccountService implements IAccountService {
  private readonly _accountRepository: IAccountRepository;

  constructor(accountRepository: IAccountRepository) {
    this._accountRepository = accountRepository;
  }

  async createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    const account = {
      accountName: request.accountName,
    };
    return this._accountRepository.createAccount(account as Account);
  }

  async getBalance(request: GetAccountBalanceRequest): Promise<GetAccountBalanceResponse> {
    return this._accountRepository.getBalance(request.accountId);
  }

  async getHistory(request: GetAccountHistoryRequest): Promise<GetAccountHistoryResponse> {
    return this._accountRepository.getHistory(request.accountId);
  }
}
