import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import { Transition, animated } from 'react-spring';
import { PlusCircle, X } from 'react-feather';
import { InputWithIcon } from './Input';

const ItemList = styled.ul`
  list-style: none;
  background: #FFF;
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 0 0 5px 5px;
  position: relative;
  border-top: ${p => p.length ? 1 : 0}px solid #DDD;
`;

const ItemText = styled.p`
  display: block;
  padding: 10px 12px;
  background: #F5F5F5;
  border-radius: 5px;
  font-size: 1.6rem;
  text-transform: uppercase;
  color: #222;
  font-weight: 500;
`;

const NoItems = styled(animated.span)`
  color: #AAA;
  font-size: 1.6rem;
  margin-top: 10px; 
  display: block;
  overflow: hidden;
`;

class InputList extends Component {
  state = {
    value: '',
  }

  handleChange = ({ target: { value } }) => this.setState({ value });

  handleSubmit = e => {
    e.preventDefault();
    this.addItem();
  }

  addItem = () => {
    const newItem = this.state.value.toUpperCase();
    const alreadyExists = this.props.items.includes(newItem);

    if (!alreadyExists && newItem.length > 0 && newItem.length < 64) {
      const newItems = this.props.items.concat([newItem]);
      this.props.addItem(newItems);
      this.setState({ value: '' })
    }
  }

  removeItem = item => {
    const items = this.props.items.filter(oldItem => oldItem !== item);
    this.props.removeItem(items)
  }

  render() {

    const gotItems = this.props.items.length > 0;

    return (
      <InputWithIcon
        label={this.props.label}
        value={this.state.value}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        placeholder={this.props.placeholder}
        color='action'
        style={gotItems ? { borderRadius: '5px 5px 0 0' } : undefined}
        Icon={PlusCircle}
        onIconClick={this.addItem}
        autoComplete="off"
      >
        <ItemList length={gotItems}>
          <Transition
            native
            keys={this.props.items}
            from={{ opacity: 0, paddingTop: 0, paddingBottom: 0, height: 0 }}
            enter={{ opacity: 1, paddingTop: this.props.padding, paddingBottom: this.props.padding, height: 'auto' }}
            leave={{ opacity: 0, paddingTop: 0, paddingBottom: 0, height: 0 }}>
            {this.props.items.map(item => styles => this.props.render({ item, styles, removeItem: this.removeItem }))}
          </Transition>
        </ItemList>
        <Transition
          native
          from={{ opacity: 0, height: 0, marginTop: 0 }}
          enter={{ opacity: 1, height: 16, marginTop: 10 }}
          leave={{ opacity: 0, height: 0, marginTop: 0 }}>
          {
            this.props.items.length === 0
              ? style => <NoItems style={style}>Inga {this.props.label}</NoItems>
              : () => null
          }
        </Transition>
      </InputWithIcon>
    )
  }
}

InputList.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  addItem: PropTypes.func,
  items: PropTypes.array.isRequired,
  padding: PropTypes.number.isRequired
}

export default InputList;