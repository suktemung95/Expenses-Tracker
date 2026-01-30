import { useState } from "react";
import { supabase } from "../../supabaseClient.jsx";

export default function BalanceModal({ refreshBalance }) {
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = Date.now();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user.id);

    const { data, error } = await supabase.from("transactions").insert([
      {
        user_id: user.id,
        id: id,
        amount: amount,
        description: desc,
        type: type,
      },
    ]);

    if (error) {
      console.error("Error inserting:", error);
    } else {
      console.log("Inserted:", data);
      setAmount("");
      setDesc("");
      setType("");
    }
    refreshBalance();
  };
  return (
    <div
      className="position-fixed top-50 start-50 translate-middle bg-secondary p-4 rounded"
      style={{ zIndex: "1000" }}
    >
      <form className="d-flex flex-column">
        Enter your transaction here!
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <label htmlFor="desc">Desc:</label>
        <input
          type="text"
          id="desc"
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <span className="d-inline-flex justify-content-between gap-5">
          <label htmlFor="income">Income</label>
          <input
            type="radio"
            id="income"
            name="type"
            value="income"
            checked={type === "income"}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </span>
        <span className="d-inline-flex justify-content-between gap-5">
          <label htmlFor="expense">Expense</label>
          <input
            type="radio"
            id="expense"
            name="type"
            value="expense"
            checked={type === "expense"}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </span>
        <button className="btn btn-light mt-3" onClick={(e) => handleSubmit(e)}>
          Close
        </button>
      </form>
    </div>
  );
}
