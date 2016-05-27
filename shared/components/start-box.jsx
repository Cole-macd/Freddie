import React from 'react';

export default class StartBox extends React.Component {
  handleButton = () => {
    this.props.nextStep(this.props.nextActive);
  };

  render() {
    if (this.props.active == 'StartBox') {
      const button_style = {
        marginBottom: '20px'
      };

      return (
        <div className="text-center">
          <button type="button" style={button_style} className="btn btn-primary" onClick={this.handleButton}>Start</button>
        </div>
      )
    } else {
      return null;
    }
  };
};
