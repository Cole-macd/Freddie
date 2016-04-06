export function submitInput(input) {
  return {
    type: 'SUBMIT_INPUT',
    input: input,
    date: Date.now()
  };
}

export function nextStep() {
  return {
    type: 'NEXT_STEP',
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
