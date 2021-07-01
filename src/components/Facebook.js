import React, { Component  } from 'react';

class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
    <div>
      <div 
        className="fb-login-button" 
        data-width="" 
        data-size="large" 
        data-button-type="continue_with" 
        data-layout="default" 
        data-use-continue-as="false"
        data-auto-logout-link="true">
      </div>
    </div>)
  }

}

export default Facebook;
