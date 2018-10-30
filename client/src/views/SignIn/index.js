import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { graphql, Mutation } from 'react-apollo';
import SIGN_IN from './SIGN_IN';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import { withSession } from '../../components/Session';

import GoogleIcon from '../../icons/Google.svg';
import { AUTH_TOKEN } from '../../constants';

import {
  Punchline,
  Text,
  Background,
  Title,
  AnimatedContent
} from '../Landing';

const GoogleButton = styled(GoogleLogin)`
  border-radius: 2px;
  background: #FFF;
  position: relative;
  font-size: 2.0rem;
  padding: 15px 20px;
  padding-left: 59px;
  font-weight: 700;
  border: none;
  outline: none;
  text-align: left;
  color: ${p => p.theme.action};
`;

const ButtonIcon = styled.span`
  position: absolute;
  left: 5px;
  top: 0;
  height: 100%;
`;

class SignIn extends Component {
  state = {
    isSigningIn: false,
    redirectToReferrer: false,
    error: ''
  };

  onRequest = () => this.setState({ isSigningIn: true });

  handleSuccess = async ({ tokenId }) => {
    const { data } = await this.props.signUp(tokenId);

    localStorage.setItem(AUTH_TOKEN, data.signIn.token);

    await this.props.refetch();
    this.props.history.push('/');
  };

  handleFailure = response => {
    this.setState({ 
      error: response,
      isSigningIn: false
    });
  };

  render() {

    return (
      <Background>
        <Title>Restaurate</Title>
        <AnimatedContent>
          <Punchline>Logga in</Punchline>
          <Text>
            Vi kommer aldrig att publicera något eller utföra annan aktivitet med ditt konto.
          </Text>
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
        </AnimatedContent>
        <div />
      </Background>
    )
  }
}

const SignInWithGraphQL = graphql(SIGN_IN, {
  props: ({ mutate }) => {
    return {
      signUp: tokenId => mutate({ variables: { tokenId } }),
    }
  },
})(SignIn);


export default withRouter(withSession(SignInWithGraphQL));
