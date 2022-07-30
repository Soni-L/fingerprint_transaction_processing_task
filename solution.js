// Let's first create a joint JSON array with all the transactions and their respective latencies
// included all in one place for simplicity's sake

import transactions from "./transactions_data/transactions.json" assert { type: "json" };
import latencies from "./transactions_data/latencies.json" assert { type: "json" };

let all_transactions = transactions;

all_transactions = all_transactions.map((item) => {
  return { ...item, latency: latencies[item.bank_country_code] };
});

//Secondly we will filter this array to include all transactions that have an verification time less
//than the given total time to be spent on verification (since it does not make sense to work with transactions with latencies bigger than our total execution time)

const total_time = 50;
let filtered_transactions = all_transactions.filter(
  (item) => item.latency <= total_time
);

// Now that we have the filtered array, we are going to assign a new property to each transation,
// namely: relative_transaction_value. This property will equal the amount/latency, it will be a
// relative fractional indicator for a transaction's money/time value
// ie: a transaction with 35.6$/40ms will have a greater value than
// 39$/45ms because the first fraction in bigger, we are getting more money per time spent processing it

filtered_transactions = filtered_transactions.map((item) => {
  return {
    ...item,
    relative_transaction_value: item.amount / item.latency,
  };
});

//Also we will sort it by relative_transaction_value: DESCENDING, so the array starts with
// the best value transactions

filtered_transactions.sort(
  (a, b) =>
    parseFloat(b.relative_transaction_value) -
    parseFloat(a.relative_transaction_value)
);

//Finally, now that we have the sorted array, we will reduce it from index 0 until we reach a sum total latency
//that's closest but still smaller than our total_time.

let maximum_throughput_dollar_amount = 0;
const prioritized_transaction_list = [];

let total_running_time = 0;
let index = 0;

while (total_running_time < total_time) {
  if (filtered_transactions[index].latency + total_running_time < total_time) {
    maximum_throughput_dollar_amount += filtered_transactions[index].amount;
    prioritized_transaction_list.push(filtered_transactions[index]);
  }

  total_running_time += filtered_transactions[index].latency;
  index++;
}

console.log(maximum_throughput_dollar_amount);
console.log(prioritized_transaction_list);


//Conclusion: the maximum amount that can be passed through for 50 miliseconds processing is 3637.98 dollars
//A general function with can be extracted from the steps above, to provide answers for all other values 
//and/or transactions lists.
