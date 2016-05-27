import R from 'ramda';

export function getPayments(participants, transactions) {
  let credits = {};
  R.forEach(participant => {
    credits[participant.id] = {
      name: participant.name,
      balance: 0
    }
  }, participants);

  R.forEach(transaction => {
    R.forEach(participant_id => {
      if (participant_id == transaction.buyer_id) {
        credits[participant_id].balance += transaction.cost - (transaction.cost/participants.size);
      } else {
        credits[participant_id].balance -= transaction.cost/participants.size;
      }
    }, R.keys(credits));
  }, transactions);

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
