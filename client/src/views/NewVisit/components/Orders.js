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
  padding-right: 20px;

  svg {
    padding: 3px;
    stroke-width: 3;
    border: 2px solid ${p => p.theme.danger};
  }
`;

const Separator = styled.span`
  flex: 1;
  height: 1px;
  background: #222;
  opacity: 0.2;
  margin: 0 10px;
`;

const OrderText = styled.p`
  display: block;
  font-size: 2.2rem;
  color: #222;
  font-weight: 500;
`;

class Orders extends Component {
  addItem = items => this.props.onAdd('orders', items);
  removeItem = items => this.props.onAdd('orders', items);

  render() {
    return (
      <InputList
        label={'Beställningar'}
        placeholder={'Namn, nummer'}
        padding={10}
        addItem={this.addItem}
        removeItem={this.removeItem}
        items={this.props.orders}>
        {
          ({ item, styles, removeItem }) => (
            <Order style={styles}>
              <OrderText>- {item}</OrderText>
              <Separator />
              <X size={26} color={this.props.theme.danger} onClick={() => removeItem(item)} />
            </Order>
          )
        }
      </InputList>
    )
  }
}

export default withTheme(Orders);