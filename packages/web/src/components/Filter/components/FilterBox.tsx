import * as React from 'react';
import { Icon } from 'react-feather';
import styled from 'styled-components';

const ICON_SIZE = 20;

const Wrapper = styled.button`
  background: #fff;
  border: none;
  text-align: left;
  flex: 1;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  box-shadow: ${p => p.theme.boxShadow};
  cursor: pointer;

  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;

const Title = styled.span`
  padding: 0 10px;
  flex: 1;
  font-size: ${p => p.theme.fontSize.normal};
`;

const IconWrapper = styled.div`
  background: #eee;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${ICON_SIZE + 16}px;
  height: ${ICON_SIZE + 16}px;
`;

interface FilterBoxProps {
  icon: Icon;
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

export const FilterBox: React.FC<FilterBoxProps> = ({
  icon: Icon,
  title,
  onClick,
  disabled
}) => {
  return (
    <Wrapper onClick={onClick} disabled={disabled}>
      <Title>{title}</Title>
      <IconWrapper>
        <Icon size={ICON_SIZE} />
      </IconWrapper>
    </Wrapper>
  );
};
