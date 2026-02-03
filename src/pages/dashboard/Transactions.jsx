import { TransactionsFunctions } from "../../context/TransactionContext";
import { useEffect, useState } from 'react'
export default function Transactions() {
  const { loading, getRecentTransactions } = TransactionsFunctions();

  const [transactions, setTransactions] = useState()

  useEffect(() => {
    if (loading) return; // wait until context has a user

    const fetchTransactions = async () => {
      console.log('fetching')
      const newTransactions = await getRecentTransactions();
      setTransactions(newTransactions)
      console.log("Transactions after set: ", transactions)
    };

    fetchTransactions();
  }, [loading]);

  return (
    < div >
      {/* {Object.values().map(([key, value]) => {
        return <div> Test {key} </div>
      })} */}
    </div >
  )
}
