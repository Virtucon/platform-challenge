import { mockPrismaClient } from "../__mocks__/prismaClient.mock";
import { PrismaClient } from "@prisma/client";
import { TransactionRepository } from "../../../src/repository/transaction/transaction.repository";
import { CreateTransactionResponse } from "@/models/dtos/transaction.dto";
import { ITransactionRepository } from "./transaction.repository.interface";
import { mockAccount, mockTransaction } from "../__mocks__/mockData";

jest.mock("@prisma/client");

describe("TransactionRepository", () => {
  let repository: ITransactionRepository;

  beforeEach(() => {
    (PrismaClient as any).mockImplementation(() => mockPrismaClient);
    repository = new TransactionRepository(new PrismaClient());
  });

  describe("createTransaction", () => {
    it("should call create method on prisma client with correct parameters", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue(mockAccount);
      mockPrismaClient.transaction.create.mockResolvedValue(mockTransaction);

      await repository.createTransactionDeposit(mockTransaction);

      expect(mockPrismaClient.transaction.create).toHaveBeenCalledWith({ data: mockTransaction });
    });

    it("should return correct response", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue(mockAccount);
      mockPrismaClient.transaction.create.mockResolvedValue(mockTransaction);

      const result = await repository.createTransactionDeposit(mockTransaction);

      expect(result).toBeInstanceOf(CreateTransactionResponse);
      expect(result).toEqual({
        id: mockTransaction.id,
        accountId: mockTransaction.accountId,
        amount: mockTransaction.amount,
        transactionType: mockTransaction.type,
      } as CreateTransactionResponse);
    });

    it("should throw error when account not found", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue(null);

      await expect(repository.createTransactionDeposit(mockTransaction)).rejects.toThrow("Account not found");
    });

    it("should return updated balance after deposit", async () => {});
  });

  describe("createTransactionWithdrawal", () => {
    it("should call create method on prisma client with correct parameters", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue(mockAccount);
      mockPrismaClient.transaction.create.mockResolvedValue(mockTransaction);

      await repository.createTransactionWithdrawal(mockTransaction);

      expect(mockPrismaClient.transaction.create).toHaveBeenCalledWith({ data: mockTransaction });
    });

    it("should return correct response", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue(mockAccount);
      mockPrismaClient.transaction.create.mockResolvedValue(mockTransaction);

      const result = await repository.createTransactionWithdrawal(mockTransaction);

      expect(result).toBeInstanceOf(CreateTransactionResponse);
      expect(result).toEqual({
        id: mockTransaction.id,
        accountId: mockTransaction.accountId,
        amount: mockTransaction.amount,
        transactionType: mockTransaction.type,
      } as CreateTransactionResponse);
    });

    it("should throw error when account not found", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue(null);

      await expect(repository.createTransactionWithdrawal(mockTransaction)).rejects.toThrow("Account not found");
    });
  });

  describe("createTransactionTransfer", () => {
    it("should call create method on prisma client with correct parameters", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue(mockAccount);
      mockPrismaClient.transaction.create.mockResolvedValue(mockTransaction);

      await repository.createTransactionTransfer(mockTransaction, mockAccount.id);

      expect(mockPrismaClient.transaction.create).toHaveBeenCalledWith({ data: mockTransaction });
    });

    it("should return correct response", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue(mockAccount);
      mockPrismaClient.transaction.create.mockResolvedValue(mockTransaction);

      const result = await repository.createTransactionTransfer(mockTransaction, mockAccount.id);

      expect(result).toBeInstanceOf(CreateTransactionResponse);
      expect(result).toEqual({
        id: mockTransaction.id,
        accountId: mockTransaction.accountId,
        amount: mockTransaction.amount,
        transactionType: mockTransaction.type,
      } as CreateTransactionResponse);
    });

    it("should throw error when account not found", async () => {
      mockPrismaClient.account.findUnique.mockResolvedValue(null);

      await expect(repository.createTransactionTransfer(mockTransaction, mockAccount.id)).rejects.toThrow(
        "From account not found"
      );
    });
  });
});
