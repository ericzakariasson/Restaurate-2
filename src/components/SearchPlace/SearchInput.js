import React from 'react';
import { Search, X } from 'react-feather';

import { InputWithIcon } from '../../components/Input';

const SearchInput = ({ isOpen, onChange, onSubmit, children, value, clear }) => {
  return (
    <InputWithIcon
      label="Sök plats"
      placeholder="Namn eller adress"
      Icon={isOpen ? X : Search}
      onIconClick={isOpen ? clear : onSubmit}
      color={isOpen ? 'danger' : 'action'}
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
      clear={clear}
      style={isOpen ? { borderRadius: '5px 5px 0 0' } : undefined}
      autoComplete="off"
    >
      {children}
    </InputWithIcon>
  )
}

export default SearchInput;