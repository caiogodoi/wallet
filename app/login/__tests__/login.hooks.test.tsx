import { renderHook } from "@testing-library/react-hooks";
import * as expoRouter from "expo-router";
import useLogin from "../login.hooks";
import { getFromStorage } from "~/utils/storage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "~/store/features/user/userSlice";

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock("~/utils/storage", () => ({
  getFromStorage: jest.fn(),
}));

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe("useLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with empty PIN array", () => {
    const { result } = renderHook(() => useLogin(), { wrapper });
    expect(result.current.pin).toEqual(["", "", "", ""]);
  });

  it("should validate correct PIN and navigate to home", async () => {
    (getFromStorage as jest.Mock).mockResolvedValue({
      pin: "1234",
      name: "Test User",
      email: "test@example.com",
    });
    const { result } = renderHook(() => useLogin(), { wrapper });

    result.current.handleChange("1", 0);
    result.current.handleChange("2", 1);
    result.current.handleChange("3", 2);
    result.current.handleChange("4", 3);

    await result.current.onSubmit();

    expect(expoRouter.router.replace).toHaveBeenCalledWith("/home");
  });

  it("should show modal for incorrect PIN", async () => {
    (getFromStorage as jest.Mock).mockResolvedValue({
      pin: "5555",
      name: "Test User",
      email: "test@example.com",
    });
    const { result } = renderHook(() => useLogin(), { wrapper });

    result.current.handleChange("1", 0);
    result.current.handleChange("2", 1);
    result.current.handleChange("3", 2);
    result.current.handleChange("4", 3);

    await result.current.onSubmit();

    expect(result.current.modalVisible).toBe(true);
  });

  it("should handle backspace key press", () => {
    const { result } = renderHook(() => useLogin(), { wrapper });
    const mockEvent = {
      nativeEvent: { key: "Backspace" },
    };

    result.current.handleChange("1", 0);
    result.current.handleKeyPress(mockEvent as any, 1);

    expect(result.current.pin[0]).toBe("1");
  });
});
