import type { PrismaClient as PrismaClientType } from "@prisma/client";

// Mock implementation for Prisma Client
const mockAccount = {
  create: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn(),
};

const mockTransaction = {
  create: jest.fn(),
  findUnique: jest.fn(),
};

export const mockPrismaClient = {
  account: mockAccount,
  transaction: mockTransaction,
  $transaction: jest.fn(async (fn: any) => {
    return fn({
      account: mockAccount,
      transaction: mockTransaction,
    });
  }),
};

// Create a mock PrismaClient instance for testing
export const PrismaClientMock: PrismaClientType = jest.fn(() => mockPrismaClient) as unknown as PrismaClientType;
