import React, { Component  } from 'react';


class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    this.setLoginResponse = this.props.setLoginResponse.bind(this);
    window.foo = function (){
      window.FB.getLoginStatus((authResponse) => {
        console.log(authResponse);
        this.setLoginResponse(authResponse)
      });
    }.bind(this);

    return (
      <div 
        className="fb-login-button" 
        data-width="" 
        data-size="large" 
        data-button-type="continue_with" 
        data-layout="default" 
        data-use-continue-as="true"
        data-auto-logout-link="true"
        data-onlogin = "foo">
      </div>)
  }
}

export default Facebook;
