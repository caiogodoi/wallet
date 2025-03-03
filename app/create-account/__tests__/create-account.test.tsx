import { render } from "@testing-library/react-native";
import CreateAccountScreen from "../create-account";

jest.mock("~/utils/storage", () => ({
  setToStorage: jest.fn().mockResolvedValue(null),
}));

jest.mock("../create-account.hooks", () => () => ({
  name: "",
  setName: jest.fn(),
  email: "",
  setEmail: jest.fn(),
  pin: ["", "", "", ""],
  setPin: jest.fn(),
  inputs: Array(4).fill({ current: { focus: jest.fn() } }),
  isFullName: (name: string) => name.includes(" "),
  isValidEmail: (email: string) => email.includes("@"),
  isValidPin: false,
  isFormValid: false,
  handlePinChange: jest.fn(),
  onSubmit: jest.fn(),
}));

describe("CreateAccountScreen", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<CreateAccountScreen />);

    expect(getByText("Create an Account")).toBeTruthy();
    expect(getByText("Enter your 4-digit PIN")).toBeTruthy();
    expect(getByText("Sign Up")).toBeTruthy();
    expect(getByPlaceholderText("Full Name")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
  });

  it("renders all input fields", () => {
    const { UNSAFE_getAllByType } = render(<CreateAccountScreen />);
    const inputs = UNSAFE_getAllByType("TextInput" as any);
    expect(inputs).toHaveLength(6); // 2 for name/email + 4 for PIN
  });
});
