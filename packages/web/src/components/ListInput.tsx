import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus } from 'react-feather';

import { Input } from './Input';
import { SmallLabel } from './Label';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const List = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  padding: 10px 15px;
  border-radius: 3px;
  background: #fff;
  margin-bottom: 5px;
  border: 1px solid #eee;

  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
`;

const Remove = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  color: ${p => p.theme.colors.primary.hex};
  font-size: 0.75rem;
  font-weight: 600;
  white-space: pre;
  margin-left: 5px;
`;

const Form = styled.form`
  position: relative;
  margin-bottom: 10px;
`;

const StyledInput = styled(Input)`
  padding-right: 50px;
`;

interface AddButtonProps {
  active: boolean;
}

const AddItem = styled.button<AddButtonProps>`
  background: none;
  border: none;
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  right: 5px;
  top: 5px;
  background: ${p => (p.active ? '#FFF' : 'none')};
  transition: ${p => p.theme.transition};

  svg {
    stroke: ${p => (p.active ? p.theme.colors.primary.hex : '#AAA')};
    transition: ${p => p.theme.transition};
  }
`;

const ItemText = styled.span`
  word-break: break-all;
`;

const NoItems = styled.p`
  margin-top: 5px;
  font-size: 1rem;
  color: #aaa;
  text-align: center;
`;

interface ListInputProps {
  label?: string;
  items: string[];
  addItem: (item: string) => void;
  removeItem: (index: number) => void;
  maxLength?: number;
}

export const ListInput = ({
  items,
  addItem,
  removeItem,
  label,
  maxLength = 50
}: ListInputProps) => {
  const [value, setValue] = useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setValue(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const isValid =
      value.length > 0 &&
      value.length < maxLength &&
      !items.some(item => item.toLowerCase() === value.toLowerCase());

    if (isValid) {
      addItem(value);
      setValue('');

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const activeInput = value.length > 0;

  return (
    <Wrapper>
      {label && <SmallLabel text={label} />}
      <Form onSubmit={handleSubmit}>
        <StyledInput
          value={value}
          onChange={handleChange}
          type="text"
          maxLength={maxLength}
          ref={inputRef}
        />
        <AddItem active={activeInput} type="submit">
          <Plus size={28} color="#aaa" />
        </AddItem>
      </Form>
      <List>
        {items.map((item, i) => (
          <Item key={item}>
            <ItemText>{item}</ItemText>
            <Remove onClick={() => removeItem(i)}>Ta bort</Remove>
          </Item>
        ))}
      </List>
      {items.length === 0 && label && (
        <NoItems>Inga {label.toLowerCase()}</NoItems>
      )}
    </Wrapper>
  );
};
