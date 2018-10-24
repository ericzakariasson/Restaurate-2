import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Label from '../../../components/Label';
import { Wrapper } from '../../../components/Input';


const Types = styled.ul`
  display: flex;
`;

const TypeWrapper = styled.li`
  box-shadow: ${p => p.theme.boxShadow};

  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;

const Text = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${p => p.checked ? '#FFF' : '#222'};
  transition: ${p => p.theme.transition};
`;

const HiddenInput = styled.input`
  display: none;
`;

const TypeLabel = styled.label`
  border-radius: 2px;
  padding: 10px 15px;
  background: ${p => p.checked ? '#222' : '#FFF'};
  transition: ${p => p.theme.transition};
  cursor: pointer;
  display: flex;
  align-items: center;
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
                  <TypeLabel 
                  checked={checked}
                  htmlFor={id}>
                    <HiddenInput
                      type="checkbox"
                      value={type.value}
                      checked={checked}
                      onChange={this.toggle}
                      id={id}
                    />
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