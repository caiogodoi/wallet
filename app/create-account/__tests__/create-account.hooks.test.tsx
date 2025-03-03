import { renderHook, act } from "@testing-library/react-hooks";
import * as expoRouter from "expo-router";
import useCreateAccount from "../create-account.hooks";
import { setToStorage } from "~/utils/storage";

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock("~/utils/storage", () => ({
  setToStorage: jest.fn(),
}));

describe("useCreateAccount", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with empty values", () => {
    const { result } = renderHook(() => useCreateAccount());
    expect(result.current.name).toBe("");
    expect(result.current.email).toBe("");
    expect(result.current.pin).toEqual(["", "", "", ""]);
  });

  it("should validate full name correctly", () => {
    const { result } = renderHook(() => useCreateAccount());

    act(() => {
      result.current.setName("John Doe");
    });

    expect(result.current.isFullName("John Doe")).toBe(true);
  });

  it("should validate email correctly", () => {
    const { result } = renderHook(() => useCreateAccount());

    act(() => {
      result.current.setEmail("test@example.com");
    });

    expect(result.current.isValidEmail("test@example.com")).toBe(true);
  });

  it("should handle PIN changes", () => {
    const { result } = renderHook(() => useCreateAccount());

    act(() => {
      // Set each PIN digit one at a time
      result.current.handlePinChange("1", 0);
    });
    act(() => {
      result.current.handlePinChange("2", 1);
    });
    act(() => {
      result.current.handlePinChange("3", 2);
    });
    act(() => {
      result.current.handlePinChange("4", 3);
    });

    expect(result.current.pin).toEqual(["1", "2", "3", "4"]);
  });

  it("should submit form and navigate when valid", async () => {
    const { result } = renderHook(() => useCreateAccount());

    act(() => {
      result.current.setName("John Doe");
      result.current.setEmail("test@example.com");
      result.current.handlePinChange("1", 0);
      result.current.handlePinChange("2", 1);
      result.current.handlePinChange("3", 2);
      result.current.handlePinChange("4", 3);
    });

    await result.current.onSubmit();

    expect(setToStorage).toHaveBeenCalled();
    expect(expoRouter.router.replace).toHaveBeenCalledWith("/login");
  });
});
