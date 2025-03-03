import { View, Text } from "react-native";
import { useTransaction } from "./transaction.hooks";
import styles from "./transaction.styles";

const Transaction = () => {
  const { transaction } = useTransaction();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.amount}>
          {transaction.currency} {transaction.amount.toFixed(2)}
        </Text>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.status}>{transaction.status}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>From</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{transaction.fromAccount.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Account</Text>
          <Text style={styles.value}>
            {transaction.fromAccount.accountNumber}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>To</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{transaction.toAccount.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Account</Text>
          <Text style={styles.value}>
            {transaction.toAccount.accountNumber}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID</Text>
          <Text style={styles.value}>{transaction.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Type</Text>
          <Text style={styles.value}>{transaction.type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>
            {new Date(transaction.date).toLocaleString()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fee</Text>
          <Text style={styles.value}>
            {transaction.currency} {transaction.fee.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Transaction;
