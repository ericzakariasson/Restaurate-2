import React from 'react';
import { Search, X } from 'react-feather';

import { InputWithIcon } from '../../../../components/Input';

const SearchInput = ({ isOpen, onChange, onSubmit, children, value, onClear }) => {
  return (
    <InputWithIcon
      label="Sök plats"
      placeholder="Namn eller adress"
      Icon={isOpen ? X : Search}
      onIconClick={isOpen ? onClear : onSubmit}
      color={isOpen ? 'danger' : 'black'}
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
      style={isOpen ? { borderRadius: '5px 5px 0 0' } : undefined}
      autoComplete="off"
      autoFocus
    >
      {children}
    </InputWithIcon>
  )
}

export default SearchInput;