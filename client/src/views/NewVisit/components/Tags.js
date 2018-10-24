import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';

import { animated } from 'react-spring';
import { X } from 'react-feather';

import InputList from '../../../components/InputList';

const Tag = styled(animated.li)`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 10px;

  &:not(:last-of-type) {
  }

  &:last-of-type {
    border-radius: 0 0 5px 5px;
  }

  svg {
    padding: 3px;
    border-radius: 50%;
    stroke-width: 3;
    border: 2px solid rgba(0,0,0,0.04);
  }
`;

const TagText = styled.p`
  display: block;
  border-radius: 5px;
  font-size: 1.8rem;
  text-transform: uppercase;
  color: #444;
  font-weight: 700;
`;

const Separator = styled.span`
  flex: 1;
  height: 1px;
  background: #222;
  opacity: 0.2;
  margin: 0 10px;
`;

const Delete = styled.button`
  color: ${p => p.theme.danger};
  font-weight: 700;
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  background: none;
  font-size: 1.6rem;
`;

class Tags extends Component {
  state = { items: [] }

  addItem = items => this.props.onAdd('tags', items);
  removeItem = items => this.props.onAdd('tags', items);

  render() {

    return (
      <InputList
        label={'Taggar'}
        placeholder={'Nationalitet, specialkost'}
        padding={10}
        uppercase
        addItem={this.addItem}
        removeItem={this.removeItem}
        items={this.props.tags}
      >
        {
          ({ item, styles, removeItem }) => (
            <Tag style={styles}>
              <TagText>{item}</TagText>
              <Separator />
              <X size={24} color={this.props.theme.danger} onClick={() => removeItem(item)} />
            </Tag>
          )
        }
      </InputList>
    )
  }
}

export default withTheme(Tags);