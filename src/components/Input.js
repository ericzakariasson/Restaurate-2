import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Label from './Label';

export const StyledInput = styled.input`
  border-radius: 5px;
  border: none;
  outline: none;
  box-shadow: ${p => p.theme.inputShadow};
  font-size: 2rem;
  height: 60px;
  padding: 10px 20px;
  width: 100%;

  padding-right: ${p => p.icon ? '60px' : '20px'};

  font-size: 2rem;
  font-family: ${p => p.theme.fonts.text};

  transition: ${p => p.theme.transition};

  &::placeholder {
    color: #DDD;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = ({ onChange, name, value, label, placeholder }) => {

  if (label) {

    const id = label
      .replace(/[ÅÄåä]/, 'a')
      .replace(/[Öö]/, 'o')
      .replace(/\s/, '-')
      .toLowerCase()

    return (
      <Wrapper>
        <Label htmlFor={id}>{label}</Label>
        <StyledInput
          onChange={onChange}
          value={value}
          name={name}
          placeholder={placeholder}
          id={id}
        />
      </Wrapper>
    )
  }

  return (
    <StyledInput
      onChange={onChange}
      value={value}
      name={name}
      placeholder={placeholder}
    />
  )
}

Input.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
}

const InputIconWrapper = styled.form`
  position: relative;
`;

const IconWrapper = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 0;  

  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate(0, -50%);
  border-radius: 50%;
  transition: ${p => p.theme.transition};
  transform-origin: 50% 50%;

  &:hover {
    transition: ${p => p.theme.transition};
    transform: translate(0, -50%) scale(1.1);
  }
 
  &:active {
    transition: ${p => p.theme.transition};
    transform: translate(0, -50%) scale(0.9);
  }
  
  svg {
    color: ${p => p.theme[p.color]};
  }
`;

const InputChildrenWrapper = styled.div`
  position: relative;
  z-index: 10;
`;

export const InputWithIcon = ({ onChange, name, value, label, placeholder, Icon, onSubmit, children, color, onIconClick, ...props }) => {
  const id = label
    .replace(/[ÅÄåä]/, 'a')
    .replace(/[Öö]/, 'o')
    .replace(/\s/, '-')
    .toLowerCase()

  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <InputChildrenWrapper>
        <InputIconWrapper onSubmit={onSubmit}>
          <StyledInput
            onChange={onChange}
            value={value}
            name={name}
            placeholder={placeholder}
            id={id}
            icon="true"
            {...props}
          />
          <IconWrapper onClick={onIconClick} type="button" color={color}>
            <Icon />
          </IconWrapper>
        </InputIconWrapper>
        {children}
      </InputChildrenWrapper>
    </Wrapper>
  )
}

export default Input;