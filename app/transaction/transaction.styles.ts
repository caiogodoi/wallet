import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4CAF50",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#E0E0E0",
    marginTop: 8,
  },
  card: {
    backgroundColor: "#2D2D2D",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#BDBDBD",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#9E9E9E",
  },
  value: {
    fontSize: 14,
    color: "#E0E0E0",
    fontWeight: "500",
  },
  status: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
    color: "#6200ee",
    marginTop: 16,
  },
});
