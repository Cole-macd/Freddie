import Immutable from 'immutable';
import R from 'ramda';

const default_state = Immutable.Map({
  active: 'StartBox',
  // eventually change the participants array to an object with ids
  participants: [],
  transactions: [],
  payments: [],
  payment_currency: 'CAD'
});

export default function inputReducer(state = default_state, action) {
  switch(action.type) {
    case 'SUBMIT_PARTICIPANT':
      return state.set('participants', state.get('participants').push(action.participant));

    case 'EDIT_PARTICIPANT':
      return state.set('participants', R.map(participant => {
        if (participant.id == action.id) {
          participant.name = action.new_name;
        }
        return participant;
      }, state.get('participants')));

    case 'DELETE_PARTICIPANT':
      return state.set('participants', R.filter(participant => {
        return !R.equals(participant.id, action.id);
      }, state.get('participants')));

    case 'SUBMIT_TRANSACTION':

      return state.set('transactions', state.get('transactions').push(action.transaction));

    case 'DELETE_TRANSACTION':
      return state.set('transactions', R.filter(transaction => {
        return !R.equals(transaction.id, action.id);
      }, state.get('transactions')));

    case 'SET_PAYMENTS':
      return state.set('payments', action.payments);

    case 'CLEAR_PAYMENTS':
      return state.set('payments', new Immutable.List())

    case 'SET_PAYMENT_CURRENCY':
      return state.set('payment_currency', action.payment_currency);

    case 'NEXT_STEP':
      return state.set('active', action.next_active);

    default:
      return state;
  }
}
