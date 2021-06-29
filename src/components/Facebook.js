import React, { Component  } from 'react';

class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      name: '',
      email: '',
      picture: ''
    };
    this.setLoginResponse = this.props.setLoginResponse.bind(this);
  }

  responseFacebook() {
    console.log("im clicked");
    this.props.historyA.push("/site");
  }

  render() {
    this.responseFacebook = this.responseFacebook.bind(this);

    window.onLoad = () => {
      window.FB.getLoginStatus(function(response) {
        this.setLoginResponse(response);
      }.bind(this));
    }


    return (
    <div 
      className="fb-login-button" 
      data-width="" 
      data-size="large" 
      data-button-type="continue_with" 
      data-layout="default" 
      data-use-continue-as="false"
      data-auto-logout-link="true"
      data-onlogin = "onLoad">
    </div>)
  }

}

export default Facebook;
