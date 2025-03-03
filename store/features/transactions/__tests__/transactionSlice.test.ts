import transactionsReducer, {
  fetchTransactions,
  fetchTransactionById,
  Transaction,
} from "../transactionsSlice";
import { configureStore } from "@reduxjs/toolkit";

describe("transactions slice", () => {
  const initialState = {
    transactions: [],
    isLoading: false,
    selectedTransaction: null,
  };

  const mockTransaction: Transaction = {
    id: "1",
    description: "Test Transaction",
    amount: 100,
    date: "2024-01-01",
  };

  it("should handle initial state", () => {
    expect(transactionsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle fetchTransactions.pending", () => {
    const action = { type: fetchTransactions.pending.type };
    const state = transactionsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it("should handle fetchTransactions.fulfilled", () => {
    const action = {
      type: fetchTransactions.fulfilled.type,
      payload: [mockTransaction],
    };
    const state = transactionsReducer(initialState, action);
    expect(state.transactions).toEqual([mockTransaction]);
    expect(state.isLoading).toBe(false);
  });

  it("should handle fetchTransactionById.fulfilled", () => {
    const action = {
      type: fetchTransactionById.fulfilled.type,
      payload: mockTransaction,
    };
    const state = transactionsReducer(initialState, action);
    expect(state.selectedTransaction).toEqual(mockTransaction);
  });
});
