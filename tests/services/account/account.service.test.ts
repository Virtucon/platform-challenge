import { IAccountRepository } from "@/repository/account/account.repository.interface";
import {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountBalanceRequest,
  GetAccountBalanceResponse,
  GetAccountHistoryRequest,
  GetAccountHistoryResponse,
} from "@/models/dtos/account.dto";
import { AccountService } from "../../../src/services/account/account.service";

describe("AccountService", () => {
  let accountService: AccountService;
  let accountRepositoryMock: jest.Mocked<IAccountRepository>;

  beforeEach(() => {
    accountRepositoryMock = {
      createAccount: jest.fn(),
      getBalance: jest.fn(),
      getHistory: jest.fn(),
    };
    accountService = new AccountService(accountRepositoryMock);
  });

  describe("createAccount", () => {
    it("should call createAccount method on repository with correct parameters", async () => {
      const request: CreateAccountRequest = { accountName: "Test Account" };
      const response: CreateAccountResponse = { accountId: 1, accountName: "Test Account" };
      accountRepositoryMock.createAccount.mockResolvedValue(response);

      const result = await accountService.createAccount(request);

      expect(accountRepositoryMock.createAccount).toHaveBeenCalledWith({ accountName: request.accountName });
      expect(result).toEqual(response);
    });

    it("should throw error when repository throws error", async () => {
      const request: CreateAccountRequest = { accountName: "Test Account" };
      accountRepositoryMock.createAccount.mockRejectedValue(new Error("Error creating account"));

      await expect(accountService.createAccount(request)).rejects.toThrow("Error creating account");
    });
  });

  describe("getBalance", () => {
    it("should call getBalance method on repository with correct accountId", async () => {
      const request: GetAccountBalanceRequest = { accountId: 1 };
      const response: GetAccountBalanceResponse = { accountId: 1, balance: 100, accountName: "Test Account" };
      accountRepositoryMock.getBalance.mockResolvedValue(response);

      const result = await accountService.getBalance(request);

      expect(accountRepositoryMock.getBalance).toHaveBeenCalledWith(request.accountId);
      expect(result).toEqual(response);
    });

    it("should throw error when repository throws error", async () => {
      const request: GetAccountBalanceRequest = { accountId: 1 };
      accountRepositoryMock.getBalance.mockRejectedValue(new Error("Error getting balance"));

      await expect(accountService.getBalance(request)).rejects.toThrow("Error getting balance");
    });
  });

  describe("getHistory", () => {
    it("should call getHistory method on repository with correct accountId", async () => {
      const request: GetAccountHistoryRequest = { accountId: 1 };
      const response: GetAccountHistoryResponse = {
        accountId: 1,
        accountName: "Test Account",
        balance: 100,
        transactions: [],
      };
      accountRepositoryMock.getHistory.mockResolvedValue(response);

      const result = await accountService.getHistory(request);

      expect(accountRepositoryMock.getHistory).toHaveBeenCalledWith(request.accountId);
      expect(result).toEqual(response);
    });

    it("should throw error when repository throws error", async () => {
      const request: GetAccountHistoryRequest = { accountId: 1 };
      accountRepositoryMock.getHistory.mockRejectedValue(new Error("Error getting history"));

      await expect(accountService.getHistory(request)).rejects.toThrow("Error getting history");
    });
  });
});
