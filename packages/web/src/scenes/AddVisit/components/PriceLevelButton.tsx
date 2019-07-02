import * as React from 'react';
import styled from 'styled-components';
import { PriceLevelProps } from '../../../utils/priceLevelHelpers';

const Item = styled.li`
  margin-bottom: 10px;
`;

interface ButtonProps {
  selected: boolean;
}

const Button = styled.button<ButtonProps>`
  border-radius: 3px;
  border: 1px solid ${p => (p.selected ? '#bbb' : '#CCC')};
  outline: none;
  width: 100%;
  padding: 15px;
  background: #fcfcfc;
  color: #222;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: ${p => p.theme.transition};
  box-shadow: ${p => p.theme.boxShadow};
`;

const Name = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

interface CheckProps {
  selected: boolean;
}

const Check = styled.span<CheckProps>`
  display: block;
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
  background: ${p => (p.selected ? '#222' : '#DDD')};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 0.25rem;
    background: ${p => p.theme.colors.primary.hex};
    opacity: ${p => (p.selected ? 1 : 0)};
    transition: ${p => p.theme.transition};
  }
`;

interface PriceLevelButtonProps {
  priceLevel: PriceLevelProps;
  selected: boolean;
  onClick: () => void;
}

export const PriceLevelButton = ({
  priceLevel,
  selected,
  onClick
}: PriceLevelButtonProps) => (
  <Item>
    <Button selected={selected} onClick={onClick}>
      <Name>{priceLevel.label}</Name>
      <Check selected={selected} />
    </Button>
  </Item>
);
