import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

import { Transition, animated } from 'react-spring';
import { PlusCircle, X } from 'react-feather';
import { InputWithIcon } from '../../../components/Input';

const OrderList = styled.ul`
  list-style: none;
  background: #FFF;
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 0 0 5px 5px;
  position: relative;
  border-top: ${p => p.length ? 1 : 0}px solid #DDD;
`;

const Order = styled(animated.li)`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:last-of-type) {
    border-bottom: 1px solid #EEE;
  }


  &:last-of-type {
    border-radius: 0 0 5px 5px;
  }
`;

const OrderText = styled.p`
  display: block;
  font-size: 1.8rem;
  color: #222;
  font-weight: 500;

  position: relative;

  padding-left: 18px;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    width: 8px;
    height: 8px;
    border-radius: 5px;
    background: ${p => p.theme.visit};
  }
`;

const NoOrders = styled(animated.span)`
  color: #AAA;
  font-size: 1.6rem;
  margin-top: 10px; 
  display: block;
`;

class AddOrders extends Component {
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

    const newItem = this.state.value;

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
        label={'Beställningar'}
        value={this.state.value}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        placeholder={'Namn, nummer'}
        color='action'
        style={gotItems ? { borderRadius: '5px 5px 0 0' } : undefined}
        Icon={PlusCircle}
        onIconClick={this.addItem}
        autoComplete="off"
      >
        <OrderList length={gotItems}>
          <Transition
            native
            keys={this.state.items}
            from={{ opacity: 0, padding: 0, height: 0 }}
            enter={{ opacity: 1, padding: 20, height: 'auto' }}
            leave={{ opacity: 0, padding: 0, height: 0 }}>
            {this.state.items.map(item => styles => (
              <Order style={{ ...styles, padding: styles.padding.interpolate(y => `${y}px 20px`) }}>
                <OrderText>{item}</OrderText>
                <X color={this.props.theme.danger} onClick={() => this.removeItem(item)} />
              </Order>)
            )}
          </Transition>
        </OrderList>
        <Transition
          native
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}>
          {
            this.state.items.length === 0
              ? style => <NoOrders style={style}>Inga beställningar</NoOrders>
              : () => null
          }
        </Transition>
      </InputWithIcon>
    )
  }
}

export default withTheme(AddOrders);