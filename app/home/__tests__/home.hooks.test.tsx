import { renderHook } from "@testing-library/react-hooks";
import useHome from "../home.hooks";
import * as storageModule from "~/utils/storage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "~/store/features/user/userSlice";
import transactionsReducer from "~/store/features/transactions/transactionsSlice";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
}));

jest.mock("~/services/api", () => ({
  apiServices: {
    getBalance: jest.fn(),
    getTransactionsHistory: jest.fn(),
    getTransaction: jest.fn(),
  },
}));

import { apiServices } from "~/services/api";

const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionsReducer,
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe("useHome", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should load initial data correctly", async () => {
    jest.spyOn(storageModule, "getFromStorage").mockResolvedValue({
      name: "John Doe",
      email: "john@example.com",
    });

    (apiServices.getBalance as jest.Mock).mockResolvedValue({
      data: { balance: 1000 },
    });

    (apiServices.getTransactionsHistory as jest.Mock).mockResolvedValue({
      data: [
        {
          id: "1",
          amount: 100,
          type: "credit",
          description: "Payment received",
          date: "2024-01-20",
        },
      ],
    });

    const { result, waitForNextUpdate } = renderHook(() => useHome(), {
      wrapper,
    });
    await waitForNextUpdate();

    expect(result.current.userName).toBe("John Doe");
    expect(result.current.balance).toBe(1000);
    expect(result.current.transactions).toHaveLength(1);
  });

  it("should handle transaction press correctly", async () => {
    const mockTransaction = {
      id: "1",
      amount: 100,
      type: "credit",
      description: "Test transaction",
    };

    (apiServices.getTransaction as jest.Mock).mockResolvedValue({
      data: mockTransaction,
    });

    const { result } = renderHook(() => useHome(), { wrapper });
    await result.current.handleTransactionPress("1");

    expect(apiServices.getTransaction).toHaveBeenCalledWith("1");
  });
});
