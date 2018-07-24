import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

import { Transition, animated } from 'react-spring';
import { PlusCircle, X } from 'react-feather';
import { InputWithIcon } from './Input';

const TagList = styled.ul`
  list-style: none;
  background: #FFF;
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 0 0 5px 5px;
  position: relative;
  border-top: ${p => p.length ? 1 : 0}px solid #DDD;
`;

const Tag = styled(animated.li)`
  font-size: 1.8rem;
  padding: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;

  &:not(:last-of-type) {
    border-bottom: 1px solid #EEE;
  }


  &:last-of-type {
    border-radius: 0 0 5px 5px;
  }
`;

const TagText = styled.p`
  display: block;
`;

const NoTags = styled(animated.span)`
  color: #AAA;
  font-size: 1.6rem;
  margin-top: 10px; 
  display: block;
`;

class Tags extends Component {
  state = {
    value: '',
    tags: []
  }

  handleChange = ({ target: { value } }) => this.setState({ value });

  handleSubmit = e => {
    e.preventDefault();
    this.addTag();
  }

  addTag = () => {
    const alreadyExists = this.state.tags.includes(this.state.value);

    if (!alreadyExists && this.state.value.length > 0) {
      this.setState({ tags: this.state.tags.concat([this.state.value]), value: '' })
    }
  }

  removeTag = tag => {
    console.log('tag: ', tag);
    const tags = this.state.tags.filter(oldTag => oldTag !== tag);
    this.setState({ tags });
  }

  render() {

    const gotTags = this.state.tags.length > 0;

    return (
      <InputWithIcon
        label={'Taggar'}
        value={this.state.value}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        placeholder={'Nationalitet, specialkost'}
        color='action'
        style={gotTags ? { borderRadius: '5px 5px 0 0' } : undefined}
        Icon={PlusCircle}
        onIconClick={this.addTag}
        autoComplete="off"
      >
        <TagList length={gotTags}>
          <Transition
            native
            keys={this.state.tags}
            from={{ opacity: 0, padding: 0, height: 0 }}
            enter={{ opacity: 1, padding: 20, height: 'auto' }}
            leave={{ opacity: 0, padding: 0, height: 0 }}>
            {this.state.tags.map(item => styles => (
              <Tag style={{ ...styles, padding: styles.padding.interpolate(y => `${y}px 20px`) }}>
                <TagText>{item}</TagText>
                <X color={this.props.theme.danger} onClick={() => this.removeTag(item)} />
              </Tag>)
            )}
          </Transition>
        </TagList>
        <Transition
          native
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}>
          {
            this.state.tags.length === 0
              ? style => <NoTags style={style}>Inga taggar</NoTags>
              : () => null
          }
        </Transition>
      </InputWithIcon>
    )
  }
}

export default withTheme(Tags);