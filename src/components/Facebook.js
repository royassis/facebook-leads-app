import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';


class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userId: '',
      name: '',
      email: '',
      picture: ''
    };
  }

  componentClicked() {
    console.log("im clicked");
  }
  responseFacebook(response) {
    this.props.setAccessToken(response.accessToken);
    this.props.historyA.push("/site");
  }

  render() {
    this.componentClicked = this.componentClicked.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = null;
    } else {
      fbContent = (<FacebookLogin
        appId="56833887771"
        autoLoad={true}
        scope="ads_management,ads_read,leads_retrieval,pages_manage_ads"
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook}
      />);
    }

    return (<div>{fbContent}</div>)
  }

}

export default Facebook;
