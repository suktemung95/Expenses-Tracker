import { supabase } from "../supabaseClient.jsx";
import { createContext, useState, useEffect, useContext } from "react";
const TransactionContext = createContext();

export const TransactionContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Trying to setUser");
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    fetchUser();
  }, []);

  const getBalance = async (e) => {
    try {
      const userID = user.id;

      // get all transactions for the user
      const { data: transactions, error } = await supabase
        .from("transactions")
        .select("amount, type")
        .eq("user_id", userID);

      if (error) throw error;
      console.log("All transactions: ", transactions);

      // calculate net balance
      const netBalance = transactions.reduce((acc, tx) => {
        if (tx.type === "income") return acc + parseFloat(tx.amount);
        if (tx.type === "expense") return acc - parseFloat(tx.amount);
        return acc;
      }, 0);

      console.log("Net balance:", netBalance);
      return netBalance;
    } catch (err) {
      console.log("ID is:", userID);
      console.error("Error calculating balance:", err.message);
      return 0;
    }
  };

  const getRecentTransactions = async () => {
    try {
      // get userID
      const userID = user.id;

      // get 10 most recent transactions
      const { data: transactions, error } = await supabase
        .from("transactions")
        .select("id, amount, type, description") // change later
        .eq("user_id", userID)
        .order("id", { ascending: false })
        .limit(10);

      if (error) throw error;

      console.log("Recent transactions: ", transactions);
      return transactions;
    } catch (err) {
      console.error("Error fetching recent transactions: ", err.message);
      return [];
    }
  };

  return (
    <TransactionContext.Provider
      value={{ user, getBalance, getRecentTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const TransactionsFunctions = () => {
  return useContext(TransactionContext);
};
