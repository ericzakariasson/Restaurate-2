import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

import { Transition, animated } from 'react-spring';
import { PlusCircle, X } from 'react-feather';
import { InputWithIcon } from '../../../components/Input';

const TagList = styled.ul`
  list-style: none;
  background: #FFF;
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 0 0 5px 5px;
  position: relative;
  border-top: ${p => p.length ? 1 : 0}px solid #DDD;
`;

const Tag = styled(animated.li)`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px !important;

  &:not(:last-of-type) {
    border-bottom: 1px solid #EEE;
  }


  &:last-of-type {
    border-radius: 0 0 5px 5px;
  }
`;

const TagText = styled.p`
  display: block;
  padding: 10px 12px;
  background: #F5F5F5;
  border-radius: 5px;
  font-size: 1.6rem;
  text-transform: uppercase;
  color: #222;
  font-weight: 500;
`;

const NoTags = styled(animated.span)`
  color: #AAA;
  font-size: 1.6rem;
  margin-top: 10px; 
  display: block;
  overflow: hidden;
`;

class AddTags extends Component {
  state = {
    value: '',
    items: []
  }

  handleChange = ({ target: { value } }) => this.setState({ value });

  handleSubmit = e => {
    e.preventDefault();
    this.addItem();
  }

  addItem = () => {

    const newItem = this.state.value.toUpperCase();

    const alreadyExists = this.state.items.includes(newItem);

    if (!alreadyExists && newItem.length > 0 && newItem.length < 64) {
      this.setState({ items: this.state.items.concat([newItem]), value: '' })
    }
  }

  removeItem = item => {
    const items = this.state.items.filter(oldItem => oldItem !== item);
    this.setState({ items });
  }

  render() {

    const gotItems = this.state.items.length > 0;

    return (
      <InputWithIcon
        label={'Taggar'}
        value={this.state.value}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        placeholder={'Nationalitet, specialkost'}
        color='action'
        style={gotItems ? { borderRadius: '5px 5px 0 0' } : undefined}
        Icon={PlusCircle}
        onIconClick={this.addItem}
        autoComplete="off"
      >
        <TagList length={gotItems}>
          <Transition
            native
            keys={this.state.items}
            from={{ opacity: 0, padding: 0, height: 0 }}
            enter={{ opacity: 1, padding: 10, height: 'auto' }}
            leave={{ opacity: 0, padding: 0, height: 0 }}>
            {this.state.items.map(item => styles => (
              <Tag style={{ ...styles, padding: styles.padding.interpolate(y => `${y}px 10px`) }}>
                <TagText>{item}</TagText>
                <X color={this.props.theme.danger} onClick={() => this.removeItem(item)} />
              </Tag>)
            )}
          </Transition>
        </TagList>
        <Transition
          native
          from={{ opacity: 0, height: 0, marginTop: 0}}
          enter={{ opacity: 1, height: 16, marginTop: 10 }}
          leave={{ opacity: 0, height: 0, marginTop: 0 }}>
          {
            this.state.items.length === 0
              ? style => <NoTags style={style}>Inga taggar</NoTags>
              : () => null
          }
        </Transition>
      </InputWithIcon>
    )
  }
}

export default withTheme(AddTags);