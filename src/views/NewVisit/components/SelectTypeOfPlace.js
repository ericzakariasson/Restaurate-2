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
  /* transform: translateY(1px); */
  transform-origin: 50% 50%;
  transition: ${p => p.theme.transition};
  
  svg {
    transition: ${p => p.theme.transition};
  }

  rect {
    fill: ${p => p.checked ? p.theme.action : 'none'};
    stroke: ${p => p.theme.action};
    transition: ${p => p.theme.transition};
  }

  line {
    stroke: ${p => p.checked ? '#FFF' : p.theme.action};
    transform-origin: 50% 50%;
    transition: ${p => p.theme.transition};

    &:first-of-type {
      transform: ${p => p.checked ? `rotate(-45deg)` : 'none'}
    }
    
    &:last-of-type {
      transform: ${p => p.checked ? `rotate(-45deg)` : 'none'}
    }
  }

`;

const Text = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
`;

const HiddenInput = styled.input`
  display: none;
`;

const TypeLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;

  &:active ${Icon} {
    transform: scale(0.9);
  }
`;

class SelectTypeOfPlace extends Component {
  toggle = ({ target: { value, checked: isChecked } }) => {
    const { checked } = this.props;
    let newChecked;

    if (!isChecked) {
      newChecked = checked.filter(type => type !== value);
    } else {
      newChecked = checked.concat([value])
    }

    this.props.onSelect('typesOfPlace', newChecked);
  }

  render() {
    return (
      <Wrapper>
        <Label>Typ av plats</Label>
        <Types>
          {
            this.props.types.map(type => {
              const checked = this.props.checked.includes(type.value);
              const id = `type-of-place-${type.value}`;
              return (
                <TypeWrapper key={type.value}>
                  <TypeLabel htmlFor={id}>
                    <HiddenInput
                      type="checkbox"
                      value={type.value}
                      checked={checked}
                      onChange={this.toggle}
                      id={id}
                    />
                    <Icon checked={checked}>
                      <PlusSquare size={26} />
                    </Icon>
                    <Text checked={checked}>{type.label}</Text>
                  </TypeLabel>
                </TypeWrapper>
              )
            })
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
  })),
  checked: PropTypes.arrayOf(PropTypes.string.isRequired)
}

export default SelectTypeOfPlace;