import React, { PropTypes } from 'react';
import R from 'ramda';

export default class ResultBox extends React.Component {
  static propTypes = {
    active: PropTypes.any.isRequired,
    transactions: PropTypes.any.isRequired,
    participants: PropTypes.any.isRequired,
    payment_currency: PropTypes.any.isRequired,
    payments: PropTypes.any.isRequired
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