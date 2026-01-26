import { useState } from "react";
import BalanceModal from "./BalanceModal";
import { supabase } from "../../supabaseClient.jsx";

export default function Balance() {
  const [balance, setBalance] = useState(20);
  const [prevBalance, setPrevBalance] = useState(10);

  const [showModal, setShowModal] = useState(false);

  const refreshBalance = async (e) => {
    // Insert into Supabase
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
