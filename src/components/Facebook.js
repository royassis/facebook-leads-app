import React, { Component  } from 'react';

class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));  

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
    <h1>{process.env.REACT_APP_FACEBOOK_APP_IDs}</h1>
    </div>)
  }

}

export default Facebook;
