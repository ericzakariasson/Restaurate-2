import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, X } from 'react-feather';

import { Input } from './Input';
import { Label } from './Label';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

const List = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  margin-bottom: 10px;
  font-size: ${p => p.theme.fontSize['large']};
  display: flex;
  align-items: center;
`;

const Remove = styled.button`
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  margin-left: 10px;
  box-shadow: ${p => p.theme.boxShadow};
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
  top: 50%;
  transform: translateY(-50%);
  transition: ${p => p.theme.transition};
  opacity: ${p => (p.active ? 1 : 0.5)};
`;

const ItemText = styled.span``;

const NoItems = styled.p`
  font-size: 1rem;
  color: #ccc;
`;

interface ListInputProps {
  label?: string;
  items: string[];
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  maxLength?: number;
  placeholder?: string;
}

export const ListInput = ({
  items,
  addItem,
  removeItem,
  label,
  maxLength = 50,
  placeholder
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
      {label && <Label text={label} htmlFor={label} />}
      <Form onSubmit={handleSubmit}>
        <StyledInput
          value={value}
          onChange={handleChange}
          type="text"
          maxLength={maxLength}
          ref={inputRef}
          placeholder={placeholder}
          id={label || undefined}
        />
        <AddItem active={activeInput} type="submit">
          <Plus size={24} color="#666" />
        </AddItem>
      </Form>
      <List>
        {items.map(item => (
          <Item key={item}>
            <ItemText>– {item}</ItemText>
            <Remove onClick={() => removeItem(item)}>
              <X size={12} color="#666" />
            </Remove>
          </Item>
        ))}
      </List>
      {items.length === 0 && label && (
        <NoItems>Inga {label.toLowerCase()}</NoItems>
      )}
    </Wrapper>
  );
};
