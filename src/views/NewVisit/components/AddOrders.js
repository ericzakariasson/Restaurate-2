import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

import { animated } from 'react-spring';
import { X } from 'react-feather';

import InputList from '../../../components/InputList';

const Order = styled(animated.li)`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

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

class AddOrders extends Component {
  state = { items: [] }

  addItem = items => this.setState({ items });
  removeItem = items => this.setState({ items })

  render() {
    return (
      <InputList
        label={'Beställningar'}
        placeholder={'Namn, nummer'}
        padding={20}
        addItem={this.addItem}
        removeItem={this.removeItem}
        items={this.state.items}
        render={
          ({ item, styles, removeItem }) => (
            <Order style={styles}>
              <OrderText>{item}</OrderText>
              <X color={this.props.theme.danger} onClick={() => removeItem(item)} />
            </Order>
          )
        }
      />
    )
  }
}

export default withTheme(AddOrders);