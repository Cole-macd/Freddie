export function submitParticipant(participant) {
  return {
    type: 'SUBMIT_PARTICIPANT',
    participant: participant,
    date: Date.now()
  };
}

export function editParticipant(id, new_name) {
  return {
    type: 'EDIT_PARTICIPANT',
    id: id,
    new_name: new_name,
    date: Date.now()
  };
}

export function deleteParticipant(id) {
  return {
    type: 'DELETE_PARTICIPANT',
    id: id,
    date: Date.now()
  };
}

export function submitTransaction(transaction) {
  return {
    type: 'SUBMIT_TRANSACTION',
    transaction: transaction,
    date: Date.now()
  };
}

export function deleteTransaction(id) {
  return {
    type: 'DELETE_TRANSACTION',
    id: id,
    date: Date.now()
  };
}

export function setPayments(payments) {
  return {
   type: 'SET_PAYMENTS',
   payments: payments,
   date: Date.now()
  };
}

export function clearPayments() {
  return {
    type:'CLEAR_PAYMENTS',
    date: Date.now()
  }
}

export function setPaymentCurrency(payment_currency) {
  return {
   type: 'SET_PAYMENT_CURRENCY',
   payment_currency: payment_currency,
   date: Date.now()
  };
}

export function nextStep(next_active) {
  return {
    type: 'NEXT_STEP',
    next_active: next_active,
    date: Date.now()
  };
}
