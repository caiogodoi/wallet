import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const apiServices = {
  getBalance: () => api.get("http://10.0.2.2:3000/balance"),

  getTransactionsHistory: () =>
    api.get("http://10.0.2.2:3000/transactions-history"),

  getTransaction: (id: string) =>
    api.get(`http://10.0.2.2:3000/transactions/${id}`),
};

export default api;
