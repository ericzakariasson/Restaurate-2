import * as React from 'react';
import styled from 'styled-components';

import { Icon } from 'react-feather';

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

interface IconProps {
  size: number;
  color: string;
}

interface ActionButtonProps {
  icon: Icon;
  iconProps?: IconProps;
  onClick?: () => void;
  content?: React.ReactNode;
  as?: 'button' | 'span' | 'div';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const ActionButton = ({
  onClick,
  icon: Icon,
  iconProps = { size: 20, color: '#666' },
  content,
  type = 'button',
  as = 'button',
  disabled
}: ActionButtonProps) => {
  return (
    <Background as={as} onClick={onClick} type={type} disabled={disabled}>
      {content}
      <Icon {...iconProps} />
    </Background>
  );
};
