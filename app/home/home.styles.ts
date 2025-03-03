import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1E1E1E",
  },
  header: {
    marginBottom: 24,
    backgroundColor: "#2D2D2D",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 16,
    color: "#E0E0E0",
    marginBottom: 4,
    fontWeight: "500",
  },
  balanceContainer: {
    marginTop: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#BDBDBD",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  transactionsContainer: {
    flex: 1,
    backgroundColor: "#2D2D2D",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionsTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#FFFFFF",
  },
  transactionItem: {
    padding: 16,
    backgroundColor: "#383838",
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#6200ee",
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E0E0E0",
    marginBottom: 6,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4CAF50",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: "#BDBDBD",
    fontWeight: "500",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  languageText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    marginBottom: 10,
  },
});

export default styles;
