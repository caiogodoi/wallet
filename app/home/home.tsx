import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./home.styles";
import formatCurrency from "~/utils/formatCurrency";
import useHome from "./home.hooks";

import { Transaction } from "~/store/features/transactions/transactionsSlice";

const Home = () => {
  const {
    userName,
    balance,
    transactions,
    isLoading,
    deviceLanguage,
    handleTransactionPress,
  } = useHome();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TouchableOpacity
      style={styles.transactionItem}
      onPress={() => handleTransactionPress(item.id)}
    >
      <Text style={styles.transactionDescription}>{item.description}</Text>
      <Text style={styles.transactionAmount}>
        {formatCurrency(item.amount)}
      </Text>
      <Text style={styles.transactionDate}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>Welcome, {userName}</Text>
        <Text style={styles.languageText}>
          Your phone language is set to: {deviceLanguage}
        </Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceValue}>{formatCurrency(balance)}</Text>
        </View>
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Home;
