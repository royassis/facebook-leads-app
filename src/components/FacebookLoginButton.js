 import React, { Component  } from 'react';


class FacebookLoginButton extends Component {
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
        data-scope="public_profile,pages_show_list,leads_retrieval,pages_manage_ads,pages_read_engagement,ads_management"
        data-onlogin = "foo">
      </div>)
  }
}

export default FacebookLoginButton;
