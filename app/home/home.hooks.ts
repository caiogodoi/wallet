import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "~/store/store";
import { setUserData } from "~/store/features/user/userSlice";
import { fetchBalance } from "~/store/features/user/userSlice";
import { fetchTransactions } from "~/store/features/transactions/transactionsSlice";
import { router } from "expo-router";
import { Alert } from "react-native";
import { getFromStorage } from "~/utils/storage";
import { apiServices } from "~/services/api";

import { getLanguage } from "~/modules/language-module";

const useHome = () => {
  const dispatch = useDispatch();
  const [deviceLanguage, setDeviceLanguage] = useState("");
  const {
    name,
    email,
    balance,
    isLoading: userLoading,
  } = useSelector((state: RootState) => state.user);
  const { transactions, isLoading: transactionsLoading } = useSelector(
    (state: RootState) => state.transactions
  );

  // useEffect(() => {
  //   setDeviceLanguage(getLanguage());
  // }, []);

  const handleTransactionPress = async (id: string) => {
    try {
      const response = await apiServices.getTransaction(id);
      router.push({
        pathname: "/transaction",
        params: { transaction: JSON.stringify(response.data) },
      });
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to load transaction details. Please try again."
      );
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      if (!name || !email) {
        const userData = await getFromStorage("userData");
        dispatch(
          setUserData({
            name: userData.name,
            email: userData.email,
          })
        );
      }
    };

    loadUserData();
    dispatch(fetchBalance() as any);
    dispatch(fetchTransactions() as any);
  }, []);

  return {
    userName: name,
    balance,
    transactions,
    isLoading: userLoading || transactionsLoading,
    deviceLanguage,
    handleTransactionPress,
  };
};

export default useHome;
