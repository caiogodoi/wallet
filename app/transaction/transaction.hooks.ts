import { useLocalSearchParams } from "expo-router";

export interface TransactionDetails {
  amount: number;
  currency: string;
  date: string;
  description: string;
  fee: number;
  fromAccount: {
    accountNumber: string;
    name: string;
  };
  toAccount: {
    accountNumber: string;
    name: string;
  };
  id: string;
  status: string;
  type: string;
}

export const useTransaction = () => {
  const params = useLocalSearchParams();
  const transaction: TransactionDetails = JSON.parse(
    params.transaction as string
  );

  return { transaction };
};
