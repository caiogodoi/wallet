import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from "~/services/api";

interface UserState {
  name: string;
  email: string;
  balance: number;
  isLoading: boolean;
}

const initialState: UserState = {
  name: "",
  email: "",
  balance: 0,
  isLoading: false,
};

export const fetchBalance = createAsyncThunk("user/fetchBalance", async () => {
  const response = await apiServices.getBalance();
  return response.data.balance;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBalance.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
