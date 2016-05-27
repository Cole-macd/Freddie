import React, { Component , PropTypes }   from 'react';
import ParticipantsForm from './participants-form';
import TransactionsForm from './transactions-form';
import ResultBox from './result-box';
import StartBox from './start-box';
import { bindActionCreators } from 'redux';
import * as InputsActions from 'actions/inputs-actions';
import { connect } from 'react-redux';
import Immutable from 'immutable';

class Home extends Component {
  static propTypes = {
    inputs: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render() {
    const { inputs, dispatch } = this.props;
    const div_style = {
      paddingRight: '50px',
      paddingLeft: '50px'
    }
    console.log('render home');
    return (
      <div className="container-fluid" style={div_style}>
        <StartBox active={inputs.get('active')} nextActive={'ParticipantsForm'}
          {...bindActionCreators(InputsActions, dispatch)}/>

        <ParticipantsForm participants={inputs.get('participants')} 
          active={inputs.get('active')} nextActive={'TransactionsForm'}
          {...bindActionCreators(InputsActions, dispatch)}/>

        <TransactionsForm participants={inputs.get('participants')} transactions={inputs.get('transactions')} 
          active={inputs.get('active')} nextActive={'ResultInfo'}
          {...bindActionCreators(InputsActions, dispatch)}/>

        <ResultBox participants={inputs.get('participants')} transactions={inputs.get('transactions')} 
          active={inputs.get('active')}
          {...bindActionCreators(InputsActions, dispatch)}/>
      </div>
    );
  }
}

export default connect(state => ({ inputs: state.inputs }))(Home)
