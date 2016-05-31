import R from 'ramda';
import http from 'http';

export function getPayments(participants, transactions, return_currency, callback) {
  var options = {
    host: 'openexchangerates.org',
    path: '/api/latest.json?app_id=533aa49fef3e49b0a1e2d6bcfa8589d8',
    withCredentials: false
  };

  http.get(options, response => {
    response.on('data', data => {

      const json_data = JSON.parse(data);

      let credits = {};
      R.forEach(participant => {
        credits[participant.id] = {
          balance: 0,
          name: participant.name
        }
      }, participants);

      // convert all transactions to USD 
      R.forEach(transaction => {
        const transaction_cost = transaction.cost * json_data.rates[return_currency] / json_data.rates[transaction.currency];
        R.forEach(participant_id => {
          credits[participant_id].balance -= (transaction_cost / transaction.participants.length);
        }, transaction.participants);

        credits[transaction.buyer_id].balance += transaction_cost;
      }, transactions);

      R.forEach(participant_id => {
        if (credits[participant_id].balance == 0) {
          delete credits[participant_id];
        }
      }, R.keys(credits))

      const sorted_keys = Object.keys(credits).sort((a,b) => {
        return credits[a].balance - credits[b].balance;
      });

      let payments = [];

      for (let i = 0; i < sorted_keys.length - 1; i++) {
        payments[i] = {
          payer: credits[sorted_keys[i]].name,
          payee: credits[sorted_keys[i + 1]].name,
          amount: credits[sorted_keys[i]].balance * -1
        }

        credits[sorted_keys[i + 1]].balance -= payments[i].amount;
      }

      callback(payments);
    });
  })
};
