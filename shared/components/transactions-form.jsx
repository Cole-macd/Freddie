import React, { PropTypes } from 'react';
import shortid from 'shortid';
import R from 'ramda';
import * as PaymentCalculator from 'lib/payment-calculator';

export default class TransactionsForm extends React.Component {
  static propTypes = {
    nextStep: PropTypes.func.isRequired,
    submitTransaction: PropTypes.func.isRequired,
    active: PropTypes.any.isRequired,
    nextActive: PropTypes.any.isRequired,
    transactions: PropTypes.any.isRequired,
    setPayments: PropTypes.func.isRequired,
    deleteTransaction: PropTypes.func.isRequired,
    participants: PropTypes.any.isRequired,
    setPaymentCurrency: PropTypes.func.isRequired,
    clearPayments: PropTypes.func.isRequired
  };

  setPayments = () => {
    PaymentCalculator.getPayments(this.props.participants, this.props.transactions, this.props.payment_currency, payments => {
      this.props.setPayments(payments);
    });
  };

  handleNext = () => {
    const currency = document.getElementById('result-currency');
    this.props.setPaymentCurrency(currency.options[currency.selectedIndex].value);

    PaymentCalculator.getPayments(this.props.participants, this.props.transactions, currency.options[currency.selectedIndex].value, payments => {
      this.props.setPayments(payments);
      this.props.nextStep(this.props.nextActive);
    });
  };

  handleAdd = () => {
    // throw an error here if cost isnt a number
    const checked = R.filter(checkbox => {
      return checkbox.checked
    }, document.getElementsByClassName('checkbox'));
    const cost = Number(this.refs['transaction-cost'].value);

    if (R.is(Number, cost) && cost > 0 && checked.length > 0) {
      let transaction = {};
      transaction.cost = cost;
      transaction.description = this.refs['transaction-description'].value;
      transaction.id = shortid.generate();

      let participants = [];

      for (let i = 0; i < checked.length; i++) {
        participants.push(checked[i].value);
      }
      transaction.participants = participants;

      const participant = document.getElementById('transaction-participant');
      transaction.buyer = participant.options[participant.selectedIndex].text;
      transaction.buyer_id = participant.options[participant.selectedIndex].value;

      const currency = document.getElementById('transaction-currency');
      transaction.currency = currency.options[currency.selectedIndex].value;

      this.props.clearPayments();
      this.props.submitTransaction(transaction);
    }
    this.refs['transaction-description'].value = '';
    this.refs['transaction-cost'].value = '';
  };

  // Accept enter key for a submit
  handleKey = (event) => {
    if (event.keyCode == 13) {
      this.handleAdd();
    }
  };

  setToActive = () => {
    this.props.nextStep('TransactionsForm');
  };

  handleDeleteTransaction = (e) => {
    this.props.deleteTransaction(e.target.dataset.id);
  };

  getParticipantsDropdown = () => {
    const select_style = {
      display: 'inline-block',
      width: '450px'
    }
    return (
      <div id="participant-dropdown">
        {'Select Payer:'}<br/>
        <select className="form-control" style={select_style} id="transaction-participant">
          {R.map(participant => {
            return (
              <option key={participant.id} value={participant.id}>{participant.name}</option>
            )
          }, this.props.participants)}
        </select>
      </div>
    );
  };

  getParticipantsRadioButtons = () => {
    const div_style = {
      marginTop: '5px'
    }
    const checkbox_style = {
      display: 'inline',
      marginRight:'2px'
    }
    return (
      <div id="participants-radio-buttons" style={div_style}>
        {'Who was this for?'}<br/>
        {R.map(participant => {
          return (
            <div className="checkbox-group" id="checkbox" key={participant.id}>
              <label><input type="checkbox" className="checkbox" style={checkbox_style} value={participant.id} defaultChecked="true"/>{participant.name}</label>
            </div>
          )
        }, this.props.participants)}
      </div>
    );
  };

  getNames = participant_ids => {
    let names_string = '';
    R.forEach(participant_id => {
      names_string += ' ' + R.find(R.propEq('id', participant_id))(this.props.participants).name;
    }, participant_ids);

    return names_string;
  };

  getTransactions = () => {
    return R.map((transaction, index) => {
      return (
        <div key={transaction.id}>
          {`${transaction.buyer} paid ${transaction.cost} ${transaction.currency} for ${transaction.description}. `}
          {`Includes: ${this.getNames(transaction.participants)}.  `}
          <input type="submit" data-id={transaction.id} value="Delete" onClick={this.handleDeleteTransaction}/>
        </div>
      )
    }, this.props.transactions);
  };

  render() {
    if (this.props.active == 'TransactionsForm') {
      const div_style = {
        borderTop: '1px solid #ccc',
        textAlign: 'center'
      };
      const description_style = {
        width: '300px'
      }
      const next_style = {
        marginTop: '30px'
      }
      const cost_style = {
        width: '100px'
      }
      const select_style = {
        display: 'inline',
        width: '60px',
        height: '25px'
      }

      return (
        <div style={div_style}>
          {this.getTransactions()}
          <div>
            {this.getParticipantsDropdown()}
            <select className="form-control" style={select_style} id="transaction-currency">
              <option key={'CAD'} value={'CAD'}>{'CAD'}</option>
              <option key={'USD'} value={'USD'}>{'USD'}</option>
              <option key={'EUR'} value={'EUR'}>{'EUR'}</option>
            </select>
            <input type="text" style={cost_style} placeholder={'Cost'} ref="transaction-cost" onKeyUp={this.handleKey}/>
            <input type="text" style={description_style} placeholder={'Description'} ref="transaction-description" onKeyUp={this.handleKey}/>
            {this.getParticipantsRadioButtons()}
            <input type="submit" value="Add Transaction" onClick={this.handleAdd} />
          </div>
          <div>
            <select className="form-control" style={select_style} id="result-currency">
              <option key={'CAD'} value={'CAD'}>{'CAD'}</option>
              <option key={'USD'} value={'USD'}>{'USD'}</option>
              <option key={'EUR'} value={'EUR'}>{'EUR'}</option>
            </select>
            <input type="submit" style={next_style} value="Get Results!" onClick={this.handleNext} />
          </div>
        </div>
      );

    } else {
      const div_style = {
        borderTop: '1px solid #ccc'
      };

      return (
        <div style={div_style} onClick={this.setToActive}>
          {'Transactions'}
        </div>
      );
    }
  };
};
