import React, { PropTypes } from 'react';

export default class PersonalInfoForm extends React.Component {
  static propTypes = {
    nextStep: PropTypes.func.isRequired,
    submitInput: PropTypes.func.isRequired,
    active: PropTypes.any.isRequired,
    nextActive: PropTypes.any.isRequired
  };

  getMortgageTypePlaceholder = () => {
    if (this.props.inputs.mortgage_type) {
      return this.props.inputs.mortgage_type;
    }
    return 'Mortgage Type';
  };

  getCostPlaceholder = () => {
    if (this.props.inputs.house_cost) {
      return this.props.inputs.house_cost;
    }
    return 'House Cost';
  };

  getLocationPlaceholder = () => {
    if (this.props.inputs.house_location) {
      return this.props.inputs.house_location;
    }
    return 'House Location';
  };

  handleSubmit = () => {
    let house_cost = this.refs['house-cost'];
    let house_location = this.refs['house-location'];
    let mortgage_type = this.refs['mortgage-type'];

    if (house_cost.value != null && house_location.value != null && mortgage_type.value != null) {
      this.props.submitInput({house_cost: house_cost.value});
      this.props.submitInput({house_location: house_location.value});
      this.props.submitInput({mortgage_type: mortgage_type.value});
      this.props.nextStep(this.props.nextActive);
    } else {
      // Show error message
    }
  };

  // Accept enter key for a submit
  handleKey = (event) => {
    if (event.keyCode == 13) {
      this.handleSubmit();
    }
  };

  setToActive = () => {
    this.props.nextStep('NewHouseInfo');
  };

  render() {
    if (this.props.active == 'NewHouseInfo') {
      const div_style = {
        borderTop: '1px solid #ccc',
        textAlign: 'center'
      };

      return (
        <div style={div_style}>
          <div className="col col-xs-12 col-sm-12 col-md-4 col-lg-4">
            {'What is the cost of the new house? '}
            <input type="text" placeholder={this.getCostPlaceholder()} ref="house-cost" onKeyUp={this.handleKey}/>
          </div>
          <div className="col col-xs-12 col-sm-12 col-md-4 col-lg-4">
            {'Where is the house located? '}
            <input type="text" placeholder={this.getLocationPlaceholder()} ref="house-location" onKeyUp={this.handleKey}/>
          </div>
          <div className="col col-xs-12 col-sm-12 col-md-4 col-lg-4">
            {'What is the type of mortgage? '}
            <input type="text" placeholder={this.getMortgageTypePlaceholder()} ref="mortgage-type" onKeyUp={this.handleKey}/>
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
          {'New House Info'}
        </div>
      );
    }
  };
};
