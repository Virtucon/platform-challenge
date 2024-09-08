import { mockPrismaClient } from "../__mocks__/prismaClient.mock";
import { AccountRepository } from "../../../src/repository/account/account.repository";
import { PrismaClient } from "@prisma/client";
import { CreateAccountResponse, GetAccountBalanceResponse } from "@/models/dtos/account.dto";
import { mockAccount } from "../__mocks__/mockData";
import { IAccountRepository } from "./account.repository.interface";

jest.mock("@prisma/client");

describe("AccountRepository", () => {
  let repository: IAccountRepository;

  beforeEach(() => {
    (PrismaClient as any).mockImplementation(() => mockPrismaClient);
    repository = new AccountRepository(new PrismaClient());
  });

  describe("createAccount", () => {
    it("should call create method on prisma client with correct parameters", async () => {
      mockPrismaClient.account.create.mockResolvedValue(mockAccount);

      await repository.createAccount(mockAccount);

      expect(mockPrismaClient.account.create).toHaveBeenCalledWith({ data: mockAccount });
    });

    it("should return correct response", async () => {
      mockPrismaClient.account.create.mockResolvedValue(mockAccount);

      const result = await repository.createAccount(mockAccount);

      expect(result).toBeInstanceOf(CreateAccountResponse);
      expect(result).toEqual({ accountId: mockAccount.id, accountName: mockAccount.accountName });
    });
  });

  describe("getBalance", () => {
    it("should call findUnique method on prisma client with correct accountId", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue(mockAccount);

      await repository.getBalance(mockAccount.id);

      expect(mockPrismaClient.account.findUnique).toHaveBeenCalledWith({ where: { id: mockAccount.id } });
    });

    it("should return correct response", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue(mockAccount);

      const result = await repository.getBalance(mockAccount.id);

      expect(result).toBeInstanceOf(GetAccountBalanceResponse);
      expect(result).toEqual({
        accountId: mockAccount.id,
        accountName: mockAccount.accountName,
        balance: mockAccount.balance,
      });
    });

    it("should throw error when account not found", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue(null);

      await expect(repository.getBalance(mockAccount.id)).rejects.toThrow("Account not found");
    });
  });

  describe("getHistory", () => {
    it("should call findUnique method on prisma client with correct accountId", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue({
        ...mockAccount,
        transactions: [],
      });

      await repository.getHistory(mockAccount.id);

      expect(mockPrismaClient.account.findUnique).toHaveBeenCalledWith({
        where: { id: mockAccount.id },
        include: {
          transactions: {
            where: { accountId: mockAccount.id },
            orderBy: { createdAt: "desc" },
          },
        },
      });
    });

    it("should return correct response", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue({
        ...mockAccount,
        transactions: [],
      });

      const result = await repository.getHistory(mockAccount.id);

      expect(result).toEqual({
        accountId: mockAccount.id,
        accountName: mockAccount.accountName,
        balance: mockAccount.balance,
        transactions: [],
      });
    });

    it("should throw error when account not found", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue(null);

      await expect(repository.getHistory(mockAccount.id)).rejects.toThrow("Account not found");
    });
  });
});
