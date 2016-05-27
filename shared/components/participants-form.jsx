import React, { PropTypes } from 'react';
import shortid from 'shortid';
import R from 'ramda';

export default class ParticipantsForm extends React.Component {
  static propTypes = {
    nextStep: PropTypes.func.isRequired,
    submitParticipant: PropTypes.func.isRequired,
    active: PropTypes.any.isRequired,
    nextActive: PropTypes.any.isRequired,
    participants: PropTypes.any.isRequired,
    editParticipant: PropTypes.func.isRequired,
    deleteParticipant: PropTypes.func.isRequired
  };

  handleSubmit = () => {
    this.props.nextStep(this.props.nextActive);
  };

  handleAdd = () => {
    let participant = {};
    participant.id = shortid.generate();
    participant.name = this.refs['participant-name'].value;

    this.props.submitParticipant(participant);

    this.refs['participant-name'].value = '';
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

  handleEdit =(e) => {
    const id = e.target.dataset.id;
    const old_name = R.find(R.propEq('id', id))(this.props.participants).name;

    let new_name = window.prompt(old_name + '\'s new name is:', old_name);
    this.props.editParticipant(id, new_name);
  };

  handleDelete = (e) => {
    this.props.deleteParticipant(e.target.dataset.id);
  };

  getParticipants = () => {
    return this.props.participants.map((participant, index) => {
      return (
        <div key={participant.id}>
          {participant.name + '  '}
          <input type="submit" data-id={participant.id} value="Edit" onClick={this.handleEdit}/>
          <input type="submit" data-id={participant.id} value="Delete" onClick={this.handleDelete}/>
        </div>
      )
    });
  };

  render() {
    if (this.props.active == 'ParticipantsForm') {
      const div_style = {
        borderTop: '1px solid #ccc',
        textAlign: 'center'
      };
      const next_style = {
        marginTop: '30px'
      }

      return (
        <div style={div_style}>
          {this.getParticipants()}
          <div>
            <input type="text" placeholder={'Name'} ref="participant-name" onKeyUp={this.handleKey}/>
            <input type="submit" value="Add Participant" onClick={this.handleAdd} />
          </div>
          <div>
            <input type="submit" style={next_style} value="Next!" onClick={this.handleSubmit} />
          </div>
        </div>
      );

    } else {
      const div_style = {
        borderTop: '1px solid #ccc'
      };

      return (
        <div style={div_style} onClick={this.setToActive}>
          {'Participants'}
        </div>
      );
    }
  };
};
