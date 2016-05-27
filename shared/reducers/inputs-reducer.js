import Immutable from 'immutable';
import R from 'ramda';

const default_state = Immutable.Map({
  active: 'StartBox',
  // eventually change the participants array to an object with ids
  participants: [],
  transactions: []
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
        return !R.equals(id, action.id);
      }, state.get('participants')));

    case 'SUBMIT_TRANSACTION':
      return state.set('transactions', state.get('transactions').push(action.transaction));

    case 'DELETE_TRANSACTION':
      return state.set('transations', R.filter(transaction => {
        return !R.equals(id, action.id);
      }, state.get('transations')));

    case 'NEXT_STEP':
      return state.set('active', action.next_active);

    default:
      return state;
  }
}
