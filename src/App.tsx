import React, { useCallback, useEffect, useState } from "react";

interface Transaction {
  id: number;
  amount: number;
}

const defaultTrasactions = [
  { id: 1, amount: 50 },
  { id: 2, amount: 150 },
  { id: 3, amount: 200 },
];

const NO_MATCHING_TRANSACTIONS = "No matching transactions found.";

const PaymentDashboard = () => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(defaultTrasactions);
  const [target, setTarget] = useState<number | null>(null);
  const [result, setResult] = useState<string>("");

  //using string here prevents the number input to show 0, eg: 025
  const [newTransactionAmount, setNewTransactionAmount] = useState<string>("0");

  const handleCheckTransactions = useCallback(
    (target: number | null) => {
      if (target === null || transactions.length === 0) return;

      for (const transactionA of transactions) {
        for (const transactionB of transactions) {
          if (transactionA === transactionB) continue;

          if (transactionA.amount + transactionB.amount === target) {
            setResult(
              `Transactions ${transactionA.id} and ${transactionB.id} add up to ${target}`
            );

            return;
          }
        }
      }

      setResult(NO_MATCHING_TRANSACTIONS);
    },
    [transactions]
  );

  const handleAddTransaction = () => {
    if (
      transactions.find(
        (transaction) => transaction.amount === Number(newTransactionAmount)
      )
    ) {
      alert("Transaction has already registred");

      return;
    }

    setTransactions([
      ...transactions,
      { id: new Date().getTime(), amount: Number(newTransactionAmount) },
    ]);

    setNewTransactionAmount("0");
  };

  useEffect(() => {
    if (!target) return;

    handleCheckTransactions(target);
  }, [handleCheckTransactions, target]);

  return (
    <div>
      <h1>Payment Transaction Dashboard</h1>

      <p>Your transactions</p>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            ID: {transaction.id}, Amount: ${transaction.amount}
          </li>
        ))}
      </ul>

      <p>Enter Target Amount to be Checked</p>
      <input
        type="number"
        placeholder="target amount"
        onChange={(e) => setTarget(Number(e.target.value))}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;

          handleCheckTransactions(target);
        }}
      />

      <br />

      <p>Enter Amount Of The New Transaction </p>
      <input
        value={newTransactionAmount}
        type="number"
        placeholder="Amount"
        onChange={(e) => setNewTransactionAmount(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;

          handleAddTransaction();
        }}
      />
      <button onClick={handleAddTransaction}>Create transaction</button>

      <p
        style={{
          background: result === NO_MATCHING_TRANSACTIONS ? "red" : "green",
          color: "white",
        }}
      >
        {result}
      </p>
    </div>
  );
};

export default PaymentDashboard;
