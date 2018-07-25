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

class AddTags extends Component {
  state = { items: [] }

  addItem = items => this.setState({ items });
  removeItem = items => this.setState({ items })

  render() {

    return (
      <InputList
        label={'Taggar'}
        placeholder={'Nationalitet, specialkost'}
        padding={10}
        addItem={this.addItem}
        removeItem={this.removeItem}
        items={this.state.items}
        render={
          ({ item, styles, removeItem }) => (
            <Tag style={styles}>
              <TagText>{item}</TagText>
              <X color={this.props.theme.danger} onClick={() => removeItem(item)} />
            </Tag>
          )
        }
      />
    )
  }
}

export default withTheme(AddTags);