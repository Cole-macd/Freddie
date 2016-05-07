import React, { PropTypes } from 'react';

export default class PersonalInfoForm extends React.Component {
  static propTypes = {
    nextStep: PropTypes.func.isRequired,
    submitInput: PropTypes.func.isRequired,
    active: PropTypes.any.isRequired,
  };

  render() {
    if (this.props.active == 'ResultInfo') {
      const div_style = {
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        textAlign: 'center'
      };

      return (
        <div style={div_style}>
          <span>{'Results!'}<br/></span>
          <span>{`Monthly Income: ${this.props.inputs.monthly_income}`}<br/></span>
          <span>{`House Cost: ${this.props.inputs.house_cost}`}<br/></span>
          <span>{`Mortgage Type: ${this.props.inputs.mortgage_type}`}<br/></span>
          <span>{`House Location: ${this.props.inputs.house_location}`}<br/></span>
          <span>{`Output: ???`}<br/></span>
        </div>
      );

    } else {
      const div_style = {
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc'
      };

      return (
        <div style={div_style}>
          {'Results'}
        </div>
      );
    }
  };
};