import { render } from "@testing-library/react-native";
import LoginScreen from "../login";

jest.mock("~/utils/storage", () => ({
  getFromStorage: jest.fn().mockResolvedValue({ pin: "1234" }),
}));

jest.mock("../login.hooks", () => () => ({
  pin: ["1", "2", "3", "4"],
  inputs: Array(4).fill({ current: { focus: jest.fn() } }),
  modalVisible: false,
  handleChange: jest.fn(),
  handleKeyPress: jest.fn(),
  onSubmit: jest.fn(),
  setModalVisible: jest.fn(),
}));

describe("LoginScreen", () => {
  it("renders correctly", () => {
    const { getByText } = render(<LoginScreen />);

    expect(getByText("Type your PIN")).toBeTruthy();
    expect(getByText("Entrar")).toBeTruthy();
  });

  it("renders PIN input fields", () => {
    const { UNSAFE_getAllByType } = render(<LoginScreen />);
    const inputs = UNSAFE_getAllByType("TextInput" as any);
    expect(inputs).toHaveLength(4);
  });
});
