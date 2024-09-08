import { Account, Transaction } from "@prisma/client";

export const mockAccount = {
  id: 1,
  accountName: "Test Account",
  balance: 1000,
  createdAt: new Date(),
  updatedAt: new Date(),
} as Account;

export const mockAccount2 = {
  id: 2,
  accountName: "Test Account 2",
  balance: 1000,
  createdAt: new Date(),
  updatedAt: new Date(),
} as Account;

export const mockTransaction = {
  id: 1,
  accountId: mockAccount.id,
  amount: 1000,
  type: "DEPOSIT",
  originalTxId: null,
  reference: null,
  createdAt: new Date(),
} as Transaction;

export const mockTransaction2 = {
  id: 2,
  accountId: mockAccount.id,
  amount: 1000,
  type: "DEPOSIT",
  originalTxId: 1,
  reference: "Test Reference",
  createdAt: new Date(),
} as Transaction;

export const mockTransactionTransfer = {
  id: 3,
  accountId: mockAccount.id,
  amount: 1000,
  type: "TRANSFER",
  originalTxId: 1,
  reference: "Test Reference",
  createdAt: new Date(),
} as Transaction;

export const mockTransactionsForDeposit = [
  {
    id: 1,
    accountId: mockAccount.id,
    amount: 1000,
    type: "DEPOSIT",
    originalTxId: null,
    reference: null,
    createdAt: new Date(),
  },
  {
    id: 2,
    accountId: mockAccount.id,
    amount: 1000,
    type: "DEPOSIT",
    originalTxId: null,
    reference: null,
    createdAt: new Date(),
  },
  {
    id: 3,
    accountId: 123,
    amount: 1000,
    type: "DEPOSIT",
    originalTxId: null,
    reference: null,
    createdAt: new Date(),
  },
] as Transaction[];
