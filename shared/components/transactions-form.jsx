import React, { PropTypes } from 'react';
import shortid from 'shortid';
import R from 'ramda';

export default class TransactionsForm extends React.Component {
  static propTypes = {
    nextStep: PropTypes.func.isRequired,
    submitTransaction: PropTypes.func.isRequired,
    active: PropTypes.any.isRequired,
    nextActive: PropTypes.any.isRequired,
    transactions: PropTypes.any.isRequired,
    // editTransaction: PropTypes.func.isRequired,
    deleteTransaction: PropTypes.func.isRequired,
    participants: PropTypes.any.isRequired
  };

  handleNext = () => {
    this.props.nextStep(this.props.nextActive);
  };

  handleAdd = () => {
    // throw an error here
    const cost = Number(this.refs['transaction-cost'].value);
    if (R.is(Number, cost) && cost > 0) {
      let transaction = {};
      transaction.cost = cost;
      transaction.description = this.refs['transaction-description'].value;
      transaction.id = shortid.generate();

      const participant = document.getElementById('transaction-participant');
      transaction.buyer = participant.options[participant.selectedIndex].text;
      transaction.buyer_id = participant.options[participant.selectedIndex].value;

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
    this.props.nextStep('ParticipantsForm');
  };

  handleEditTransaction =(e) => {
    
  };

  deleteTransaction = (e) => {
    this.props.deleteTransaction(e.target.dataset.id);
  };

  getParticipantsDropdown = () => {
    const select_style = {
      display: 'inline-block',
      width: '450px'
    }
    return (
      <div id="participant-dropdown">
        <select className="form-control" style={select_style} id="transaction-participant">
          <option value={null}>Select Payer</option>
          {R.map(participant => {
            return (
              <option key={participant.id} value={participant.id}>{participant.name}</option>
            )
          }, this.props.participants)}
        </select>
      </div>
    );
  };

  getTransactions = () => {
    return R.map((transaction, index) => {
      return (
        <div key={transaction.id}>
          {`${transaction.buyer} paid ${transaction.cost} for ${transaction.description}  `}
          <input type="submit" data-id={transaction.id} value="Delete" onClick={this.handleDelete}/>
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
        width: '200px'
      }
      const next_style = {
        marginTop: '30px'
      }
      const cost_style = {
        width: '100px'
      }

      return (
        <div style={div_style}>
          {this.getTransactions()}
          <div>
            {this.getParticipantsDropdown()}
            <input type="text" style={cost_style} placeholder={'Cost'} ref="transaction-cost" onKeyUp={this.handleKey}/>
            <input type="text" style={description_style} placeholder={'Description'} ref="transaction-description" onKeyUp={this.handleKey}/>
            <input type="submit" value="Add Transaction" onClick={this.handleAdd} />
          </div>
          <div>
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
