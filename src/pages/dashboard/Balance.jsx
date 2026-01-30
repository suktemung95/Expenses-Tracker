import { useState, useEffect } from "react";
import BalanceModal from "./BalanceModal";
import { TransactionsFunctions } from "../../context/TransactionContext.jsx";

export default function Balance() {
  const [balance, setBalance] = useState(0);
  const [prevBalance, setPrevBalance] = useState(0);

  const { getBalance, getRecentTransactions } = TransactionsFunctions();
  const [showModal, setShowModal] = useState(false);

  const handleRefresh = () => {
    setBalance(getBalance());
    getRecentTransactions();
    setShowModal(false);
  };

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
