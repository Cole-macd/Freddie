import React, { PropTypes } from 'react';
import R from 'ramda';
import * as PaymentCalculator from 'lib/payment-calculator'

export default class PersonalInfoForm extends React.Component {
  static propTypes = {
    active: PropTypes.any.isRequired,
    transactions: PropTypes.any.isRequired,
    participants: PropTypes.any.isRequired
  };

  getResults = () => {
    return R.map((payment, index) => {
      let amount = (Math.round(payment.amount*100)/100).toFixed(2);

      return (
        <div key={index}>
          {`${payment.payer} owes ${payment.payee} ${amount} dollars`}
        </div>
      )
    }, PaymentCalculator.getPayments(this.props.participants, this.props.transactions));
  }

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
          {this.getResults()}
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