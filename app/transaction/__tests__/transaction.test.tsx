import { render, screen } from "@testing-library/react-native";
import Transaction from "../transaction";
import { useTransaction } from "../transaction.hooks";

jest.mock("../transaction.hooks");

describe("Transaction", () => {
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
    (useTransaction as jest.Mock).mockReturnValue({
      transaction: mockTransaction,
    });
  });

  it("should render transaction details correctly", () => {
    render(<Transaction />);

    expect(screen.getByText("USD 100.50")).toBeTruthy();
    expect(screen.getByText("Test Transaction")).toBeTruthy();
    expect(screen.getByText("completed")).toBeTruthy();
  });

  it("should display sender and receiver information", () => {
    render(<Transaction />);

    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("123456")).toBeTruthy();
    expect(screen.getByText("Jane Smith")).toBeTruthy();
    expect(screen.getByText("789012")).toBeTruthy();
  });

  it("should show transaction details section", () => {
    render(<Transaction />);

    expect(screen.getByText("tx123")).toBeTruthy();
    expect(screen.getByText("transfer")).toBeTruthy();
    expect(screen.getByText("USD 2.50")).toBeTruthy();
  });

  it("should format date correctly", () => {
    render(<Transaction />);

    const formattedDate = new Date(mockTransaction.date).toLocaleString();
    expect(screen.getByText(formattedDate)).toBeTruthy();
  });
});
