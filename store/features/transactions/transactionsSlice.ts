import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from "~/services/api";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
}

interface TransactionsState {
  transactions: Transaction[];
  isLoading: boolean;
  selectedTransaction: Transaction | null;
}

const initialState: TransactionsState = {
  transactions: [],
  isLoading: false,
  selectedTransaction: null,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await apiServices.getTransactionsHistory();
    return response.data;
  }
);

export const fetchTransactionById = createAsyncThunk(
  "transactions/fetchTransactionById",
  async (id: string) => {
    const response = await apiServices.getTransaction(id);
    return response.data;
  }
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.selectedTransaction = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
