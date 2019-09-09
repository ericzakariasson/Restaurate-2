import * as React from 'react';
import styled from 'styled-components';

const Background = styled.button`
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  margin-left: 10px;
  box-shadow: ${p => p.theme.boxShadow};
`;

interface ActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  as?: 'button' | 'span' | 'div';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const ActionButton = ({
  icon,
  onClick,
  type = 'button',
  as = 'button',
  disabled
}: ActionButtonProps) => {
  return (
    <Background as={as} onClick={onClick} type={type} disabled={disabled}>
      {icon}
    </Background>
  );
};
