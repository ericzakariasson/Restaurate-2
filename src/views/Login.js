import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { withRouter } from 'react-router-dom';

import { AUTH_TOKEN } from '../constants';

import { animated } from 'react-spring';
import Button from '../components/Button';

import Google from '../icons/Google.svg';

const Page = styled(animated.div)`
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

class Login extends Component {

  state = {
    isSigningIn: false,
  }

  handleLogin = () => {
    this.setState({ isSigningIn: true });

    setTimeout(() => this.setState({ isSigningIn: false }), 5000);

    let success = true;

    if (success) {
      localStorage.setItem(AUTH_TOKEN, '123');
      this.props.history.push('/');
    }
  }

  render() {

    const { isSigningIn } = this.state;

    return (
      <animated.div style={this.props.style}>
        {
          isSigningIn
            ? (
              <CenterWrapper>
                LOGGAR IN
              </CenterWrapper>
            )
            : (
              <Page /* style={this.props.style} */>
                <Title >Logga in</Title>
                <Disclaimer >Vi kommer aldrig att publicera något eller utföra annan aktivitet med ditt konto</Disclaimer>
                <SocialLoginButton onClick={this.handleLogin}>
                  <IconWrapper>
                    <img src={Google} alt={`Logga in med Google`} />
                  </IconWrapper>
                  Logga in med Google
                </SocialLoginButton>
              </Page>
            )
        }
      </animated.div>
    )
  }
}

export default withRouter(Login);