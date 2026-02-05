import { TransactionsFunctions } from "../../context/TransactionContext";
import { useEffect, useState } from "react";
export default function Transactions() {
  const { loading, getRecentTransactions } = TransactionsFunctions();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (loading) return; // wait until context has a user

    const fetchTransactions = async () => {
      const newTransactions = await getRecentTransactions();
      setTransactions(newTransactions);
      console.log("Transactions are set: ", newTransactions);
    };

    fetchTransactions();
  }, [loading]);

  return (
    <div>
      {transactions.map((t, i) => (
        <div key={t.id}>
          <p>Description: {t.description}</p>
          <p>Amount: {t.amount}</p>
          <p>Type: {t.type}</p>
        </div>
      ))}
    </div>
  );
}
