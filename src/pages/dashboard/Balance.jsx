import { useState } from "react";
import BalanceModal from "./BalanceModal";
import { supabase } from "../../supabaseClient.jsx";

export default function Balance() {
  const [balance, setBalance] = useState(20);
  const [prevBalance, setPrevBalance] = useState(10);

  const [showModal, setShowModal] = useState(false);

  const refreshBalance = async (e) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
      setBalance(netBalance);
    } catch (err) {
      console.error("Error calculating balance:", err.message);
      return 0;
    }
    setShowModal(false);
  };

  return (
    <>
      {showModal && <BalanceModal refreshBalance={refreshBalance} />}

      <div className="w-100 h-100 d-flex flex-column justify-content-between">
        <div>
          <h1 className="text-center">${balance}</h1>
        </div>
        <div className="d-flex justify-content-between">
          <h3>Last month: ${prevBalance}</h3>
          <button onClick={() => setShowModal(true)}>
            Add new transaction
          </button>
        </div>
      </div>
    </>
  );
}
