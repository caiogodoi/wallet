import { render } from "@testing-library/react-native";
import HomeScreen from "../home";
import { apiServices } from "~/services/api";

jest.mock("~/services/api", () => ({
  apiServices: {
    getBalance: jest.fn().mockResolvedValue({ data: { balance: 1000 } }),
    getTransactionsHistory: jest.fn().mockResolvedValue({
      data: [
        {
          id: "1",
          amount: 100,
          type: "credit",
          description: "Payment received",
          date: "2024-01-20",
        },
      ],
    }),
  },
}));

jest.mock("../home.hooks", () => () => ({
  userData: {
    name: "John Doe",
    balance: 1000,
  },
  transactions: [
    {
      id: "1",
      amount: 100,
      type: "credit",
      description: "Payment received",
      date: "2024-01-20",
    },
  ],
  handleTransactionPress: jest.fn(),
}));

describe("HomeScreen", () => {
  it("renders user information correctly", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Welcome,")).toBeTruthy();
    expect(getByText("Balance")).toBeTruthy();
  });

  it("renders transaction list", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Payment received")).toBeTruthy();
    expect(getByText("$100.00")).toBeTruthy();
    expect(getByText("Recent Transactions")).toBeTruthy();
  });
});
