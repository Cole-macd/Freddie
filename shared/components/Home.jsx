import React, { Component , PropTypes }   from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import NewHouseForm from './NewHouseForm';
import ResultBox from './ResultBox';
import { bindActionCreators } from 'redux';
import * as InputsActions from 'actions/InputsActions';
import { connect } from 'react-redux';
import Immutable from 'immutable';

class Home extends Component {
  static propTypes = {
    input_info: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static needs = [
  ];

  render() {
    const { input_info, dispatch } = this.props;
    const dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.'];;
    const div_style = {
      paddingRight: '50px',
      paddingLeft: '50px'
    }

    return (
      <div className="container-fluid" style={div_style}>
        <PersonalInfoForm inputs={input_info.get('inputs')} active={input_info.get('active')} nextActive={'NewHouseInfo'}
          {...bindActionCreators(InputsActions, dispatch)}/>

        <NewHouseForm inputs={input_info.get('inputs')} active={input_info.get('active')} nextActive={'ResultInfo'}
          {...bindActionCreators(InputsActions, dispatch)}/>

        <ResultBox inputs={input_info.get('inputs')} active={input_info.get('active')}
          {...bindActionCreators(InputsActions, dispatch)}/>
      </div>
    );
  }

  // render() {
  //   const { input_info, dispatch } = this.props;
  //   const dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.'];;

  //   return (
  //     <div className="container-fluid">
  //       <div className="row">
  //         <div className="col-sm-6 col-md-6">
  //           <InputsForm step={input_info.get('step')}
  //             {...bindActionCreators(InputsActions, dispatch)}/>
  //         </div>
  //         <div className="col-sm-6 col-md-6" style={{backgroundColor: '#e3e3e3'}}>
  //           <InputsView inputs={input_info.get('inputs')}
  //             {...bindActionCreators(InputsActions, dispatch)}/>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

export default connect(state => ({ input_info: state.input_info }))(Home)
