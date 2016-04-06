import React, { PropTypes } from 'react';

export default class InputsForm extends React.Component {
  static propTypes = {
    nextStep: PropTypes.func.isRequired,
    submitInput: PropTypes.func.isRequired,
    step: PropTypes.any.isRequired
  };

  getNextQuestion = () => {
    var question;
    switch(this.props.step) {
      case 1:
        question = 'What is your personal monthly income?';
        break;
      case 2:
        question = 'What is the cost of the new house?';
        break;
      case 3:
        question = 'What type of mortgage is it?';
        break;
      case 4:
        question = 'Where is the house located?';
        break;
    };

    return (
        <div>
          {question}
        </div>
    );
  };

  handleSubmit = () => {
    let node = this.refs['next-input'];

    var input_type;
    switch(this.props.step) {
      case 1:
        this.props.submitInput({monthly_income: node.value});
        break;
      case 2:
        this.props.submitInput({house_cost: node.value});
        break;
      case 3:
        this.props.submitInput({mortgage_type: node.value});
        break;
      case 4:
        this.props.submitInput({house_location: node.value});
        break;
    };

    this.props.nextStep();
    node.value = '';
  };

  handleKey = (event) => {
    if (event.keyCode == 13) {
      this.handleSubmit();
    }
  };

  render() {

    if (this.props.step < 5) {
      return (
        <div>
          {this.getNextQuestion()}
          <input type="text" placeholder="input" ref="next-input" onKeyUp={this.handleKey}/>
          <input type="submit" value="Submit!" onClick={this.handleSubmit} />
        </div>
      );
    }
    return null;
  };
}
