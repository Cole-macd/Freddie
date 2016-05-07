import Immutable from 'immutable';
import R from 'ramda';

const default_state = Immutable.Map({
  active: 'PersonalInfo',
  inputs: {}
})

export default function inputReducer(state = default_state, action) {
  switch(action.type) {
    case 'SUBMIT_INPUT':
      return state.set('inputs', R.merge(state.get('inputs'), action.input));
    case 'NEXT_STEP':
      return state.set('active', action.next_active);
    case 'EDIT_INPUT':
      return state.set('inputs', R.merge(state.get('inputs'), action.input));
    default:
      return state;
  }
}
