import { use, useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

export const useTransaction = (userId) => {
  const [transaction, setTransaction] = useState([]);

  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const fetchTransaction = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/transaction/${userId}`);
      const data = await res.json();
      setTransaction(data);
    } catch (error) {
      console.log("Error in Getting the transaction", error);
    }
  }, [userId]);

  const getSummary = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/transaction/summary/${userId}`);
      const data = await res.json();
      setSummary(data);
    } catch (error) {
      console.log("Error in Gettign the summary", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await Promise.all([fetchTransaction(), getSummary()]);
    } catch (error) {
      console.log("error in loading data", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, fetchTransaction, getSummary]);

  const deleteTransaction = async (id) => {
    try {
      await fetch(`${API_URL}/transaction/${id}`, {
        method: "DELETE",
      });
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.log("Error in deleting transaction", error);
      Alert.alert("Error", "Failed to delete transaction");
    }
  };

  return { transaction, summary, isLoading, loadData, deleteTransaction };
};
