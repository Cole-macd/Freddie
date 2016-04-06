import React         from 'react';
import { PropTypes } from 'react';
import Immutable     from 'immutable';
import R from 'ramda';

export default class InputsView extends React.Component {
  static propTypes = {
    inputs: PropTypes.object.isRequired,
    editInput: PropTypes.func.isRequired
  };

  handleEdit = (e) => {
    const input_type = e.target.dataset.id;
    const current_value = this.props.inputs[input_type];

    // For a cutting edge UX
    let new_value = window.prompt('', current_value);

    var input = {}
    input[input_type] = new_value;

    this.props.editInput(input);
  };

  getInputs = () => {
    var inputs = [];
    const btnStyle = {
      'margin': '1em 0 1em 1em'
    };

    if (this.props.inputs.monthly_income) {
      inputs.push( 
        <div style={btnStyle} key={'monthly_income'}>
          <span>{`Monthly Income: ${this.props.inputs.monthly_income}`}</span>
          <button style={btnStyle} data-id={'monthly_income'} onClick={this.handleEdit}>Edit</button>
        </div>
      );
    }

    if (this.props.inputs.house_cost) {
      inputs.push(
        <div style={btnStyle} key={'house_cost'}>
          <span>{`House Cost: ${this.props.inputs.house_cost}`}</span>
          <button style={btnStyle} data-id={'house_cost'} onClick={this.handleEdit}>Edit</button>
        </div>
      );
    }

    if (this.props.inputs.mortgage_type) {
      inputs.push(
        <div style={btnStyle} key={'mortgage_type'}>
          <span>{`Mortgage Type: ${this.props.inputs.mortgage_type}`}</span>
          <button style={btnStyle} data-id={'mortgage_type'} onClick={this.handleEdit}>Edit</button>
        </div>
      );
    }

    if (this.props.inputs.house_location) {
      inputs.push(
        <div style={btnStyle} key={'house_location'}>
          <span>{`House Location: ${this.props.inputs.house_location}`}</span>
          <button style={btnStyle} data-id={'house_location'} onClick={this.handleEdit}>Edit</button>
        </div>
      );
    }

    if (this.props.inputs.monthly_income && this.props.inputs.house_cost
        && this.props.inputs.mortgage_type && this.props.inputs.house_location) {
      inputs.push(
        <span key={'output'}>{`Output: ???`}</span>
      );
    }
    return inputs;
  };

  render() {
    return (
      <div id="inputs-list">
        {this.getInputs()}
      </div>
    );
  }
}
