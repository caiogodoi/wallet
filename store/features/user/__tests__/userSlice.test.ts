import userReducer, { setUserData, fetchBalance } from "../userSlice";

describe("user slice", () => {
  const initialState = {
    name: "",
    email: "",
    balance: 0,
    isLoading: false,
  };

  it("should handle initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setUserData", () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
    };
    const action = setUserData(userData);
    const state = userReducer(initialState, action);
    expect(state.name).toBe(userData.name);
    expect(state.email).toBe(userData.email);
  });

  it("should handle fetchBalance.pending", () => {
    const action = { type: fetchBalance.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it("should handle fetchBalance.fulfilled", () => {
    const mockBalance = 1000;
    const action = {
      type: fetchBalance.fulfilled.type,
      payload: mockBalance,
    };
    const state = userReducer(initialState, action);
    expect(state.balance).toBe(mockBalance);
    expect(state.isLoading).toBe(false);
  });

  it("should handle fetchBalance.rejected", () => {
    const action = { type: fetchBalance.rejected.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });
});
