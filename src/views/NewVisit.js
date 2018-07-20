import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

import { InputWithIcon } from '../components/Input';

import { Search, X } from 'react-feather';

import { Transition, animated, config } from 'react-spring';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #FCFCFC;
  min-height: 100vh;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: #DDD;
`;

const Background = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.05);
  opacity: ${p => p.open ? 1 : 0};
  transition: ${p => p.theme.transition};
  z-index: 5;
`;

class NewVisit extends Component {

  state = { isOpen: false, value: '' }

  handleChange = ({ target: { value } }) => this.setState({ value });

  handleSubmit = e => {
    e.preventDefault();
    this.toggle();
  }

  toggle = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  render() {

    const { isOpen, value } = this.state;
    const { danger, action } = this.props.theme;
    
    return (
      <Page>
        <Title>Plats</Title>
          <div>
            <InputWithIcon 
              label="Sök plats" 
              placeholder="Namn eller adress" 
              Icon={isOpen ? X : Search}
              color={isOpen ? 'danger' : 'action'}
              value={value} 
              onChange={this.handleChange} 
              onSubmit={this.handleSubmit}
              style={isOpen ? { borderRadius: '5px 5px 0 0' } : undefined }
            >
              <Transition
                from={{ opacity: 0.5, transform: 'scale3d(0.25,0.25,0.5)' }}
                enter={{ opacity: 1, transform: 'scale3d(1,1,1)' }}
                leave={{ opacity: 0, transform: 'scale3d(0.25,0.25,0.5)' }}
                config={config.stiff}
              >
                {
                  isOpen
                    ? style => (
                      <List 
                        style={style} 
                        onClick={this.toggle} 
                        value={value} 
                        onChange={this.handleChange} 
                      />
                    ) : () => null
                }
              </Transition>
            </InputWithIcon>
            {
              <Background open={isOpen} />
            }
          </div>
      </Page>
    )
  }
}

const StyledListWrapper = styled(animated.div)`
  transform-origin: 100% 0;
  position: relative;
  z-index: 11;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  top: 0;
  right: 0;
  width: 100%;
  height: 400px;
  border-radius: 0 0 5px 5px;
  background: #FFF;
  border-top: 1px solid #EEE;
`;

const List = ({ onClick, value, onChange, style }) => {
  return (
    <StyledListWrapper style={style}>
    </StyledListWrapper>
  )
}

export default withTheme(NewVisit);