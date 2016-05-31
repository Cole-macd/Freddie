import React, { PropTypes } from 'react';
import R from 'ramda';
import * as PaymentCalculator from 'lib/payment-calculator';

export default class ResultBox extends React.Component {
  static propTypes = {
    active: PropTypes.any.isRequired,
    transactions: PropTypes.any.isRequired,
    participants: PropTypes.any.isRequired,
    setPayments: PropTypes.func.isRequired,
    payment_currency: PropTypes.any.isRequired
  };

  getResults = () => {
    PaymentCalculator.getPayments(this.props.participants, this.props.transactions, this.props.payment_currency, payments => {
      this.props.setPayments(payments);
    });
  };

  renderResults = () => {
    if (!this.props.payments) return null;

    return R.map((payment) => {
      let amount = (Math.round(payment.amount * 100) / 100).toFixed(2);

      return (
        <div key={payment.payer}>
          {`${payment.payer} owes ${payment.payee} ${amount} dollars ${this.props.payment_currency}`}
        </div>
      )
    }, this.props.payments);
  };

  render() {
    if (this.props.active == 'ResultInfo') {
      if (this.props.payments.size == 0) this.getResults();

      const div_style = {
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        textAlign: 'center'
      };

      return (
        <div style={div_style}>
          <span>{'Results!'}<br/></span>
          {this.renderResults()}
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