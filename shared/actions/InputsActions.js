export function submitInput(input) {
  return {
    type: 'SUBMIT_INPUT',
    input: input,
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

export function editInput(input) {
  return {
    type: 'EDIT_INPUT',
    input: input,
    date: Date.now()
  };
}
