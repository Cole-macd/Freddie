import R from 'ramda';

export function getPayments(participants, transactions) {
  let credits = {};
  R.forEach(participant => {
    credits[participant.id] = {
      balance: 0,
      name: participant.name
    }
  }, participants);

  R.forEach(transaction => {
    R.forEach(participant_id => {
      credits[participant_id].balance -= transaction.cost / transaction.participants.length;
    }, transaction.participants);

    credits[transaction.buyer_id].balance += transaction.cost;
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

  return payments;
}
