import Immutable from 'immutable';
import R from 'ramda';

const defaultState = Immutable.Map({
  step: 1,
  inputs: {}
})

export default function inputReducer(state = defaultState, action) {
  switch(action.type) {
    case 'SUBMIT_INPUT':
      return state.set('inputs', R.merge(state.get('inputs'), action.input));
    case 'NEXT_STEP':
      return state.set('step', state.get('step') + 1);
    case 'EDIT_INPUT':
      return state.set('inputs', R.merge(state.get('inputs'), action.input));
    default:
      return state;
  }
}
