import { Account, PrismaClient, Transaction } from "@prisma/client";
import { IAccountRepository } from "./account.repository.interface";
import { CreateAccountResponse, GetAccountBalanceResponse, GetAccountHistoryResponse } from "@/models/dtos/account.dto";

export class AccountRepository implements IAccountRepository {
  private _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async createAccount(account: Account): Promise<CreateAccountResponse> {
    const result = await this._prisma.account.create({
      data: account,
    });
    return new CreateAccountResponse(result.id, result.accountName);
  }

  async getBalance(accountId: number): Promise<GetAccountBalanceResponse> {
    const account = await this._prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new Error("Account not found");
    }

    return new GetAccountBalanceResponse(account.id, account.accountName, account.balance);
  }

  async getHistory(accountId: number): Promise<GetAccountHistoryResponse> {
    const account = await this._prisma.account.findUnique({
      where: { id: accountId },
      include: {
        transactions: {
          where: { accountId: accountId }, // Filter transactions by accountId
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!account) {
      throw new Error("Account not found");
    }

    return new GetAccountHistoryResponse(
      account.id,
      account.accountName,
      account.balance,
      account.transactions.map((transaction: Transaction) => {
        return {
          id: transaction.id,
          accountId: transaction.accountId,
          amount: transaction.amount,
          type: transaction.type,
          createdAt: transaction.createdAt,
        } as Transaction;
      })
    );
  }
}
