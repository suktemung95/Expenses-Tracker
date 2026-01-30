import { useState, useEffect } from "react";
import BalanceModal from "./BalanceModal";
import { TransactionsFunctions } from "../../context/TransactionContext.jsx";

import { supabase } from "../../supabaseClient.jsx";

export default function Balance() {
  const [balance, setBalance] = useState(0);
  const [prevBalance, setPrevBalance] = useState(0);

  const { user, getBalance, getRecentTransactions } = TransactionsFunctions();
  const [showModal, setShowModal] = useState(false);

  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleRefresh = () => {
    setBalance(getBalance());
    getRecentTransactions();
    setShowModal(false);
  };

  useEffect(() => {
    if (!user) return; // wait until context has a user

    setLoading(false);
    const fetchBalance = async () => {
      const newBalance = await getBalance();
      setBalance(newBalance);
    };

    fetchBalance();
  }, [user]);

  return (
    <>
      {showModal && (
        <BalanceModal
          handleRefresh={handleRefresh}
          setShowModal={setShowModal}
        />
      )}

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
