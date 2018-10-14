import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import GoogleIcon from '../icons/Google.svg';
// import { withRouter, Redirect } from 'react-router-dom';
// import { animated } from 'react-spring';

import { graphql } from 'react-apollo';
import signUp from '../mutations/signUp.gql';
import { AUTH_TOKEN } from '../constants';

import { GoogleLogin } from 'react-google-login';
import { saveToken } from '../auth';

// import Button from '../components/Button';
// import Google from '../icons/Google.svg';

/* const Page = styled(animated.div)`
  padding: 40px;
  display: flex;
  flex-direction: column;
  background: ${p => p.theme.background};
  justify-content: center;
  min-height: calc(100vh - 10px);
`;

const Title = styled(animated.h1)`
  font-size: 3.6rem;
  color: #222;
  margin-bottom: 10px;
  font-weight: 500;
`;

const Disclaimer = styled(animated.p)`
  color: #666;
  line-height: 1.2;
  font-size: 1.6rem;
  margin-bottom: 60px;
`;

const SocialLoginButton = styled(Button)`
  position: relative;
  height: 60px;
  text-align: left;
  padding-left: 60px;

  > span {
    font-size: 1.8rem !important;
    color: #222;
    font-weight: 400;
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledGoogleLogin = styled(GoogleLogin)`
  border-radius: 5px;
  box-shadow: ${p => p.theme.boxShadow};
  background: ${p => (p.cta ? p.theme.action : '#FFF')};
  padding: 20px 0;
  border: none;
  outline: none;
  position: relative;
  height: 60px;
  text-align: left;
  padding-left: 60px;
  font-family: ${p => p.theme.fonts.text};
  font-size: 1.8rem;
`; */

const GoogleButton = styled(GoogleLogin)`
  border-radius: 2px;
  background: #FFF;
  position: relative;
  font-size: 2.0rem;
  padding: 15px 20px;
  padding-left: 64px;
  font-weight: 700;
  border: none;
  outline: none;
  text-align: left;
  color: ${p => p.theme.action};
`;

const ButtonIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 0;
  height: 100%;
`;

const Background = styled.section`
  width: 100vw;
  height: 100vh;
  background: ${p => p.theme.black};
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
`;



class SignIn extends Component {
  state = {
    isSigningIn: false,
    redirectToReferrer: false,
    error: ''
  };

  onRequest = () => this.setState({ isSigningIn: true });

  handleSuccess = async ({ tokenId }) => {
    console.log('tokenId: ', tokenId);

    const {
      data: {
        login: {
          token
        }
      }
    } = await this.props.login(tokenId);

    localStorage.setItem(AUTH_TOKEN, token);

    this.setState({ redirectToReferrer: true });
    this.props.history.push('/');
  };

  handleFailure = response => {
    this.setState({ error: response });
    this.setState({ isSigningIn: false });
  };

  render() {
    return (
      <Background>
        <GoogleButton
          clientId={process.env.GOOGLE_CLIENT_ID}
          onRequest={this.onRequest}
          onFailure={this.handleFailure}
          onSuccess={this.handleSuccess}
        >
          <ButtonIcon>
            <img style={{ height: '100%' }} src={GoogleIcon} alt={`Logga in med Google`} />
          </ButtonIcon>
          Logga in med Google
        </GoogleButton>
        {
          this.state.isSigningIn
            ? <h1 style={{ color: '#FFF' }}>Loggar in</h1>
            : null
        }
      </Background>
    )
  }
}

/* const withGraphQL = graphql(loginWithToken, {
  props: ({ mutate }) => ({
    login: (idToken) => mutate({ variables: { idToken } }),
  }),
})(Login);
 */
// export default withRouter(withGraphQL);

export default SignIn;
