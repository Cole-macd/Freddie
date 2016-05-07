import React, { PropTypes } from 'react';

export default class PersonalInfoForm extends React.Component {
  static propTypes = {
    nextStep: PropTypes.func.isRequired,
    submitInput: PropTypes.func.isRequired,
    active: PropTypes.any.isRequired,
    nextActive: PropTypes.any.isRequired
  };

  handleSubmit = () => {
    let income = this.refs['personal-income'];

    this.props.submitInput({monthly_income: income.value});
    this.props.nextStep(this.props.nextActive);
  };

  // Accept enter key for a submit
  handleKey = (event) => {
    if (event.keyCode == 13) {
      this.handleSubmit();
    }
  };

  setToActive = () => {
    this.props.nextStep('PersonalInfo');
  };

  render() {
    if (this.props.active == 'PersonalInfo') {
      const div_style = {
        borderTop: '1px solid #ccc',
        textAlign: 'center'
      };

      return (
        <div style={div_style}>
          <div>
            {'What is your monthly personal income? '}
            <input type="text" placeholder={'income'} ref="personal-income" onKeyUp={this.handleKey}/>
          </div>
          <div>
            <input type="submit" value="Submit!" onClick={this.handleSubmit} />
          </div>
        </div>
      );

    } else {
      const div_style = {
        borderTop: '1px solid #ccc'
      };

      return (
        <div style={div_style} onClick={this.setToActive}>
          {'Personal Info'}
        </div>
      );
    }
  };
};
