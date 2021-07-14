 import React, { Component  } from 'react';


class FacebookLoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loginOnClick = this.loginOnClick.bind(this);
    this.logoutOnClick = this.logoutOnClick.bind(this);
  }

  loginOnClick(){
    window.FB.login(function(response) {
      this.props.setLoginResponse(response);
    }.bind(this), {
        scope: "public_profile,pages_show_list,leads_retrieval,pages_manage_ads,pages_read_engagement,ads_management", 
        return_scopes: true
    });
  }
  
  logoutOnClick(){
    window.FB.logout(()=>{
      console.log("loggedout");
      window.FB.getLoginStatus((authResponse) => {
        this.props.setLoginResponse(authResponse);
      });
    });
  }

  render() {
    
    return (
      this.props.fbSdkStatus === 1 ? 
        <button onClick = {this.props.loginResponse.status === "connected" ? this.logoutOnClick : this.loginOnClick}>
          {this.props.loginResponse.status === "connected" ? "logout" : "login"}
        </button> : "Fbsdk loading")
  }
}

export default FacebookLoginButton;
