import React, { useState } from "react";

interface Transaction {
  id: number;
  amount: number;
}

const defaultTrasactions = [
  { id: 1, amount: 50 },
  { id: 2, amount: 150 },
  { id: 3, amount: 200 },
];

const PaymentDashboard = () => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(defaultTrasactions);
  const [target, setTarget] = useState<number | null>(null);
  const [result, setResult] = useState<string>("");

  const handleCheckTransactions = () => {
    if (target === null) return;

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

    setResult("No matching transactions found.");
  };

  const handleAddTransaction = (id: number, amount: number) => {
    setTransactions([...transactions, { id, amount }]);
  };

  console.log(target);

  return (
    <div>
      <h1>Payment Transaction Dashboard</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            ID: {transaction.id}, Amount: ${transaction.amount}
          </li>
        ))}
      </ul>
      <input
        type="number"
        placeholder="Enter target amount"
        onChange={(e) => setTarget(Number(e.target.value))}
      />
      <button onClick={handleCheckTransactions}>Check Transactions</button>
      <p>{result}</p>
    </div>
  );
};

export default PaymentDashboard;
