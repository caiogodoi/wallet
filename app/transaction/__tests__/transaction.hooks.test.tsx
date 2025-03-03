import { renderHook } from "@testing-library/react-hooks";
import { useTransaction } from "../transaction.hooks";
import { useLocalSearchParams } from "expo-router";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

describe("useTransaction", () => {
  const mockTransaction = {
    amount: 100.5,
    currency: "USD",
    date: "2024-01-20T10:00:00",
    description: "Test Transaction",
    fee: 2.5,
    fromAccount: {
      accountNumber: "123456",
      name: "John Doe",
    },
    toAccount: {
      accountNumber: "789012",
      name: "Jane Smith",
    },
    id: "tx123",
    status: "completed",
    type: "transfer",
  };

  beforeEach(() => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      transaction: JSON.stringify(mockTransaction),
    });
  });

  it("should parse transaction data from params", () => {
    const { result } = renderHook(() => useTransaction());
    expect(result.current.transaction).toEqual(mockTransaction);
  });

  it("should handle transaction params correctly", () => {
    const { result } = renderHook(() => useTransaction());
    const { transaction } = result.current;

    expect(transaction.amount).toBe(100.5);
    expect(transaction.currency).toBe("USD");
    expect(transaction.description).toBe("Test Transaction");
    expect(transaction.fromAccount.name).toBe("John Doe");
    expect(transaction.toAccount.name).toBe("Jane Smith");
  });
});
