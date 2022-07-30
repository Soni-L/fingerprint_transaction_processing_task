// Let's first create a joint JSON array with all the transactions and their respective latencies 
// included all in one place

import transactions from "./transactions_data/transactions.json" assert { type: "json" };
import latencies from "./transactions_data/latencies.json" assert { type: "json" };

const all_transactions = transactions;
console.log(transactions[0])