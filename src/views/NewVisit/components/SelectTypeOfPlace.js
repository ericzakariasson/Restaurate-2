import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Label from '../../../components/Label';
import { PlusSquare } from 'react-feather';
import { Wrapper } from '../../../components/Input';


const Types = styled.ul`
  border-radius: 5px;
  box-shadow: ${p => p.theme.boxShadow};
  background: #FFF;
`;

const TypeWrapper = styled.li`
  padding: 18px 20px;
  display: flex;
  align-items: center;

  &:first-child {
    border-radius: 5px 5px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 5px 5px;
  }

  &:only-child {
    border-radius: 5px;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #EEE;
  }
`;

const Icon = styled.div`
  margin-right: 10px;
  transform: translateY(1px);
  
  svg {
    transition: ${p => p.theme.transition};
  }

  rect {
    fill: ${p => p.active ? p.theme.action : 'none'};
    stroke: ${p => p.theme.action};
    transition: ${p => p.theme.transition};
  }

  line {
    stroke: ${p => p.active ? '#FFF' : p.theme.action};
    transform-origin: 50% 50%;
    transition: ${p => p.theme.transition};

    &:first-of-type {
      transform: ${p => p.active ? `rotate(-45deg)` : 'none'}
    }
    
    &:last-of-type {
      transform: ${p => p.active ? `rotate(-45deg)` : 'none'}
    }
  }

`;

const Text = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
`;

class SelectTypeOfPlace extends Component {
  state = { selected: [] }

  toggle = value => {
    const { selected } = this.state;
    let newState;

    if (selected.includes(value)) {
      newState = selected.filter(type => type !== value);
    } else {
      newState = selected.concat([value])
    }

    this.setState({ selected: newState })
  }

  render() {
    return (
      <Wrapper>
        <Label>Typ av plats</Label>
        <Types>
          {
            this.props.types.map(type => (
              <TypeWrapper key={type.value} onClick={() => this.toggle(type.value)}>
                <Icon active={this.state.selected.includes(type.value)}>
                  <PlusSquare size={26} />
                </Icon>
                <Text>{type.label}</Text>
              </TypeWrapper>
            ))
          }
        </Types>
      </Wrapper>
    )
  }
}

SelectTypeOfPlace.propTypes = {
  types: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }))
}

export default SelectTypeOfPlace;