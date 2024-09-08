import { ITransactionRepository } from "@/repository/transaction/transaction.repository.interface";
import { CreateTransactionRequest, CreateTransactionResponse } from "@/models/dtos/transaction.dto";
import { Transaction, TransactionType } from "@prisma/client";
import { TransactionService } from "../../../src/services/transaction/transaction.service";

describe("TransactionService", () => {
  let transactionService: TransactionService;
  let transactionRepositoryMock: jest.Mocked<ITransactionRepository>;

  beforeEach(() => {
    transactionRepositoryMock = {
      createTransactionDeposit: jest.fn(),
      createTransactionWithdrawal: jest.fn(),
      createTransactionTransfer: jest.fn(),
      createTransactionRefund: jest.fn(),
    };
    transactionService = new TransactionService(transactionRepositoryMock);
  });

  describe("createTransaction", () => {
    it("should call createTransactionDeposit when transaction type is DEPOSIT", async () => {
      const request: CreateTransactionRequest = {
        fromAccountId: 1,
        amount: 1000,
        transactionType: TransactionType.DEPOSIT,
      };
      const response: CreateTransactionResponse = {
        id: 1,
        accountId: 1,
        amount: 1000,
        transactionType: TransactionType.DEPOSIT,
      };
      transactionRepositoryMock.createTransactionDeposit.mockResolvedValue(response);

      const result = await transactionService.createTransaction(request);

      expect(transactionRepositoryMock.createTransactionDeposit).toHaveBeenCalledWith({
        accountId: request.fromAccountId,
        amount: request.amount,
        type: request.transactionType,
      } as Transaction);
      expect(result).toEqual(response);
    });
  });

  it("should call createTransactionWithdrawal when transaction type is WITHDRAWAL", async () => {
    const request: CreateTransactionRequest = {
      fromAccountId: 1,
      amount: 1000,
      transactionType: TransactionType.WITHDRAWAL,
    };
    const response: CreateTransactionResponse = {
      id: 1,
      accountId: 1,
      amount: 1000,
      transactionType: TransactionType.WITHDRAWAL,
    };
    transactionRepositoryMock.createTransactionWithdrawal.mockResolvedValue(response);

    const result = await transactionService.createTransaction(request);

    expect(transactionRepositoryMock.createTransactionWithdrawal).toHaveBeenCalledWith({
      accountId: request.fromAccountId,
      amount: request.amount,
      type: request.transactionType,
    } as Transaction);
    expect(result).toEqual(response);
  });

  it("should call createTransactionTransfer when transaction type is TRANSFER", async () => {
    const request: CreateTransactionRequest = {
      fromAccountId: 1,
      toAccountId: 2,
      amount: 1000,
      transactionType: TransactionType.TRANSFER,
    };
    const response: CreateTransactionResponse = {
      id: 1,
      accountId: 1,
      amount: 1000,
      transactionType: TransactionType.TRANSFER,
    };
    transactionRepositoryMock.createTransactionTransfer.mockResolvedValue(response);

    const result = await transactionService.createTransaction(request);

    expect(transactionRepositoryMock.createTransactionTransfer).toHaveBeenCalledWith(
      {
        accountId: request.fromAccountId,
        amount: request.amount,
        type: request.transactionType,
      } as Transaction,
      request.toAccountId
    );
    expect(result).toEqual(response);
  });

  it("should call createTransactionRefund when transaction type is REFUND", async () => {
    const request: CreateTransactionRequest = {
      fromAccountId: 1,
      toAccountId: 2,
      amount: 1000,
      transactionType: TransactionType.REFUND,
      originalTxId: 1,
    };
    const response: CreateTransactionResponse = {
      id: 1,
      accountId: 1,
      amount: 1000,
      transactionType: TransactionType.REFUND,
    };
    transactionRepositoryMock.createTransactionRefund.mockResolvedValue(response);

    const result = await transactionService.createTransaction(request);

    expect(transactionRepositoryMock.createTransactionRefund).toHaveBeenCalledWith(
      {
        accountId: request.fromAccountId,
        amount: request.amount,
        type: request.transactionType,
      } as Transaction,
      request.toAccountId,
      request.originalTxId
    );
    expect(result).toEqual(response);
  });

  it("should throw error when transaction type is not supported", async () => {
    const request: CreateTransactionRequest = {
      fromAccountId: 1,
      amount: 1000,
      transactionType: "UNKNOWN" as TransactionType,
    };

    await expect(transactionService.createTransaction(request)).rejects.toThrow(
      "Unsupported transaction type: UNKNOWN"
    );
  });

  it("should throw error when toAccountId is not provided for transfer transactions", async () => {
    const request: CreateTransactionRequest = {
      fromAccountId: 1,
      amount: 1000,
      transactionType: TransactionType.TRANSFER,
    };

    await expect(transactionService.createTransaction(request)).rejects.toThrow(
      "To account ID is required for transfer transactions"
    );
  });

  it("should throw error when toAccountId or originalTxId is not provided for refund transactions", async () => {
    const request: CreateTransactionRequest = {
      fromAccountId: 1,
      amount: 1000,
      transactionType: TransactionType.REFUND,
    };

    await expect(transactionService.createTransaction(request)).rejects.toThrow(
      "toAccountId and originalTxId are required for refund transactions"
    );
  });
});
