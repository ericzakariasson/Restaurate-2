import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Punchline,
  Text,
  Content,
} from './Start';

import GoogleIcon from '../icons/Google.svg';
// import { withRouter, Redirect } from 'react-router-dom';

import { AUTH_TOKEN } from '../constants';

import { GoogleLogin } from 'react-google-login';

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

const signUp = gql`
  mutation ($tokenId: String!) {
    signUp(tokenId: $tokenId) {
      token
    }
}`;

class SignIn extends Component {
  state = {
    isSigningIn: false,
    redirectToReferrer: false,
    error: ''
  };

  onRequest = () => this.setState({ isSigningIn: true });

  handleSuccess = async ({ tokenId }) => {
    const { data } = await this.props.signUp(tokenId);

    localStorage.setItem(AUTH_TOKEN, data.signUp.token);

    await this.props.refetch();

    this.props.history.push('/');
  };

  handleFailure = response => {
    this.setState({ error: response });
    this.setState({ isSigningIn: false });
  };

  render() {

    const { styles } = this.props;

    return (
      <Fragment>
        <Content style={{ transform: `translateY(${styles.y}px)`, ...styles }}>
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
        </Content>
        <div />
      </Fragment>
    )
  }
}

const SignInWithGraphQL = graphql(signUp, {
  props: ({ mutate }) => ({
    signUp: tokenId => mutate({ variables: { tokenId } }),
  }),
})(SignIn);


export default SignInWithGraphQL;
