import { TransactionsFunctions } from "../../context/TransactionContext";
import { useEffect, useState } from 'react'
export default function Transactions() {
  const { loading, getRecentTransactions } = TransactionsFunctions();

  const { transactions, setTransactions } = useState()

  console.log('transactions test', transactions)

  useEffect(() => {
    console.log('using effect')
    if (loading) return; // wait until context has a user

    console.log('Using effect after loading')
    const fetchTransactions = async () => {
      const newTransactions = await getRecentTransactions();
      setTransactions(newTransactions);
      console.log("Transactions: ", transactions)
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
