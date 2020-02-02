import * as React from 'react';
import styled from 'styled-components';

import { Icon } from 'react-feather';

const Button = styled.button`
  background: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  margin-left: 0.5rem;
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
  iconProps = { size: 18, color: '#222' },
  content,
  type = 'button',
  as = 'button',
  disabled
}: ActionButtonProps) => {
  if (as === 'button') {
    return (
      <Button onClick={onClick} type={type} disabled={disabled}>
        {content}
        <Icon {...iconProps} />
      </Button>
    );
  }

  return (
    <Button as={as} onClick={onClick}>
      {content}
      <Icon {...iconProps} />
    </Button>
  );
};
